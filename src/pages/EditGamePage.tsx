import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import type { Game, NewGame } from '../types';
import GameForm from '../components/GameForm';

const EditGamePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://questlog-api.vercel.app/api/kimi/games/${id}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.message);
          return false;
        }

        setGame(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
        return;
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  const editGame = async (updatedValues: NewGame) => {
    try {
      const response = await fetch(`https://questlog-api.vercel.app/api/kimi/games/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedValues),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return false;
      }

      navigate(`/games/${id}`);
      return true;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
      return false;
    }
  };

  if (isLoading) return <p>Loading game...</p>;

  if (error) return <p>Could not update the game</p>;

  if (!game) {
    return (
      <>
        <h1> {error || 'Loading...'} </h1>
        <Link to="/">Back to all games</Link>
      </>
    );
  }

  return (
    <section>
      <h2> Edit game info: {game.title}</h2>
      <button onClick={() => navigate(-1)}>Cancel</button>

      <GameForm onSubmit={editGame} initialValues={game} />
    </section>
  );
};

export default EditGamePage;
