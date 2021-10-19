import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      personLogged: '', // nome da pessoa logada inicialmente
      loading: true,
    };
  }

  componentDidMount() {
    this.getPersonLogged();
  }

  // Função que vai buscar o nome da pessoa logada
  async getPersonLogged() {
    const namePerson = await getUser(); // buscar na função getUser, o nome da pessoa usuária
    const { name } = namePerson; // desestruturo o objeto namePerson
    this.setState({
      personLogged: name,
      loading: false, // atualizo o nome da pessoa e o estado do loading
    });
  }

  render() {
    const { personLogged, loading } = this.state;
    return (
      <header data-testid="header-component">
        <h2 data-testid="header-user-name">
          { loading ? <Loading /> : personLogged }
        </h2>
        <nav>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
