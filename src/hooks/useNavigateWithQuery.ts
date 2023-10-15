import { useLocation, useNavigate } from 'react-router-dom';

export function useNavigateWithQuery() {
  const navigate = useNavigate();
  const {search} = useLocation();

  const navigateWithQuery = (pathname: string) => {
    navigate({pathname, search});
  }

  return {navigateWithQuery}
}
