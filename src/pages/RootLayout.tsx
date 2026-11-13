import { NavLink, Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <>
      <header className="bg-black/95 text-white text-xl p-5 flex flex-col justify-evenly items-center gap-3">
        <NavLink to="/">
          <h1 className="underline underline-offset-4 text-2xl hover:text-red-500">Games Backlog</h1>
        </NavLink>

        <nav>
          <NavLink to="/" end className="hover:text-red-500">
            All games
          </NavLink>
          {' | '}
          <NavLink to="/games/new" end className="hover:text-red-500">
            Add a game
          </NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
