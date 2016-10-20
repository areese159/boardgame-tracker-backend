import bcrypt from 'bcryptjs';

export const hashPassword = function (password) {
  return new Promise((resolve, reject) =>  {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return reject(saltError);
      }
      bcrypt.hash(password, salt, function (hashError, hash){
        return (hashError == null) ? resolve(hash) : reject(hashError);
      });
    });
  });
};

export const comparePassword = function (password, databaseHash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, databaseHash, function(err,res) {
      return err ? reject(err) : resolve(res);
    });
  });
};
