import React, { Component } from 'react';
import { getUser } from '../services/userAPI';

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
          { loading ? <span>Carregando...</span> : personLogged }
        </h2>
      </header>
    );
  }
}

export default Header;
