const template = require('./../template');
const { getError } = require('../helpers');

module.exports = ({ errors }) => {
  return template({
    content: `
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-one-quarter">
            <form method="POST">
              <h1 class="title">Sign Up</h1>
              <div class="field">
                <label class="label">Email</label>
                <input required class="input" placeholder="Email" name="email" />
                <p class="help is-danger">${getError(errors, 'email')}</p>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <input required class="input" placeholder="Password" name="password" type="password" />
                <p class="help is-danger">${getError(errors, 'password')}</p>
              </div>
              <div class="field">
                <label class="label">Password Confirmation</label>
                <input required class="input" placeholder="Password Confirmation" name="confirmPassword" type="password" />
                <p class="help is-danger">${getError(
                  errors,
                  'confirmPassword'
                )}</p>
              </div>
              <button class="button is-primary">Submit</button>
            </form>
            <a href="/signin">Have an account? Sign In</a>
          </div>
        </div>
      </div>
    `,
  });
};

// props : email || password || confirmPassword
// if there is no error or the exact prop does
// not generate an error
// error.mapped() ===
//   {
//     email: {
//       msg: 'invalid email',
//     },
//     password: {
//       msg: 'invalid email',
//     },
//     confirmPassword: {
//       msg: 'invalid password',
//     },
//   };
// only if there are errors show them inside the form
