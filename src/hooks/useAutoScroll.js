import { useState, useEffect } from 'react';

const useAutoScroll = (containerRef) => {
  const [isReaderScrolling, setIsReaderScrolling] = useState(false);
  const [readerScrollSpeed, setReaderScrollSpeed] = useState(1);

  useEffect(() => {
    let intervalId;
    if (isReaderScrolling && containerRef.current) {
      intervalId = setInterval(() => {
        containerRef.current.scrollTop += readerScrollSpeed;
        if (containerRef.current.scrollHeight - containerRef.current.scrollTop === containerRef.current.clientHeight) {
          setIsReaderScrolling(false);
        }
      }, 50);
    }
    return () => clearInterval(intervalId);
  }, [isReaderScrolling, readerScrollSpeed, containerRef]);

  return { isReaderScrolling, setIsReaderScrolling, readerScrollSpeed, setReaderScrollSpeed };
};

export default useAutoScroll;