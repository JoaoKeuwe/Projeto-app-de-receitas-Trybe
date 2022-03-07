import React from 'react';

function Login() {
  return (
    <div>
      <form>
        <label htmlFor="email-input">
          <input
            data-testid="email-input"
            type="text"
            placeholder="Email"
            id="email-input"
            autoComplete="off"
          />
        </label>
        <label htmlFor="password-input">
          <input
            data-testid="password-input"
            type="password"
            placeholder="Password"
            id="password-input"
          />
        </label>
        <button type="submit" data-testid="login-submit-btn">
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
