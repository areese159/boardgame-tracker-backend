/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
import jwt from 'jsonwebtoken';

module.exports = function(req, res, next) {

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, "033a1d2ae38603a11b6000fb9c2e2372", function (err, decode) {
      if (err) {
        return res.forbidden('You are not permitted to perform this action.');
      }
      req.user = decode;
      return next();
    });
  } else {
    return res.forbidden('You are not permitted to perform this action.');
  }
};
