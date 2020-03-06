module.exports = function(sequelize, DataTypes) {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Category.associate = function(models) {
        Category.Transactions = Category.hasMany(models.Transaction)
    };

    Category.prototype.toJson = function() {
        return {
            id: this.id,
            name: this.name,
            links: {
                self: `/categories/${this.id}`,
            }
        }
    };

    return Category;
};