/**
 * AuthenticationController
 *
 * @description :: Server-side logic for managing authentications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

import passport from 'passport';
import jwt from 'jsonwebtoken';
import { hashPassword, getRequestParameters } from '../helpers/authenticationHelper';

module.exports = {
  login(req,res) {

    const authenticationStrategy = passport.authenticate('local', function(authenticationError, user,info) {
      if(authenticationError) {
        return res.send(400, {error: authenticationError});
      }

      if(!user) {
        return res.send(400, {error: "Invalid Username Or Password"});
      }

      req.logIn(user, {session: false}, function(loginError) {
        
        if(loginError) {
          return res.send(400, {error: loginError});
        }

        const authenticationToken = {
          email: user.email,
          jsonWebToken: jwt.sign({email: user.email, user_id: user.user_id}, "033a1d2ae38603a11b6000fb9c2e2372")
        };

        return res.json({authenticationToken});
      });
    });
    return authenticationStrategy(req,res);
  },

  logout(req,res) {
    res.json({status:"success"});
  },

  register(req,res) {

    let regData = req.allParams();
    hashPassword(regData.password).then((hashPassword) => {

      return User.create({email: regData.username, password_hash: hashPassword});
    }).then((user) => {
      return res.json({user: user.toJSON()});
    }).catch((error ) => {
      return res.send(400, {error: "Failed To Create User" });
    });
  },
};

