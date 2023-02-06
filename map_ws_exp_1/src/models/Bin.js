const createBin = (sequelize, DataTypes) => {
    const Bin = sequelize.define(
        'Bin',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            latitude: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            longitude: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            heigth: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            weight: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            maxWeight: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'Bin',
            timestamps: true
        }
    );
    return Bin;
};

module.exports = createBin;
