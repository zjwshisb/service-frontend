import React from 'react';
import classNames from 'classnames';

const CusDiv: React.ForwardRefRenderFunction<
  HTMLDivElement,
  React.DetailedHTMLProps<React.HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    scrollPrettify?: boolean;
  }
> = (props, ref) => {
  const { scrollPrettify = true, className, ...other } = props;

  return (
    <div
      ref={ref}
      className={classNames(className, 'border-[#e1e1e1]', {
        'overflow-y-auto scrollbar-track-transparent scrollbar-thin scrollbar-thumb-gray-400':
          scrollPrettify,
      })}
      {...other}
    >
      {other.children}
    </div>
  );
};
export default React.forwardRef(CusDiv);
