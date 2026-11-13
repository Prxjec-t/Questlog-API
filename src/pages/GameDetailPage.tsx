import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import type { Game } from '../types';
import { capitalize, formatDate } from '../utils/format';

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
        <p className="loading">Loading game details...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h1 className="error">{error || '404 - Page not found'} </h1>
        <Link to="/">Back to all games</Link>
      </section>
    );
  }

  if (!game) {
    return (
      <section>
        <Link to={'/games'}>Back to all games</Link>
        <p className="error">Game not found</p>;
      </section>
    );
  }

  return (
    <article className="bg-red-800 text-white min-h-screen text-xl p-8 text-center">
      <h1 className="font-bold text-3xl mb-5">{game.title}</h1>
      <div className="flex items-center justify-center">
        <img src={game.coverUrl} alt={game.title} className={game.coverUrl ? `w-60 h-80 mb-3` : ''} />
      </div>

      <div className="mb-3">
        <p>Platform: {game.platform}</p>
        <p>Status: {capitalize(game.status)}</p>
        <p>Rating: {game.rating ?? 'No rating'}</p>
        <p className={game.notes ? `block` : 'hidden'}>Notes: {game.notes}</p>
      </div>

      <div className="mb-3">
        <p className="pb-2">Created At: {formatDate(game.createdAt)}</p>
        <p>Updated At: {formatDate(game.updatedAt)}</p>
      </div>

      <section className="grid place-items-center gap-3 pt-4">
        <Link className="action-btns" to={`/games/${game.id}/edit`}>
          Edit
        </Link>
        <button className="action-btns" onClick={() => navigate(-1)}>
          Back
        </button>
        <button className="action-btns" onClick={deleteGame}>
          Delete
        </button>
      </section>
    </article>
  );
};

export default GameDetailPage;
