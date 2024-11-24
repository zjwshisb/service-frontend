import React from 'react';
import classNames from 'classnames';

const Layout: React.FC<
  React.PropsWithChildren<{
    icon: React.ReactNode;
    className: string;
    onIconClick?: () => void;
    onNameClick?: () => void;
  }>
> = (props) => {
  return (
    <div className={classNames('w-32 p-2 flex flex-col flex-shrink-0', props.className)}>
      <div className={'w-28 h-28 overflow-hidden'} onClick={props.onIconClick}>
        {props.icon}
      </div>
      <div className={'overflow-hidden py-1 flex'} onClick={props.onNameClick}>
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
