/**
 * Authentication.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'user',
  attributes: {
    user_id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    password_hash: {
      type: 'string',
      required: true
    }
  }
};



