export interface IOptions{
  successRedirect?: string; // successRedirect: '/'
  failureRedirect?: string; // failureRedirect: '/login'
  failureFlash?: string | boolean; // failureFlash: true, failureFlash: 'Invalid username or password.', successFlash: 'Welcome!'
  session?: boolean; // session: false
}
