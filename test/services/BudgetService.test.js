const models = require('../../src/database/models');
const BudgetService = require('../../src/services/BudgetService');

describe('Test Budget Service', function() {

    beforeAll(function () {
        return require('../../src/database/models').sequelize.sync();
    });

    beforeEach(function () {
        return Promise.all([
            models.Budget.destroy({ truncate: true})
        ]);
    });

    it('should return empty array', (done) => {
        BudgetService.findAll()
        .then(budgets => {
            expect(budgets.length).toBe(0);
            done();
        });
    });

    it('should return all budgets', (done) => {
        Promise.all([
            models.Budget.create({name: "Test1"}),
            models.Budget.create({name: "Test2"}),
            models.Budget.create({name: "Test3"})
        ]).then(({budgets}) => {
            expect(budgets.length).toBe(3);
            done();
        })
    });

    it('should return all budgets', (done) => {
        models.Budget.create({
            name: "Test"
        }).then((budget) => {
            expect()
        });
    })
});