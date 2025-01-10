import React from 'react';
interface WrapperProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const Wrapper: React.FC<WrapperProps> = (props) => {
  return (
    <div className="container" style={props.style}>
      {props.children}
    </div>
  );
};

export { Wrapper };
