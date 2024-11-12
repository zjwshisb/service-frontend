import React from 'react';

type Fn = () => void;
export default function useMount(fn: Fn) {
  const ref = React.useRef(fn);
  React.useEffect(() => {
    ref.current();
  }, []);
}
