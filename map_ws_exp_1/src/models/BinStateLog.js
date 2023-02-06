const createBinStateLog = (sequelize, DataTypes) => {
    const BinStateLog = sequelize.define(
        'BinStateLog',
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
            status: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'BinStateLog',
            timestamps: true
        }
    );
    return BinStateLog;
};

module.exports = createBinStateLog;
