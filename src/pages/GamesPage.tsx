import { useState } from 'react';
import GamesList from '../components/GamesList';
import type { Status } from '../types';
import { capitalize } from '../utils/format';

const GamesPage = () => {
  const [activeFilter, setActiveFilter] = useState<Status | 'all'>('all');

  const filters: (Status | 'all')[] = ['all', 'want', 'playing', 'completed', 'dropped'];

  return (
    <section>
      <div>
        {filters.map((filter) => {
          const isSelected = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`border-2 m-2 ${isSelected ? 'bg-amber-400 border-amber-600 font-bold ' : 'bg-amber-200 border-amber-500 font-normal hover:bg-amber-300'} `}>
              {filter === 'want' ? 'Want to Play' : capitalize(filter)}
            </button>
          );
        })}
      </div>

      <GamesList status={activeFilter} />
    </section>
  );
};

export default GamesPage;
