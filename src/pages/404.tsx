import { NextPage } from 'next/types';
import Navbar from '@components/modules/Navbar';

const Custom404: NextPage = () => {
  return (
    <>
      <Navbar /> 
      <div>404 Page not Found</div>
    </>
  );
};

export default Custom404;
