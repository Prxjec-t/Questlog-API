import { Link } from 'react-router';
import type { Game } from '../types';
import { capitalize } from '../utils/format';

type GameItemProps = {
  game: Game;
};

const GameItem = ({ game }: GameItemProps) => {
  return (
    <li className="flex flex-col justify-between text-center text-white border-4 border-black bg-red-900 my-4 p-3 w-full">
      <Link to={`/games/${game.id}`}>
        <p className="text-2xl font-semibold py-3">{game.title}</p>
      </Link>
      <p className="text-xl flex flex-col">
        <span>{capitalize(game.platform)} </span>
        <span>{capitalize(game.status)} </span>
        <span>{game.rating && game.rating > 0 ? `${game.rating}/5` : 'Not rated yet'}</span>
      </p>
      <Link to={`/games/${game.id}`}>
        <img
          src={game.coverUrl}
          alt={game.title}
          className={
            game.coverUrl
              ? `my-4 object-cover mx-auto w-50 h-70 border-2 transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:shadow-black/80`
              : ''
          }
        />
      </Link>
    </li>
  );
};

export default GameItem;
