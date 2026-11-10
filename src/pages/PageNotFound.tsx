import { Link } from 'react-router';

const PageNotFound = () => {
  return (
    <>
      <h1>404 - Page Not Found</h1>
      <Link to="/">Back to all games!</Link>
    </>
  );
};

export default PageNotFound;
