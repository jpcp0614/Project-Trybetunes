import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Album from './pages/Album';
import Search from './pages/Search';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Favorites from './pages/Favorites';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={ Login } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/search" component={ Search } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="*" component={ NotFound } />
      </BrowserRouter>
    );
  }
}

export default App;
