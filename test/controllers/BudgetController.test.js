const request = require('supertest');
const models = require('../../src/database/models');
const server = require('../../src/api/');

describe('Test Budgets', function() {

    beforeAll(function () {
        return require('../../src/database/models').sequelize.sync();
    });

    beforeEach(function () {
        return Promise.all([
            models.Budget.destroy({ truncate: true})
        ]);
    });

    it('should return empty array', (done) => {
        request(server).get('/budgets').then((res) => {
            expect(res.statusCode).toBe(200);
            expect(res.body.data.length).toBe(0);
            done();
        })
    });

    it('should return all budgets', (done) => {
        Promise.all([
            models.Budget.create({name: "Test1"}),
            models.Budget.create({name: "Test2"}),
            models.Budget.create({name: "Test3"})
        ]).then(() => {
            request(server).get('/budgets').then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.data.length).toBe(3);
                done();
            })
        })
    });

    it('should return all budgets', (done) => {
        models.Budget.create({
            name: "Test"
        }).then((budget) => {
            request(server).get('/budgets/' + budget.id).then((res) => {
                console.log("Got response");
                expect(res.statusCode).toBe(200);
                expect(res.body.name).toBe("Test");
                done();
            })
        });
    })
});