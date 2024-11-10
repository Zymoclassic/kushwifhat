import './App.css';
import Footer from './components/home/Footer';
import Home from './components/home/Home';
import NavBar from './components/home/NavBar';

function App() {
  return (
    <>
      <NavBar />

      <main>
        <Home />
      </main>
      
      <Footer />
    </>
  );
}

export default App;
