import type { NextPage } from 'next'

//import styles
import styles from '../common/shared/styles/Home.module.scss';


//import components
import Navbar from '../common/components/modules/Navbar';

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
    </>
  )
}

export default Home
