'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('positions', [{"name":"Luke McKinney","status":"active","maxHired":5},{"name":"Eugene Stephens","status":"inactive","maxHired":279},{"name":"Mayme Baldwin","status":"active","maxHired":258},{"name":"Lester Hammond","status":"active","maxHired":84},{"name":"Miguel Reid","status":"active","maxHired":85},{"name":"Lulu McGee","status":"active","maxHired":427},{"name":"Cameron Hampton","status":"active","maxHired":408},{"name":"Maud McDonald","status":"active","maxHired":200},{"name":"Ola Armstrong","status":"active","maxHired":33},{"name":"Hunter White","status":"active","maxHired":167},{"name":"Connor Edwards","status":"active","maxHired":82},{"name":"Claudia Holland","status":"active","maxHired":471}], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('positions', null, {});
  }
};
