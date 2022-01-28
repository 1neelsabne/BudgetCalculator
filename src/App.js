// Importing Required Libraries and Components

import './App.css';
import SignInSide from './pages/SignIN';
import SignUp from './pages/SignUP';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

// Functional Component

function App() {
  return (
    <>
      {/* Implementin React Router */}
      <Router>
        <Routes>
          <Route path="/" element={<SignInSide />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

//Exporting App
export default App;
