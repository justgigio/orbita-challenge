'use strict';

module.exports = {
  up: (queryInterface) => {

    const timestamp = new Date();
    return queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        email: 'admin@orbita.cc',
        password: 'admin',
        state: '*',
        role: 'admin',
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        name: 'First User',
        email: 'first@orbita.cc',
        password: 'abc123',
        state: 'CA',
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        name: 'Second User',
        email: 'second@orbita.cc',
        password: 'def456',
        state: 'NY',
        createdAt: timestamp,
        updatedAt: timestamp
      }
    ], {});
  },

  down: (queryInterface) => {
   return queryInterface.bulkDelete('users', null, {});
  }
};
