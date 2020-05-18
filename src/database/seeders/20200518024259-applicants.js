'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('applicants', [{"name":"Katie Greene","email":"ohazo@dajfa.mc","status":"inactive"},{"name":"Billy Norris","email":"wip@leg.pf","status":"active"},{"name":"Lois Andrews","email":"to@fut.gw","status":"active"},{"name":"Josephine McBride","email":"vuage@focpowhet.bg","status":"active"},{"name":"Earl Shaw","email":"redo@luretuf.ug","status":"active"},{"name":"Pauline Cook","email":"hubobab@ca.bv","status":"active"},{"name":"Beatrice Pittman","email":"pal@lafwathic.is","status":"active"},{"name":"Willie Dunn","email":"teata@def.la","status":"active"},{"name":"Eugene Carlson","email":"pafhuw@li.ie","status":"active"},{"name":"Harvey Luna","email":"supawi@mempe.aw","status":"active"},{"name":"Lenora Fitzgerald","email":"keda@get.pk","status":"active"},{"name":"Landon Joseph","email":"dezzaja@paga.zw","status":"active"},{"name":"Jay McBride","email":"odru@eha.cx","status":"active"},{"name":"Nathan Kelly","email":"uwvu@seib.ee","status":"active"}], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('applicants', null, {});
  }
};
