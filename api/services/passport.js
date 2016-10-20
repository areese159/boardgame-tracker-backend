import passport from 'passport';
import passportLocal from 'passport-local';
import { comparePassword } from '../helpers/authenticationHelper';
const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy(
  function (email, password, done) {

    User.findOne({email: email}, function (err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, {message: "Incorrect email or password"});
      }

      comparePassword(password, user.password_hash).then(validPassword => {
        if(validPassword)
          return done(null, user, {message: "Login Successful"});
        else
          return Promise.reject();
      }).catch(passwordError => {
        return done(null,false, {message: "Incorrect Username Or Password"});
      });

    });
  }
));
