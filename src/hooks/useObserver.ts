import { RefObject, useEffect, useRef } from 'react';

export const useObserver = (observerTarget: RefObject<any>, canLoad: boolean, loading: boolean, callback: () => void) => {
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if (loading) return;

    const cb = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    }

    observer.current = new IntersectionObserver(cb);
    observer.current.observe(observerTarget.current);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading]);
}
