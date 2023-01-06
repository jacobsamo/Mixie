import { NextPage } from 'next/types';
import Navbar from '@components/elements/Navbar';




const Custom404: NextPage = () => {
  //TODO: make prettier for users
  return (
    <>
      <Navbar />
      <div className='w-full h-full flex justify-center items-center'>404</div>
    </>
  );
};

export default Custom404;
