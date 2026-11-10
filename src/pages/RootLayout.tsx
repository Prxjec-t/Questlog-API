import { NavLink, Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <>
      <header>
        <NavLink to="/">
          <h1>Games Backlog</h1>
        </NavLink>

        <nav>
          <NavLink to="/" end>
            All games
          </NavLink>
          <NavLink to="/games/new" end>
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
