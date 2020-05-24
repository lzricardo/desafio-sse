const { Candidature } = require('../../src/app/models');
const truncate = require('../utils/truncate');

beforeEach(async () => {
    await truncate();
});

afterAll(async () => {
    await truncate();
});

describe('Candidature\'s model\'s operations', () => {
    it('should be persist a candidature',  async (done) => {
        const candidatureSaved = await Candidature.create({
            applicant_email: 'lzricardo.ecomp@gmail.com',
            position_name: 'Senior Software Engineer',
            situation: 'hired',
        });

        const candidatureRecovered = await Candidature.findByPk(candidatureSaved.id);

        expect(candidatureSaved.applicant_email).toBe(candidatureRecovered.applicant_email);
        expect(candidatureSaved.position_name).toBe(candidatureRecovered.position_name);
        expect(candidatureSaved.situation).toBe(candidatureRecovered.situation);
        done();
    });

    it('should be send message error for save candidature without any required fields', async () => {
        try {
            await Candidature.create({
            })
        } catch (e) {
            expect(e.message).toMatch('error');
        }

        try {
            await Candidature.create({
                applicant_email: 'lzricardo.ecomp@gmail.com',
                situation: 'hired',
            });
        } catch (e) {
            expect(e.message).toMatch('error');
        }

        let mockDontExecute = jest.fn();

        //This don't throw error because exist default situation.
        try {
            await Candidature.create({
                applicant_email: 'lzricardo.ecomp@gmail.com',
                position_name: 'Senior Software Engineer',
            });
        } catch (e) {
            mockDontExecute();
        }

        expect(mockDontExecute.mock.calls.length).toBe(0);
    });

    it('should be send message error for save candidature with invalid value for any fields', async () => {
        try {
            await Candidature.create({
                applicant_email: 'lzricardo.ecomp@gmail.com',
                position_name: 'Senior Software Engineer',
                situation: 1,
            });
        } catch (e) {
            expect(e.message).toMatch('error');
        }

        try {
            await Candidature.create({
                applicant_email: 'lzricardo.ecomp@gmail.com',
                position_name: '',
                situation: 'hired',
            });
        } catch (e) {
            expect(e.message).toMatch('error');
        }

        try {
            await Candidature.create({
                applicant_email: 'lzricardo.ecompgmail.com',
                position_name: 'Senior Software Engineer',
                situation: 'hired',
            });
        } catch (e) {
            expect(e.message).toMatch('error');
        }

        try {
            await Candidature.create({
                applicant_email: '',
                position_name: 'Senior Software Engineer',
                situation: 'hired',
            });
        } catch (e) {
            expect(e.message).toMatch('error');
        }
    });
});