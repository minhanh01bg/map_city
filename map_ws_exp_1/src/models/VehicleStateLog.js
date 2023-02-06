const createVehicleStateLog = (sequelize, DataTypes) => {
    const VehicleStateLog = sequelize.define(
        'VehicleStateLog',
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
            altitude: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            speed: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            angle: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            odometer: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'VehicleStateLog',
            timestamps: true
        }
    );
    return VehicleStateLog;
};

module.exports = createVehicleStateLog;
