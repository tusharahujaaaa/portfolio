import { useEffect, useState } from 'react';

const fmt = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false });

/** "21:17" in IST, refreshed every 30 s. */
export function useClock() {
  const [t, setT] = useState(() => fmt.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setT(fmt.format(new Date())), 30000);
    return () => clearInterval(id);
  }, []);
  return t;
}
