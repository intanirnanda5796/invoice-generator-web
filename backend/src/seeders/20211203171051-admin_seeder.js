const bcrypt = require('bcrypt');

const password = bcrypt.hashSync('1q2w3e', bcrypt.genSaltSync());

module.exports = {
  up: async (queryInterface) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [{
      id: '2bc1dc7a-f1f5-4444-bffa-0bd4c7ff6f1e',
      fullname: 'ADMINISTRATOR',
      phone_number: '08123456789',
      password,
      email: 'admin@gmail.com',
      address: 'jl kemana saja',
      role: 'ADMIN',
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  },
};
