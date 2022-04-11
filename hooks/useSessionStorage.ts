import { useState, useEffect } from 'react';

export default (): string | null => {
  const [id, setId] = useState<string | null>('');
  useEffect(() => {
    setId(sessionStorage.getItem('user'));
  }, []);
  return id;
};
