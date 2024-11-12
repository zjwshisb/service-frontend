import React from 'react';

export default function useInputModel() {
  const [text, setText] = React.useState('');

  const append = React.useCallback((t: string) => {
    setText((prevState) => {
      return prevState + t;
    });
  }, []);

  const clear = React.useCallback(() => {
    setText('');
  }, []);

  return {
    text,
    setText,
    append,
    clear,
  };
}
