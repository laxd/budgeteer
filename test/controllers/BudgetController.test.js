const request = require('supertest');
const { Budget } = require('../../src/database/models');
const server = require('../../src/api/server/');

describe('Test Accounts', () => {
    it('should return empty array', (done) => {
        request(server).get('/budgets').then((res) => {
            expect(res.statusCode).toBe(200);
            expect(res.body.data.length).toBe(0);
            done();
        })
    });

    it('should return all budgets', (done) => {
        Budget.build({
            name: "Test"
        }).save(() => {
            request(server).get('/budgets/1').then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.name).toBe("Test");
                done();
            })
        });

    })
});