import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ModulePage() {
  const { token } = useContext(AuthContext);
  const { id } = useParams();

  const [module, setModule] = useState(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    async function fetchModule() {
      try {
        const res = await axios.get(`http://localhost:5000/api/modules/${id}`, {
          headers: { 'x-auth-token': token }
        });
        setModule(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchModule();
  }, [id, token]);

  if (!module) return <p>Loading...</p>;

  const questions = module.questions || [];

  const handleAnswer = () => {
    if (selectedOption === null) return alert('Select an answer');
    if (selectedOption === questions[quizIndex].correctOption) {
      setScore(score + 1);
    }
    if (quizIndex + 1 < questions.length) {
      setQuizIndex(quizIndex + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div>
      <h2>{module.title}</h2>
      <div>
        <h3>Lesson Content</h3>
        <p>{module.content}</p>
      </div>

      {questions.length > 0 && !showResult && (
        <div>
          <h3>Quiz</h3>
          <p>{questions[quizIndex].questionText}</p>
          <ul>
            {questions[quizIndex].options.map((opt, idx) => (
              <li key={idx}>
                <label>
                  <input
                    type="radio"
                    name="option"
                    checked={selectedOption === idx}
                    onChange={() => setSelectedOption(idx)}
                  />
                  {opt}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={handleAnswer}>Submit</button>
        </div>
      )}

      {showResult && (
        <div>
          <h3>Your Score: {score} / {questions.length}</h3>
        </div>
      )}
    </div>
  );
}
