import './App.css';

let App() {
  return (
    <div className="App">
      <h1>Gift List App</h1>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login'; // Necesitarás crear este componente

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        {/* Otras rutas */}
      </Switch>
    </Router>
  );
}

export default App;
