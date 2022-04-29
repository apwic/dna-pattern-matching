import './App.css';
import Navbar from '../components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import DNATest from '../pages/DNATest';
import History from '../pages/History';
import AddDisease from '../pages/AddDisease';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/DNATest' element={<DNATest/>} />
          <Route path='/AddDisease' element={<AddDisease/>} />
          <Route path='/History' element={<History/>} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
