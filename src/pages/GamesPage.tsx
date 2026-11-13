import { useState } from 'react';
import GamesList from '../components/GamesList';
import type { Status } from '../types';
import { capitalize } from '../utils/format';

const GamesPage = () => {
  const [activeFilter, setActiveFilter] = useState<Status | 'all'>('all');

  const filters: (Status | 'all')[] = ['all', 'want', 'playing', 'completed', 'dropped'];

  return (
    <section>
      <div className="bg-red-900">
        {filters.map((filter) => {
          const isSelected = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`border-2 m-2 p-1 ${isSelected ? 'bg-gray-600 border-gray-600 font-bold ' : 'text-white bg-black border-red-500 hover:bg-red-300 transition-colors duration-200'} `}>
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
