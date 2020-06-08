require('../../src/config/constants');
require('../../src/config/validator');

const request = require('supertest');
const app = require('../../src/app');
const { Candidature } = require('../../src/app/models');
// const truncate = require('../utils/truncate');

describe('Candidature\'s operations controller',() => {
    it('should be persist a candidature successfully', async () => {
        const savedCandidatureResponse = await request(app)
            .post('/v1/candidatures')
            .send([
                {
                    applicant_email: 'lzricardo.ecomp@gmail.com',
                    position_name: 'Senior Software Engineer',
                    situation: 'hired'
                }
            ]);

        expect(savedCandidatureResponse.status).toBe(200);

        const recoveredCandidature = await Candidature.findByPk(savedCandidatureResponse.body[0].id);

        expect(savedCandidatureResponse.body[0].applicant_email).toBe(recoveredCandidature.applicant_email);
        expect(savedCandidatureResponse.body[0].position_name).toBe(recoveredCandidature.position_name);
        expect(savedCandidatureResponse.body[0].situation).toBe(recoveredCandidature.situation);

        expect(savedCandidatureResponse.body.length).toBe(1);

        const savedCandidaturesResponse = await request(app)
            .post('/v1/candidatures')
            .send([
                {
                    applicant_email: 'eduardo.zagari@kenoby.com',
                    position_name: 'Chief Technology Officer',
                    situation: 'hired'
                },
                {
                    applicant_email: 'tatiane.mesquita@kenoby.com',
                    position_name: 'HR Supervisor',
                    situation: 'hired'
                }
            ]);

        expect(savedCandidaturesResponse.status).toBe(200);

        const recoveredCandidature1 = await Candidature.findByPk(savedCandidaturesResponse.body[0].id);
        const recoveredCandidature2 = await Candidature.findByPk(savedCandidaturesResponse.body[1].id);

        expect(savedCandidaturesResponse.body[0].applicant_email).toBe(recoveredCandidature1.applicant_email);
        expect(savedCandidaturesResponse.body[0].position_name).toBe(recoveredCandidature1.position_name);
        expect(savedCandidaturesResponse.body[0].situation).toBe(recoveredCandidature1.situation);

        expect(savedCandidaturesResponse.body[1].applicant_email).toBe(recoveredCandidature2.applicant_email);
        expect(savedCandidaturesResponse.body[1].position_name).toBe(recoveredCandidature2.position_name);
        expect(savedCandidaturesResponse.body[1].situation).toBe(recoveredCandidature2.situation);

        expect(savedCandidaturesResponse.body.length).toBe(2);
    });

    it('should be send message error for save candidature without some required fields', async () => {
        const candidatureJustObjectEmptyInArrayResponse = await request(app)
            .post('/v1/candidatures')
            .send([{

            }]);

        expect(candidatureJustObjectEmptyInArrayResponse.status).toBe(422);
        expect(JSON.stringify(candidatureJustObjectEmptyInArrayResponse.body)).toBe(JSON.stringify({
            error: {
                message: ''
            }
        }));

        const candidatureJustObjectEmptyResponse = await request(app)
            .post('/v1/candidatures')
            .send({

            });

        expect(candidatureJustObjectEmptyResponse.status).toBe(422);
        expect(JSON.stringify(candidatureJustObjectEmptyResponse.body)).toBe(JSON.stringify({
            error: {
                message: ''
            }
        }));

        const candidatureNullResponse = await request(app)
            .post('/v1/candidatures')
            .send(null);

        expect(candidatureNullResponse.status).toBe(422);
        expect(JSON.stringify(candidatureNullResponse.body)).toBe(JSON.stringify({
            error: {
                message: ''
            }
        }));

        const candidatureUndefinedResponse = await request(app)
            .post('/v1/candidatures')
            .send(undefined);

        expect(candidatureUndefinedResponse.status).toBe(422);
        expect(JSON.stringify(candidatureUndefinedResponse.body)).toBe(JSON.stringify({
            error: {
                message: ''
            }
        }));

        const candidatureJustArrayEmptyResponse = await request(app)
            .post('/v1/candidatures')
            .send([]);

        expect(candidatureJustArrayEmptyResponse.status).toBe(422);
        expect(JSON.stringify(candidatureJustArrayEmptyResponse.body)).toBe(JSON.stringify({
            error: {
                message: ''
            }
        }));

        const candidatureWithoutPositionResponse = await request(app)
            .post('/v1/candidatures')
            .send([{
                applicant_email: 'lzricardo.ecomp@gmail.com',
                situation: 'hired',
            }]);

        expect(candidatureWithoutPositionResponse.status).toBe(422);
        expect(JSON.stringify(candidatureWithoutPositionResponse.body)).toBe(JSON.stringify({
            error: {
                message: ''
            }
        }));

        const candidatureWithoutSituationResponse = await request(app)
            .post('/v1/candidatures')
            .send([{
                applicant_email: 'lzricardo.ecomp@gmail.com',
                position_name: 'Senior Software Engineer',
            }]);

        expect(candidatureWithoutSituationResponse.status).toBe(422);
        expect(JSON.stringify(candidatureWithoutSituationResponse.body)).toBe(JSON.stringify({
            error: {
                message: ''
            }
        }));
    });

    it('should be send message error for save candidature with invalid value for some fields', async () => {
        const candidatureWithoutArrayStructureResponse = await request(app)
            .post('/v1/candidatures')
            .send({
                applicant_email: 'lzricardo.ecomp@gmail.com',
                position_name: 'Senior Software Engineer',
                situation: 'hired',
            });

        expect(candidatureWithoutArrayStructureResponse.status).toBe(422);
        expect(JSON.stringify(candidatureWithoutArrayStructureResponse.body)).toBe(JSON.stringify({
            error: {
                message: ''
            }
        }));

        const candidatureWithDuplicatedElementInArrayResponse = await request(app)
            .post('/v1/candidatures')
            .send([
                {
                    applicant_email: 'lzricardo.ecomp@gmail.com',
                    position_name: 'Senior Software Engineer',
                    situation: 'assessing',
                },
                {
                    applicant_email: 'lzricardo.ecomp@gmail.com',
                    position_name: 'Senior Software Engineer',
                    situation: 'hired',
                },
            ]);

        expect(candidatureWithDuplicatedElementInArrayResponse.status).toBe(422);
        expect(JSON.stringify(candidatureWithDuplicatedElementInArrayResponse.body)).toBe(JSON.stringify({
            error: {
                message: ''
            }
        }));

        const candidatureWithInvalidSituationResponse = await request(app)
            .post('/v1/candidatures')
            .send([{
                applicant_email: 'lzricardo.ecomp@gmail.com',
                position_name: 'Senior Software Engineer',
                situation: 1,
            }]);

        expect(candidatureWithInvalidSituationResponse.status).toBe(422);
        expect(JSON.stringify(candidatureWithInvalidSituationResponse.body)).toBe(JSON.stringify({
            error: {
                message: ''
            }
        }));

        const candidatureWithEmptyPositionResponse = await request(app)
            .post('/v1/candidatures')
            .send([{
                applicant_email: 'lzricardo.ecomp@gmail.com',
                position_name: '',
                situation: 'hired',
            }]);

        expect(candidatureWithEmptyPositionResponse.status).toBe(422);
        expect(JSON.stringify(candidatureWithEmptyPositionResponse.body)).toBe(JSON.stringify({
            error: {
                message: ''
            }
        }));

        const candidatureWithInvalidEmailResponse = await request(app)
            .post('/v1/candidatures')
            .send([{
                applicant_email: 'lzricardo.ecompgmail.com',
                position_name: 'Senior Software Engineer',
                situation: 'hired',
            }]);

        expect(candidatureWithInvalidEmailResponse.status).toBe(422);
        expect(JSON.stringify(candidatureWithInvalidEmailResponse.body)).toBe(JSON.stringify({
            error: {
                message: ''
            }
        }));

        const candidatureWithEmptyEmailResponse = await request(app)
            .post('/v1/candidatures')
            .send([{
                applicant_email: '',
                position_name: 'Senior Software Engineer',
                situation: 'hired',
            }]);

        expect(candidatureWithEmptyEmailResponse.status).toBe(422);
        expect(JSON.stringify(candidatureWithEmptyEmailResponse.body)).toBe(JSON.stringify({
            error: {
                message: ''
            }
        }));
    });
});

