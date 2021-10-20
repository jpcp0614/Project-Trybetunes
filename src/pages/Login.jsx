import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: '', // login inicia vazio
      isDisabled: true, // botao desabilitado inicialmente...refatorando
      isLoading: false, // refatorando
      isRedirect: false, // refatorando
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
      isDisabled: !lengthName, // se for >= 3 caracteres, botao habilitado
    });
  }

  // Função para clicar no botão e salvar o que for digitado
  async submitLoginButton(login) {
    this.setState({
      isLoading: true,
    });
    await createUser({ name: login });
    this.setState({
      isRedirect: true,
    });
  }

  render() {
    const { isDisabled, isLoading, login, isRedirect } = this.state;
    if (isLoading) {
      return (
        <div>
          <Loading />
          { isRedirect && <Redirect to="/search" /> }
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
            disabled={ isDisabled } // botao desabilitado
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
