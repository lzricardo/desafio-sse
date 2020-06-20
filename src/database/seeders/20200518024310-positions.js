'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    if (process.env.TEST_RUN_MIGRATIONS_AND_SEEDERS === 'true') {
      return queryInterface.bulkInsert('positions', [{"name":"Chief Technology Officer","status":"active","created_at": new Date(), "updated_at": new Date(),"max_hired":10},{"name":"HR Supervisor","status":"active","created_at": new Date(), "updated_at": new Date(),"max_hired":10},{"name":"Senior Software Engineer","status":"active","created_at": new Date(), "updated_at": new Date(),"max_hired":10},{"name":"Luke McKinney","status":"active","created_at": new Date(), "updated_at": new Date(),"max_hired":5},{"name":"Eugene Stephens","status":"disabled","created_at": new Date(), "updated_at": new Date(),"max_hired":279},{"name":"Mayme Baldwin","status":"active","created_at": new Date(), "updated_at": new Date(),"max_hired":258},{"name":"Lester Hammond","status":"active","created_at": new Date(), "updated_at": new Date(),"max_hired":84},{"name":"Miguel Reid","status":"active","created_at": new Date(), "updated_at": new Date(),"max_hired":85},{"name":"Lulu McGee","status":"active","created_at": new Date(), "updated_at": new Date(),"max_hired":427},{"name":"Cameron Hampton","status":"active","created_at": new Date(), "updated_at": new Date(),"max_hired":408},{"name":"Maud McDonald","status":"active","created_at": new Date(), "updated_at": new Date(),"max_hired":200},{"name":"Ola Armstrong","status":"active","created_at": new Date(), "updated_at": new Date(),"max_hired":33},{"name":"Hunter White","status":"active","created_at": new Date(), "updated_at": new Date(),"max_hired":167},{"name":"Connor Edwards","status":"active","created_at": new Date(), "updated_at": new Date(),"max_hired":82},{"name":"Claudia Holland","status":"active","created_at": new Date(), "updated_at": new Date(),"max_hired":471}], {});
    } else {
      return Promise.resolve(null);
    }
  },

  down: (queryInterface, Sequelize) => {
    if (process.env.TEST_RUN_MIGRATIONS_AND_SEEDERS === 'true') {
      return queryInterface.bulkDelete('positions', null, {});
    } else {
      return Promise.resolve(null);
    }
  }
};
