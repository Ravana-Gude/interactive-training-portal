import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { token, logout } = useContext(AuthContext);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    async function fetchModules() {
      try {
        const res = await axios.get('http://localhost:5000/api/modules', {
          headers: { 'x-auth-token': token }
        });
        setModules(res.data);
      } catch (err) {
        if (err.response?.status === 401) logout();
      }
    }
    fetchModules();
  }, [token, logout]);

  return (
    <div>
      <h2>Training Modules</h2>
      <ul>
        {modules.map(m => (
          <li key={m._id}>
            <Link to={`/module/${m._id}`}>{m.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
