'use strict';
module.exports = (sequelize, DataTypes) => {
  const Candidature = sequelize.define('Candidature', {
    applicant_email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    position_name: {
      type: DataTypes.STRING,
      validate: {
        is: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i,
        notEmpty: true,
      }
    },
    situation: {
      type: DataTypes.ENUM('assessing', 'hired', 'incompatible'),
      validate: {
        isIn: [['assessing', 'hired', 'incompatible']]
      }
    }
  }, {});

  Candidature.associate = function(models) {
    // associations can be defined here
  };

  Candidature.addHook('afterBulkCreate', (candidatures, options) => {
    // ElasticSearch.bulk(candidatures, {index: 'kenoby', type: 'candidatures'})
    //     .then()
    //     .catch();

    console.log('calling hook afterBulkCreate => ', candidatures);
    console.log('options => ', options);
  });

  return Candidature;
};