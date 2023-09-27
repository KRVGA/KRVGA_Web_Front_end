import {useState} from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const Home = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const handleClick = () => {
    if (isHamburgerOpen) {
      setIsHamburgerOpen(false);
    }
  };
  return (
    <main onClick={handleClick}>
      <NavBar
        isHamburgerOpen={isHamburgerOpen}
        setIsHamburgerOpen={setIsHamburgerOpen}
      />
      <Hero />
      <Footer />
    </main>
  );
};

export default Home;
