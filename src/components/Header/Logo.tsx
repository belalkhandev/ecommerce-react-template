import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="text-2xl font-bold text-gray-900">
        <span className="text-gray-900">C</span>
        <span className="text-amber-600">Craft</span>
      </div>
    </Link>
  );
};

export default Logo;
