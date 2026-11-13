import { Link } from 'react-router';

const PageNotFound = () => {
  return (
    <div className="bg-red-800 text-white min-h-screen w-full text-xl font-semibold text-center pt-8">
      <h1 className="text-2xl mb-6">404 - Page Not Found</h1>
      <Link to="/" className="action-btns">
        Back to all games!
      </Link>
    </div>
  );
};

export default PageNotFound;
