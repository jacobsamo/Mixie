import React from 'react';

interface Custom404Props {
  children: React.ReactNode;
}

const Custom404 = ({ children }: Custom404Props): React.ReactElement => {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">404</div>
      {children}
    </>
  );
};

export default Custom404;
