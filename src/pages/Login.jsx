import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: '',
      disabled: true,
    };
  }

  // Função para contar caracteres do nome no login
  verifyCharacterInLogin() {
    const NUMBER_MIN = 3;
    const { login } = this.state;
    const lengthName = login.length >= NUMBER_MIN;
    this.setState({
      disabled: !lengthName,
    });
  }

  render() {
    const { disabled } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            data-testid="login-name-input"
            type="text"
          />
          <button
            data-testid="login-submit-button"
            disabled={ disabled }
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
