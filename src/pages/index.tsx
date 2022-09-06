import type { NextPage } from 'next'

//import styles
import styles from '../common/shared/styles/modules/Home.module.scss';


//import components
import Navbar from '../common/components/modules/Navbar';

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
          alt="" 
          className={styles.heroImg}
        />
      </main>
    </>
  )
}

export default Home
