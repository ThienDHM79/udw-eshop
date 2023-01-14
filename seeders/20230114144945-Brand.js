'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   let data = [ {
     name: 'Quintiles',
     imagePath: '/img/brand-1.png'
   },
   {
    name: 'IndiaCaptial',
    imagePath: '/img/brand-2.png'
  },
  {
    name: 'PaperlinX',
    imagePath: '/img/brand-3.png'
  },
  {
    name: 'InfraRed',
    imagePath: '/img/brand-4.png'
  },
  {
    name: 'Erlang',
    imagePath: '/img/brand-5.png'
  },
  {
    name: 'Sport England',
    imagePath: '/img/brand-6.png'
  }
  ];
  data.forEach(item => {
    item.createdAt = Sequelize.literal('NOW()');
    item.updatedAt = Sequelize.literal('NOW()');
  })
  await queryInterface.bulkInsert('Brands', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Brands', null, {});
  }
};
