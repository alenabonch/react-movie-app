import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export function useNavigateWithQuery() {
  const search = useSearchParams();
  const router = useRouter();

  const navigateWithQuery = (pathname: string) => {
    let updatedPath = search.size > 0 ? `${pathname}?${search}` : pathname;
    router.push(updatedPath);
  }

  return {navigateWithQuery}
}
