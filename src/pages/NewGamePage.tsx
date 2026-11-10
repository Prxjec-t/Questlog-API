import { useState } from 'react';
import type { NewGame } from '../types';
import { useNavigate } from 'react-router';
import GameForm from '../components/GameForm';

const NewGamePage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const addGame = async (values: NewGame) => {
    setError('');
    try {
      const response = await fetch('https://questlog-api.vercel.app/api/kimi/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return false;
      }
      navigate(`/games/${data.id}`);
      return true;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
      return false;
    }
  };

  return (
    <section>
      <h2>Add game to backlog!</h2>

      <button onClick={() => navigate(-1)}>Cancel</button>

      {error && <p>Could not add the games: {error}</p>}
      <GameForm onSubmit={addGame} />
    </section>
  );
};
export default NewGamePage;
