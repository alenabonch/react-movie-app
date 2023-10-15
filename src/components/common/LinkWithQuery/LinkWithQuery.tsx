import { Link, useLocation } from 'react-router-dom';

interface LinkWithQueryProps {
  to: string;
  children: any;
}

export const LinkWithQuery = ({children, to, ...props}: LinkWithQueryProps) => {
  const {search} = useLocation();

  return (
      <Link to={to + search} {...props}>
        {children}
      </Link>
  );
};
