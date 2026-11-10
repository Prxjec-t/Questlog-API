import { createBrowserRouter, RouterProvider } from 'react-router';
import RootLayout from './pages/RootLayout';
import GamesPage from './pages/GamesPage';
import PageNotFound from './pages/PageNotFound';
import NewGamePage from './pages/NewGamePage';
import GameDetailPage from './pages/GameDetailPage';
import EditGamePage from './pages/EditGamePage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: GamesPage },
      { path: 'games/new', Component: NewGamePage },
      { path: 'games/:id', Component: GameDetailPage },
      { path: 'games/:id/edit', Component: EditGamePage },
      { path: '*', Component: PageNotFound },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
