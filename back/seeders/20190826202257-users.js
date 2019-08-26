'use strict';

module.exports = {
  up: (queryInterface) => {

    const timestamp = new Date();
    return queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        email: 'admin@orbita.co',
        password: 'admin',
        state: '*',
        role: 'admin',
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        name: 'First User',
        email: 'first@orbita.co',
        password: 'abc123',
        state: 'CA',
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        name: 'Second User',
        email: 'second@orbita.co',
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
