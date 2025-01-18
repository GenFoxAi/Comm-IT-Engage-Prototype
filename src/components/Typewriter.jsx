
import { useState, useEffect, useRef } from 'react';

const Typewriter = ({ text }) => {
  const [typed, setTyped] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    setTyped('');
    indexRef.current = 0;
    const timer = setInterval(() => {
      setTyped((prev) => prev + text[indexRef.current]);
      indexRef.current++;
      if (indexRef.current === text.length) {
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{typed}</span>;
};

export default Typewriter;
