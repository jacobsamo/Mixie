import { NextPage } from 'next/types';
import Navbar from '@components/modules/Navbar';
import Footer from '@components/modules/Footer';


const Custom404: NextPage = () => {
  return (
    <>
      <Navbar />
      <div className='w-full h-full flex justify-center items-center'>404</div>
      <Footer />
    </>
  );
};

export default Custom404;
