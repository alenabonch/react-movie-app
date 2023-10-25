'use client'
import { usePathname } from 'next/navigation';

export default function ConditionalSearch({children}: any) {
  const pathName = usePathname();
  const isDetailsPath = /\/\d+/.test(pathName);
  return (
      isDetailsPath ? null : children
  );
}
