export type Status = 'want-to-play' | 'playing' | 'completed' | 'dropped';

export type Game = {
  id: string;
  title: string;
  platform: string;
  status: Status;
  rating?: number;
  coverUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type NewGame = {
  title: string;
  platform: string;
  status: Status;
  rating?: number;
  coverUrl?: string;
  notes?: string;
};
