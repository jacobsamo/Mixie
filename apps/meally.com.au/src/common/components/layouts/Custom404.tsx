import React from 'react';

interface Custom404Props {
  children: React.ReactNode;
}

const Custom404 = ({ children }: Custom404Props): React.ReactElement => {
  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center">
        404 
        <p>{children}</p>
      </div>
    </>
  );
};

export default Custom404;
