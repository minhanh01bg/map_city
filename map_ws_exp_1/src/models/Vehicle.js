const createVehicle = (sequelize, DataTypes) => {
    const Vehicle = sequelize.define(
        'Vehicle',
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
            code: {
                type: DataTypes.STRING,
                allowNull: false
            },
            brand: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            licensePlate: {
                type: DataTypes.STRING,
                allowNull: false
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false
            },
            altitude: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            emptyWeight: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            width: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            length: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            speed: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            maxSpeed: {
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
            tableName: 'Vehicle',
            timestamps: true
        }
    );
    return Vehicle;
};

module.exports = createVehicle;
