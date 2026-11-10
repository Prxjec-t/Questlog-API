import { Link } from 'react-router';
import type { Game } from '../types';
import { capitalize } from '../utils/format';

type GameItemProps = {
  game: Game;
};

const GameItem = ({ game }: GameItemProps) => {
  return (
    <li>
      <Link to={`/games/${game.id}`}>
        <p>{game.title}</p>
      </Link>
      <p>
        <span>{capitalize(game.platform)} </span>
        <span className="text-green-500">{game.status} </span>
        <span>{game.rating}</span>
        {/* <span>Created At: {formatDate(game.createdAt)} </span>
        <span>Updated At: {formatDate(game.updatedAt)} </span> */}
      </p>
    </li>
  );
};

export default GameItem;
