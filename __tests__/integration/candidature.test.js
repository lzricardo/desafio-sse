require('../../src/config/environment');
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
        expect(candidatureJustObjectEmptyInArrayResponse.body.error).not.toBeNull();
        expect(candidatureJustObjectEmptyInArrayResponse.body.error.message).not.toBeNull();
        expect(candidatureJustObjectEmptyInArrayResponse.body.error.validation).not.toBeNull();
        expect(candidatureJustObjectEmptyInArrayResponse.body.error.message).toBe('Request body schema invalid.');
        expect(candidatureJustObjectEmptyInArrayResponse.body.error.validation).toContain('is required');

        const candidatureJustObjectEmptyResponse = await request(app)
            .post('/v1/candidatures')
            .send({

            });

        expect(candidatureJustObjectEmptyResponse.status).toBe(422);
        expect(candidatureJustObjectEmptyResponse.body.error).not.toBeNull();
        expect(candidatureJustObjectEmptyResponse.body.error.message).not.toBeNull();
        expect(candidatureJustObjectEmptyResponse.body.error.validation).not.toBeNull();
        expect(candidatureJustObjectEmptyResponse.body.error.message).toBe('Request body schema invalid.');
        expect(candidatureJustObjectEmptyResponse.body.error.validation).toContain('must be an array');


        const candidatureNullResponse = await request(app)
            .post('/v1/candidatures')
            .send(null);

        expect(candidatureNullResponse.status).toBe(422);
        expect(candidatureNullResponse.body.error).not.toBeNull();
        expect(candidatureNullResponse.body.error.message).not.toBeNull();
        expect(candidatureNullResponse.body.error.validation).not.toBeNull();
        expect(candidatureNullResponse.body.error.message).toBe('Request body schema invalid.');
        expect(candidatureNullResponse.body.error.validation).toContain('must be an array');

        const candidatureUndefinedResponse = await request(app)
            .post('/v1/candidatures')
            .send(undefined);

        expect(candidatureUndefinedResponse.status).toBe(422);
        expect(candidatureUndefinedResponse.body.error).not.toBeNull();
        expect(candidatureUndefinedResponse.body.error.message).not.toBeNull();
        expect(candidatureUndefinedResponse.body.error.validation).not.toBeNull();
        expect(candidatureUndefinedResponse.body.error.message).toBe('Request body schema invalid.');
        expect(candidatureUndefinedResponse.body.error.validation).toContain('must be an array');

        const candidatureJustArrayEmptyResponse = await request(app)
            .post('/v1/candidatures')
            .send([]);

        expect(candidatureJustArrayEmptyResponse.status).toBe(422);
        expect(candidatureJustArrayEmptyResponse.body.error).not.toBeNull();
        expect(candidatureJustArrayEmptyResponse.body.error.message).not.toBeNull();
        expect(candidatureJustArrayEmptyResponse.body.error.validation).not.toBeNull();
        expect(candidatureJustArrayEmptyResponse.body.error.message).toBe('Request body schema invalid.');
        expect(candidatureJustArrayEmptyResponse.body.error.validation).toContain('does not contain 1 required value(s)');

        const candidatureWithoutPositionResponse = await request(app)
            .post('/v1/candidatures')
            .send([{
                applicant_email: 'lzricardo.ecomp@gmail.com',
                situation: 'hired',
            }]);

        expect(candidatureWithoutPositionResponse.status).toBe(422);
        expect(candidatureWithoutPositionResponse.body.error).not.toBeNull();
        expect(candidatureWithoutPositionResponse.body.error.message).not.toBeNull();
        expect(candidatureWithoutPositionResponse.body.error.validation).not.toBeNull();
        expect(candidatureWithoutPositionResponse.body.error.message).toBe('Request body schema invalid.');
        expect(candidatureWithoutPositionResponse.body.error.validation).toContain('is required');

        const candidatureWithoutSituationResponse = await request(app)
            .post('/v1/candidatures')
            .send([{
                applicant_email: 'lzricardo.ecomp@gmail.com',
                position_name: 'Senior Software Engineer',
            }]);

        expect(candidatureWithoutSituationResponse.status).toBe(422);
        expect(candidatureWithoutSituationResponse.body.error).not.toBeNull();
        expect(candidatureWithoutSituationResponse.body.error.message).not.toBeNull();
        expect(candidatureWithoutSituationResponse.body.error.validation).not.toBeNull();
        expect(candidatureWithoutSituationResponse.body.error.message).toBe('Request body schema invalid.');
        expect(candidatureWithoutSituationResponse.body.error.validation).toContain('is required');
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
                message: 'Request body schema invalid.',
                validation: '"value" must be an array'
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
        expect(candidatureWithDuplicatedElementInArrayResponse.body.error).not.toBeNull();
        expect(candidatureWithDuplicatedElementInArrayResponse.body.error.message).not.toBeNull();
        expect(candidatureWithDuplicatedElementInArrayResponse.body.error.validation).not.toBeNull();
        expect(candidatureWithDuplicatedElementInArrayResponse.body.error.message).toBe('Request body schema invalid.');
        expect(candidatureWithDuplicatedElementInArrayResponse.body.error.validation).toContain('contains a duplicate value');

        const candidatureWithInvalidSituationResponse = await request(app)
            .post('/v1/candidatures')
            .send([{
                applicant_email: 'lzricardo.ecomp@gmail.com',
                position_name: 'Senior Software Engineer',
                situation: 1,
            }]);

        expect(candidatureWithInvalidSituationResponse.status).toBe(422);
        expect(candidatureWithInvalidSituationResponse.body.error).not.toBeNull();
        expect(candidatureWithInvalidSituationResponse.body.error.message).not.toBeNull();
        expect(candidatureWithInvalidSituationResponse.body.error.validation).not.toBeNull();
        expect(candidatureWithInvalidSituationResponse.body.error.message).toBe('Request body schema invalid.');
        expect(candidatureWithInvalidSituationResponse.body.error.validation).toContain('must be one of [assessing, hired, incompatible]');

        const candidatureWithEmptyPositionResponse = await request(app)
            .post('/v1/candidatures')
            .send([{
                applicant_email: 'lzricardo.ecomp@gmail.com',
                position_name: '',
                situation: 'hired',
            }]);

        expect(candidatureWithEmptyPositionResponse.status).toBe(422);
        expect(candidatureWithEmptyPositionResponse.body.error).not.toBeNull();
        expect(candidatureWithEmptyPositionResponse.body.error.message).not.toBeNull();
        expect(candidatureWithEmptyPositionResponse.body.error.validation).not.toBeNull();
        expect(candidatureWithEmptyPositionResponse.body.error.message).toBe('Request body schema invalid.');
        expect(candidatureWithEmptyPositionResponse.body.error.validation).toContain('is not allowed to be empty');

        const candidatureWithInvalidEmailResponse = await request(app)
            .post('/v1/candidatures')
            .send([{
                applicant_email: 'lzricardo.ecompgmail.com',
                position_name: 'Senior Software Engineer',
                situation: 'hired',
            }]);

        expect(candidatureWithInvalidEmailResponse.status).toBe(422);
        expect(candidatureWithInvalidEmailResponse.body.error).not.toBeNull();
        expect(candidatureWithInvalidEmailResponse.body.error.message).not.toBeNull();
        expect(candidatureWithInvalidEmailResponse.body.error.validation).not.toBeNull();
        expect(candidatureWithInvalidEmailResponse.body.error.message).toBe('Request body schema invalid.');
        expect(candidatureWithInvalidEmailResponse.body.error.validation).toContain('must be a valid email');

        const candidatureWithEmptyEmailResponse = await request(app)
            .post('/v1/candidatures')
            .send([{
                applicant_email: '',
                position_name: 'Senior Software Engineer',
                situation: 'hired',
            }]);

        expect(candidatureWithEmptyEmailResponse.status).toBe(422);
        expect(candidatureWithEmptyEmailResponse.body.error).not.toBeNull();
        expect(candidatureWithEmptyEmailResponse.body.error.message).not.toBeNull();
        expect(candidatureWithEmptyEmailResponse.body.error.validation).not.toBeNull();
        expect(candidatureWithEmptyEmailResponse.body.error.message).toBe('Request body schema invalid.');
        expect(candidatureWithEmptyEmailResponse.body.error.validation).toContain('is not allowed to be empty');
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

        expect(candidatureWithAplicantNotFoundResponse.status).toBe(404);
        expect(JSON.stringify(candidatureWithAplicantNotFoundResponse.body)).toBe(JSON.stringify({
            error: {
                message: 'Applicants or positions not found.'
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

        expect(candidatureWithPositionNotFoundResponse.status).toBe(404);
        expect(JSON.stringify(candidatureWithPositionNotFoundResponse.body)).toBe(JSON.stringify({
            error: {
                message: 'Applicants or positions not found.'
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
                message: 'Max candidature by positions exceeded.',
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

        expect(candidatureWithPositionWasDeactivatedResponse.status).toBe(404);
        expect(JSON.stringify(candidatureWithPositionWasDeactivatedResponse.body)).toBe(JSON.stringify({
            error: {
                message: 'Applicants or positions not found.'
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

        expect(candidatureWithAplicantWasDeactivatedResponse.status).toBe(404);
        expect(JSON.stringify(candidatureWithAplicantWasDeactivatedResponse.body)).toBe(JSON.stringify({
            error: {
                message: 'Applicants or positions not found.'
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
                message: 'Duplicated candidature(s) exists.'
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
                message: 'Request body schema invalid.',
                validation: '"value" must contain less than or equal to 25 items'
            }
        }));
    });
});