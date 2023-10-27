'use client'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface LinkWithQueryProps {
  to: string;
  children: any;
}

export const LinkWithQuery = ({children, to, ...props}: LinkWithQueryProps) => {
  const search = useSearchParams();

  return (
      <Link href={`${to}?${search.toString()}`} {...props}>
        {children}
      </Link>
  );
};
