import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: '', // login inicia vazio
      disabled: true, // botao desabilitado inicialmente
      loading: false,
      redirect: false,
    };
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  // Função para o Input
  onChangeInput({ target }) {
    this.setState({
      login: target.value, // atualizo o valor digitado no input
    }, this.verifyCharacterInput); // funcao de verificar os caracteres, para habilitar o botao
  }

  // Função para contar caracteres do nome no login
  verifyCharacterInput() {
    const NUMBER_MIN_CHARACTERS = 3;
    const { login } = this.state;
    const lengthName = login.length >= NUMBER_MIN_CHARACTERS;
    this.setState({
      disabled: !lengthName, // se for >= 3 caracteres, botao habilitado
    });
  }

  // Função para clicar no botão e salvar o que for digitado
  async submitLoginButton(login) {
    this.setState({
      loading: true,
    });
    await createUser({ name: login });
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { disabled, loading, login, redirect } = this.state;
    if (loading) {
      return (
        <div>
          <h2>Carregando...</h2>
          { redirect && <Redirect to="/search" /> }
        </div>
      );
    }

    return (
      <div data-testid="page-login">
        <form>
          <input
            data-testid="login-name-input"
            onChange={ this.onChangeInput } // pegar o que será digitado
            type="text"
          />
          <button
            data-testid="login-submit-button"
            disabled={ disabled } // botao desabilitado
            onClick={ () => this.submitLoginButton(login) }
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
