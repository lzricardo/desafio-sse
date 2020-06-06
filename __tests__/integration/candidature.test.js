const request = require('supertest');
const app = require('../../src/app');
const { Candidature } = require('../../src/app/models');
// const truncate = require('../utils/truncate');

describe('Candidature\'s operations controller',() => {
    it('should be persist a candidature successfully', async () => {
        const savedCandidature = await request(app)
            .post('/v1/candidatures')
            .send([
                {
                    applicant_email: 'lzricardo.ecomp@gmail.com',
                    position_name: 'Senior Software Engineer',
                    situation: 'hired'
                }
            ]);

        const recoveredCandidature = await Candidature.findByPk(savedCandidature.id);

        expect(savedCandidature.applicant_email).toBe(recoveredCandidature.applicant_email);
        expect(savedCandidature.position_name).toBe(recoveredCandidature.position_name);
        expect(savedCandidature.situation).toBe(recoveredCandidature.situation);

        const savedCandidatures = await request(app)
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

        const recoveredCandidature1 = await Candidature.findByPk(savedCandidatures[0].id);
        const recoveredCandidature2 = await Candidature.findByPk(savedCandidatures[1].id);

        expect(savedCandidature[0].applicant_email).toBe(recoveredCandidature1.applicant_email);
        expect(savedCandidature[0].position_name).toBe(recoveredCandidature1.position_name);
        expect(savedCandidature[0].situation).toBe(recoveredCandidature1.situation);

        expect(savedCandidature[1].applicant_email).toBe(recoveredCandidature2.applicant_email);
        expect(savedCandidature[1].position_name).toBe(recoveredCandidature2.position_name);
        expect(savedCandidature[1].situation).toBe(recoveredCandidature2.situation);
    });

    it('should be send message error for save candidature without some required fields', async () => {
        const candidatureEmptyResponse = await request(app)
            .post('/v1/candidatures')
            .send([{

            }]);

        expect(candidatureEmptyResponse.status).toBe(400);
        expect(candidatureEmptyResponse.body).toBe({
            error: {
                message: ''
            }
        });

        const candidatureWithoutPositionResponse = await request(app)
            .post('/v1/candidatures')
            .send([{
                applicant_email: 'lzricardo.ecomp@gmail.com',
                situation: 'hired',
            }]);

        expect(candidatureWithoutPositionResponse.status).toBe(400);
        expect(candidatureWithoutPositionResponse.body).toBe({
            error: {
                message: ''
            }
        });

        const candidatureWithoutSituationResponse = await request(app)
            .post('/v1/candidatures')
            .send([{
                applicant_email: 'lzricardo.ecomp@gmail.com',
                position_name: 'Senior Software Engineer',
            }]);

        expect(candidatureWithoutSituationResponse.status).toBe(400);
        expect(candidatureWithoutSituationResponse.body).toBe({
            error: {
                message: ''
            }
        });
    });

    it('should be send message error for save candidature with invalid value for some fields', async () => {
        const candidatureWithoutArrayStructureResponse = await request(app)
            .post('/v1/candidatures')
            .send({
                applicant_email: 'lzricardo.ecomp@gmail.com',
                position_name: 'Senior Software Engineer',
                situation: 'hired',
            });

        expect(candidatureWithoutArrayStructureResponse.status).toBe(400);
        expect(candidatureWithoutArrayStructureResponse.body).toBe({
            error: {
                message: ''
            }
        });

        const candidatureWithInvalidSituationResponse = await request(app)
            .post('/v1/candidatures')
            .send([{
                applicant_email: 'lzricardo.ecomp@gmail.com',
                position_name: 'Senior Software Engineer',
                situation: 1,
            }]);

        expect(candidatureWithInvalidSituationResponse.status).toBe(400);
        expect(candidatureWithInvalidSituationResponse.body).toBe({
            error: {
                message: ''
            }
        });

        const candidatureWithEmptyPositionResponse = await request(app)
            .post('/v1/candidatures')
            .send([{
                applicant_email: 'lzricardo.ecomp@gmail.com',
                position_name: '',
                situation: 'hired',
            }]);

        expect(candidatureWithEmptyPositionResponse.status).toBe(400);
        expect(candidatureWithEmptyPositionResponse.body).toBe({
            error: {
                message: ''
            }
        });

        const candidatureWithInvalidEmailResponse = await request(app)
            .post('/v1/candidatures')
            .send([{
                applicant_email: 'lzricardo.ecompgmail.com',
                position_name: 'Senior Software Engineer',
                situation: 'hired',
            }]);

        expect(candidatureWithInvalidEmailResponse.status).toBe(400);
        expect(candidatureWithInvalidEmailResponse.body).toBe({
            error: {
                message: ''
            }
        });

        const candidatureWithEmptyEmailResponse = await request(app)
            .post('/v1/candidatures')
            .send([{
                applicant_email: '',
                position_name: 'Senior Software Engineer',
                situation: 'hired',
            }]);

        expect(candidatureWithEmptyEmailResponse.status).toBe(400);
        expect(candidatureWithEmptyEmailResponse.body).toBe({
            error: {
                message: ''
            }
        });
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

            expect(candidatureWithAplicantNotFoundResponse.status).toBe(400);
            expect(candidatureWithAplicantNotFoundResponse.body).toBe({
                error: {
                    message: ''
                }
            });
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

        expect(candidatureWithPositionNotFoundResponse.status).toBe(400);
        expect(candidatureWithPositionNotFoundResponse.body).toBe({
            error: {
                message: ''
            }
        });
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

        expect(candidatureWithAplicantMaxHiredExceededResponse.status).toBe(400);
        expect(candidatureWithAplicantMaxHiredExceededResponse.body).toBe({
            error: {
                message: ''
            }
        });
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

        expect(candidatureWithPositionWasDeactivatedResponse.status).toBe(400);
        expect(candidatureWithPositionWasDeactivatedResponse.body).toBe({
            error: {
                message: ''
            }
        });
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

        expect(candidatureWithAplicantWasDeactivatedResponse.status).toBe(400);
        expect(candidatureWithAplicantWasDeactivatedResponse.body).toBe({
            error: {
                message: ''
            }
        });
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

        expect(candidatureWithDuplicationResponse.status).toBe(400);
        expect(candidatureWithDuplicationResponse.body).toBe({
            error: {
                message: ''
            }
        });
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

        expect(candidaturesWithBatchGreaterThanMaxValueResponse.status).toBe(400);
        expect(candidaturesWithBatchGreaterThanMaxValueResponse.body).toBe({
            error: {
                message: ''
            }
        });
    });
});