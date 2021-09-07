import ReactDom from 'react-dom';
import type { ReactElement } from 'react';
import React from 'react';

export default function usePortal(e: ReactElement, id: string) {
  const [container, setContainer] = React.useState<Element | null>();
  React.useLayoutEffect(() => {
    setContainer(document.getElementById(id));
  }, [id]);
  if (container) {
    return ReactDom.createPortal(e, container);
  }
  return null;
}
