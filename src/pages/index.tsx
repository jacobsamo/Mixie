import type { NextPage } from 'next'

//import styles
import styles from '../common/styles/modules/Home.module.scss';


//import components
import Navbar from '../common/components/modules/Navbar';

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
        <img src="./images/background.jpg" 
          alt="" 
          className={styles.heroImg}
        />
      <main className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Want Tasty Recipes</h1>
        <h2 className={styles.heroParagraph}>We offer a way to find good recipes without having to read all the information that isn’t important all free and open source</h2>
        <input 
          type="text" 
          placeholder='Find your next meal' 
          className={styles.heroSearch}
        />
      </main>
    </>
  )
}

export default Home
