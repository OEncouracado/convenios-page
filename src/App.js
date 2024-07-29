import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './Pages/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlanosPage from './Pages/Planos';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path='planos' exact element={<PlanosPage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
