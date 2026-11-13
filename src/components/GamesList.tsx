import { useEffect, useState } from 'react';
import type { Game } from '../types';
import GameItem from './GameItem';

type GameListProps = {
  status: string;
};

const GamesList = ({ status }: GameListProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      try {
        let url = 'https://questlog-api.vercel.app/api/kimi/games';
        if (status !== 'all') {
          url = `https://questlog-api.vercel.app/api/kimi/games?status=${status}`;
        }
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
          setError(data.message);
          setGames([]);
          return;
        }

        setGames(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, [status]);

  return (
    <section className="bg-black/95 flex flex-col items-center justify-center">
      {isLoading && <p className="loading">Loading games...</p>}
      {error && <p className="error">Could not load the games: {error}</p>}

      {!isLoading && !error && games.length === 0 && (
        <p className="text-white text-xl md:text-2xl">
          {status === 'all' ? 'No games in your library yet' : `No games found with status "${status}".`}
        </p>
      )}

      {!isLoading && (
        <ul className="w-11/12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {games.map((game) => (
            <GameItem key={game.id} game={game} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default GamesList;
