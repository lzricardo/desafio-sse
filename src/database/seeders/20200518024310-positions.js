'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('positions', [{"name":"Luke McKinney","status":"active","created_at": new Date(), "updated_at": new Date(),"maxHired":5},{"name":"Eugene Stephens","status":"inactive","created_at": new Date(), "updated_at": new Date(),"maxHired":279},{"name":"Mayme Baldwin","status":"active","created_at": new Date(), "updated_at": new Date(),"maxHired":258},{"name":"Lester Hammond","status":"active","created_at": new Date(), "updated_at": new Date(),"maxHired":84},{"name":"Miguel Reid","status":"active","created_at": new Date(), "updated_at": new Date(),"maxHired":85},{"name":"Lulu McGee","status":"active","created_at": new Date(), "updated_at": new Date(),"maxHired":427},{"name":"Cameron Hampton","status":"active","created_at": new Date(), "updated_at": new Date(),"maxHired":408},{"name":"Maud McDonald","status":"active","created_at": new Date(), "updated_at": new Date(),"maxHired":200},{"name":"Ola Armstrong","status":"active","created_at": new Date(), "updated_at": new Date(),"maxHired":33},{"name":"Hunter White","status":"active","created_at": new Date(), "updated_at": new Date(),"maxHired":167},{"name":"Connor Edwards","status":"active","created_at": new Date(), "updated_at": new Date(),"maxHired":82},{"name":"Claudia Holland","status":"active","created_at": new Date(), "updated_at": new Date(),"maxHired":471}], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('positions', null, {});
  }
};
