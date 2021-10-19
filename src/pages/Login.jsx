import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: '', // login inicia vazio
      disabled: true,
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

  render() {
    const { disabled } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            data-testid="login-name-input"
            onChange={ this.onChangeInput }
            type="text"
          />
          <button
            data-testid="login-submit-button"
            disabled={ disabled } // botao desabilitado
            type="button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
