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
    <section>
      {isLoading && <p>Loading games...</p>}
      {error && <p>Could not load the games: {error}</p>}

      <ul>
        {games.map((game) => (
          <GameItem key={game.id} game={game} />
        ))}
      </ul>
    </section>
  );
};

export default GamesList;
