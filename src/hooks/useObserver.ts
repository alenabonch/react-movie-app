import { RefObject, useEffect } from 'react';

export const useObserver = (observerTarget: RefObject<any>, canLoad: boolean, loading: boolean, callback: () => void) => {
  useEffect(() => {
    if (loading) return;

    const cb = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    }

    const observer = new IntersectionObserver(cb);
    observer.observe(observerTarget.current);

    return () => {
      observer.disconnect();
    };
  }, [loading]);
}
