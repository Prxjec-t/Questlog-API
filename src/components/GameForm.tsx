import { useState, type SubmitEvent } from 'react';
import type { Game, NewGame, Status } from '../types';

type GameFormProps = {
  initialValues?: Game;
  onSubmit: (game: NewGame) => Promise<boolean>;
};

const GameForm = ({ initialValues, onSubmit }: GameFormProps) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [platform, setPlatform] = useState(initialValues?.platform || '');
  const [status, setStatus] = useState<Status>(initialValues?.status || 'want');
  const [rating, setRating] = useState<number>(initialValues?.rating || 0);
  const [coverUrl, setCoverUrl] = useState(initialValues?.coverUrl || '');
  const [notes, setNotes] = useState(initialValues?.notes || '');

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await onSubmit({
      title,
      platform,
      status,
      rating: rating > 0 ? rating : undefined,
      coverUrl,
      notes,
    });

    if (success) {
      setTitle('');
      setPlatform('');
      setStatus(status);
      setRating(0);
      setCoverUrl('');
      setNotes('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Your game
        <input value={title} onChange={(e) => setTitle(e.target.value)} required></input>
      </label>

      <label>
        Platform
        <input value={platform} onChange={(e) => setPlatform(e.target.value)} required />
      </label>

      <label>
        Status
        <select value={status} onChange={(e) => setStatus(e.target.value as Status)}>
          <option value="want">Want to play</option>
          <option value="playing">Playing</option>
          <option value="completed">Completed</option>
          <option value="dropped">Dropped</option>
        </select>
      </label>

      <label>
        Rating (Optional)
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          <option value={0}>Not rated yet</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </label>

      <label>
        Cover Image URL (Optional)
        <input type="url" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} />
      </label>

      <label>
        Notes
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} />
      </label>

      <button> {initialValues ? 'Update game details' : 'Add game'} </button>
    </form>
  );
};

export default GameForm;
