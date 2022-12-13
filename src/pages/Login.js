import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitLogin } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(submitLogin(email));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    const emailValid = /^[\w.+]+@\w+.\w{2,}(?:.\w{2})?$/gmi;
    const passwordValid = 6;
    const isValid = (emailValid.test(email)) && (password.length >= passwordValid);

    return (
      <div>
        <p>Login</p>
        <form>
          <label htmlFor="email">
            Insira seu email:
            <input
              type="email"
              data-testid="email-input"
              onChange={ this.handleChange }
              value={ email }
              name="email"
            />
          </label>
          <label htmlFor="senha">
            Senha:
            <input
              type="text"
              data-testid="password-input"
              onChange={ this.handleChange }
              value={ password }
              name="password"
            />
          </label>
          <button
            type="button"
            disabled={ !isValid }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