describe('Particular cases for Candidature\'s operations controller',() => {
    it('should be send message error because applicant not exists', async () => {
        const candidatureWithAplicantNotFoundResponse = await request(app)
            .post('/v1/candidatures')
            .send([
                {
                    applicant_email: 'ruanderson.bill@gmail.com',
                    position_name: 'Senior Software Engineer',
                    situation: 'hired'
                }
            ]);

        expect(candidatureWithAplicantNotFoundResponse.status).toBe(422);
        expect(JSON.stringify(candidatureWithAplicantNotFoundResponse.body)).toBe(JSON.stringify({
            error: {
                message: ''
            }
        }));
    });

    it('should be send message error because position not exists', async () => {
        const candidatureWithPositionNotFoundResponse = await request(app)
            .post('/v1/candidatures')
            .send([
                {
                    applicant_email: 'lzricardo.ecomp@gmail.com',
                    position_name: 'Backend Software Engineer',
                    situation: 'hired'
                }
            ]);

        expect(candidatureWithPositionNotFoundResponse.status).toBe(422);
        expect(JSON.stringify(candidatureWithPositionNotFoundResponse.body)).toBe(JSON.stringify({
            error: {
                message: ''
            }
        }));
    });

    it('should be send message error because position have maxHired exceeded', async () => {
        const candidatureWithAplicantMaxHiredExceededResponse = await request(app)
            .post('/v1/candidatures')
            .send([
                {
                    applicant_email: 'lzricardo.ecomp@gmail.com',
                    position_name: 'Luke McKinney',
                    situation: 'hired'
                },
                {
                    applicant_email: 'eduardo.zagari@kenoby.com',
                    position_name: 'Luke McKinney',
                    situation: 'hired'
                },
                {
                    applicant_email: 'tatiane.mesquita@kenoby.com',
                    position_name: 'Luke McKinney',
                    situation: 'hired'
                },
                {
                    applicant_email: 'wip@leg.pf',
                    position_name: 'Luke McKinney',
                    situation: 'hired'
                },
                {
                    applicant_email: 'to@fut.gw',
                    position_name: 'Luke McKinney',
                    situation: 'hired'
                },
                {
                    applicant_email: 'vuage@focpowhet.bg',
                    position_name: 'Luke McKinney',
                    situation: 'hired'
                }
            ]);

        expect(candidatureWithAplicantMaxHiredExceededResponse.status).toBe(422);
        expect(JSON.stringify(candidatureWithAplicantMaxHiredExceededResponse.body)).toBe(JSON.stringify({
            error: {
                message: '',
                positions: ['Luke McKinney']
            }
        }));
    });

    it('should be send message error because position was deactivated', async () => {
        const candidatureWithPositionWasDeactivatedResponse = await request(app)
            .post('/v1/candidatures')
            .send([
                {
                    applicant_email: 'lzricardo.ecomp@gmail.com',
                    position_name: 'Eugene Stephens',
                    situation: 'hired'
                }
            ]);

        expect(candidatureWithPositionWasDeactivatedResponse.status).toBe(422);
        expect(JSON.stringify(candidatureWithPositionWasDeactivatedResponse.body)).toBe(JSON.stringify({
            error: {
                message: ''
            }
        }));
    });

    it('should be send message error because applicant was deactivated', async () => {
        const candidatureWithAplicantWasDeactivatedResponse = await request(app)
            .post('/v1/candidatures')
            .send([
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                }
            ]);

        expect(candidatureWithAplicantWasDeactivatedResponse.status).toBe(422);
        expect(JSON.stringify(candidatureWithAplicantWasDeactivatedResponse.body)).toBe(JSON.stringify({
            error: {
                message: ''
            }
        }));
    });

    it('should be send message error because candidature is duplicated', async () => {
        const candidatureWithDuplicationResponse = await request(app)
            .post('/v1/candidatures')
            .send([
                {
                    applicant_email: 'lzricardo.ecomp@gmail.com',
                    position_name: 'Senior Software Engineer',
                    situation: 'hired'
                }
            ]);

        expect(candidatureWithDuplicationResponse.status).toBe(422);
        expect(JSON.stringify(candidatureWithDuplicationResponse.body)).toBe(JSON.stringify({
            error: {
                message: ''
            }
        }));
    });

    it('should be send message error because batch candidates greater than value max allowed', async () => {
        const candidaturesWithBatchGreaterThanMaxValueResponse = await request(app)
            .post('/v1/candidatures')
            .send([
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                },
                {
                    applicant_email: 'ohazo@dajfa.mc',
                    position_name: 'Mayme Baldwin',
                    situation: 'hired'
                }
            ]);

        expect(candidaturesWithBatchGreaterThanMaxValueResponse.status).toBe(422);
        expect(JSON.stringify(candidaturesWithBatchGreaterThanMaxValueResponse.body)).toBe(JSON.stringify({
            error: {
                message: ''
            }
        }));
    });
});