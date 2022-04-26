import logo from '../logo.svg';
import './App.css';
import Navbar from '../components/Navbar';
import SideBar from "../components/SideBar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import DNATest from '../pages/DNATest';
import History from '../pages/History';
import AddDisease from '../pages/AddDisease';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    // Navbar
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

    // Sidebar with animation
    // <>
    //   <Router>
    //     <SideBar>
    //       <Routes>
    //         <Route path='/' exact element={<Home/>} />
    //         <Route path='/dnatest' element={<DNATest/>} />
    //         <Route path='/history' element={<History/>} />
    //       </Routes>
    //     </SideBar>
    //   </Router>
    // </>
  );
}

export default App;
