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

<Route path="/edit-gift/:id" component={EditGift} />

import React from 'react';
import Header from './components/Header';
import UserList from './components/UserList';
import GiftList from './components/GiftList';
import FriendList from './components/FriendList';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <UserList />
      <GiftList />
      <FriendList />
    </div>
  );
}

export default App;
