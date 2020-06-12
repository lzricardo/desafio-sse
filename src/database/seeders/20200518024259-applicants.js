'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    if (process.env.TEST_RUN_MIGRATIONS_AND_SEEDERS === 'true') {
      return queryInterface.bulkInsert('applicants', [{"name":"Tatiante Mesquita","email":"tatiane.mesquita@kenoby.com","status":"active","created_at": new Date(), "updated_at": new Date()},{"name":"Eduardo Zagari","email":"eduardo.zagari@kenoby.com","status":"active","created_at": new Date(), "updated_at": new Date()},{"name":"Luiz Ricardo","email":"lzricardo.ecomp@gmail.com","status":"active","created_at": new Date(), "updated_at": new Date()},{"name":"Katie Greene","email":"ohazo@dajfa.mc","status":"inactive","created_at": new Date(), "updated_at": new Date()},{"name":"Billy Norris","email":"wip@leg.pf","status":"active","created_at": new Date(), "updated_at": new Date()},{"name":"Lois Andrews","email":"to@fut.gw","status":"active","created_at": new Date(), "updated_at": new Date()},{"name":"Josephine McBride","email":"vuage@focpowhet.bg","status":"active","created_at": new Date(), "updated_at": new Date()},{"name":"Earl Shaw","email":"redo@luretuf.ug","status":"active","created_at": new Date(), "updated_at": new Date()},{"name":"Pauline Cook","email":"hubobab@ca.bv","status":"active","created_at": new Date(), "updated_at": new Date()},{"name":"Beatrice Pittman","email":"pal@lafwathic.is","status":"active","created_at": new Date(), "updated_at": new Date()},{"name":"Willie Dunn","email":"teata@def.la","status":"active","created_at": new Date(), "updated_at": new Date()},{"name":"Eugene Carlson","email":"pafhuw@li.ie","status":"active","created_at": new Date(), "updated_at": new Date()},{"name":"Harvey Luna","email":"supawi@mempe.aw","status":"active","created_at": new Date(), "updated_at": new Date()},{"name":"Lenora Fitzgerald","email":"keda@get.pk","status":"active","created_at": new Date(), "updated_at": new Date()},{"name":"Landon Joseph","email":"dezzaja@paga.zw","status":"active","created_at": new Date(), "updated_at": new Date()},{"name":"Jay McBride","email":"odru@eha.cx","status":"active","created_at": new Date(), "updated_at": new Date()},{"name":"Nathan Kelly","email":"uwvu@seib.ee","status":"active","created_at": new Date(), "updated_at": new Date()}], {});
    } else {
      return Promise.resolve(null);
    }
  },

  down: (queryInterface, Sequelize) => {
    if (process.env.TEST_RUN_MIGRATIONS_AND_SEEDERS === 'true') {
      return queryInterface.bulkDelete('applicants', null, {});
    } else {
      return Promise.resolve(null);
    }
  }
};
