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

    Candidature.associate = function (models) {
        // associations can be defined here
    };

    Candidature.addHook('afterBulkCreate', (candidatures, options) => {
        const candidaturesSet = candidatures.map(candidature => candidature.get({plain: true}));

        console.log('Pushing to Elastic Search, candidatures => ', candidaturesSet);

        ElasticSearch.bulk(candidaturesSet, {index: 'kenoby'})
            .then(() => {
                console.log('Pushed to Elastic Search');
            })
            .catch(reason => {
                console.error(reason);
            });
    });

    return Candidature;
};