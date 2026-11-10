import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import type { Game } from '../types';

const GameDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://questlog-api.vercel.app/api/kimi/games/${id}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.message);
          return;
        }

        setGame(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  const deleteGame = async () => {
    if (!game) {
      return;
    }

    setError('');
    try {
      const response = await fetch(`https://questlog-api.vercel.app/api/kimi/games/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      } else {
        navigate('/games');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  if (isLoading) {
    return (
      <section>
        <p>Loading game details...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h1>{error || '404 - Page not found'} </h1>
        <Link to="/">Back to all games</Link>
      </section>
    );
  }

  if (!game) {
    return (
      <section>
        <Link to={'/games'}>Back to all games</Link>
        <p>Game not found</p>;
      </section>
    );
  }

  return (
    <article>
      <h1>{game.title}</h1>
      <div>
        <img src={game.coverUrl} alt={game.title} />
      </div>

      <p>Platform: {game.platform}</p>
      <p>Status: {game.status}</p>
      <p>Rating: {game.rating ?? 'No rating'}</p>
      <p>Notes: {game.notes}</p>

      <section>
        <Link to={`/games/${game.id}/edit`}>Edit</Link>
        <button onClick={() => navigate(-1)}>Back</button>
        <button onClick={deleteGame}>Delete</button>
      </section>
    </article>
  );
};

export default GameDetailPage;
