import { Link } from 'react-router-dom';

const ButtonLink = ({ label, to, className }) => {
  return (
    <Link
      to={to}
      className={`text-sm text-black bg-white border border-black rounded py-2 px-4 hover:bg-gray-200 transition ${className}`}
    >
      {label}
    </Link>
  );
};

export default ButtonLink;
