const createPath = (sequelize, DataTypes) => {
    const Path = sequelize.define(
        'Path',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            start: {
                type: DataTypes.STRING,
                allowNull: false
            },
            end: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'Path',
            timestamps: true
        }
    );
    return Path;
};

module.exports = createPath;
