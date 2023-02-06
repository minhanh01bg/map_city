const { DataTypes, Sequelize } = require('sequelize');

const sequelize = new Sequelize('map_ws_dev', 'root', 'S1mple00@', {
    host: 'localhost',
    dialect: 'mysql'
});

const Vehicle = sequelize.define(
    'Vehicle',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        latitude: {
            type: DataTypes.DOUBLE
        },
        longitude: {
            type: DataTypes.DOUBLE
        },
        model: {
            type: DataTypes.STRING
        },
        engineHours: {
            type: DataTypes.STRING
        },
        odometer: {
            type: DataTypes.DOUBLE
        },
        plate: {
            type: DataTypes.STRING
        },
        altitude: {
            type: DataTypes.DOUBLE
        },
        angle: {
            type: DataTypes.DOUBLE
        },
        image: {
            type: DataTypes.STRING
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

const VehicleStateLog = sequelize.define(
    'VehicleStateLog',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        latitude: {
            type: DataTypes.DOUBLE
        },
        longitude: {
            type: DataTypes.DOUBLE
        },
        altitude: {
            type: DataTypes.DOUBLE
        },
        speed: {
            type: DataTypes.DOUBLE
        },
        angle: {
            type: DataTypes.DOUBLE
        },
        odometer: {
            type: DataTypes.DOUBLE
        },
        status: {
            type: DataTypes.STRING
        },
        vehicleId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Vehicle',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    },
    {
        tableName: 'VehicleStateLog',
        timestamps: true
    }
);

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        phone: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        gender: {
            type: DataTypes.STRING
        },
        dob: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'User',
        timestamps: true
    }
);

const Area = sequelize.define(
    'Area',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'Area',
        timestamps: true
    }
);

const Bin = sequelize.define(
    'Bin',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        latitude: {
            type: DataTypes.DOUBLE
        },
        longitude: {
            type: DataTypes.DOUBLE
        },
        heigth: {
            type: DataTypes.DOUBLE
        },
        weight: {
            type: DataTypes.DOUBLE
        },
        maxWeight: {
            type: DataTypes.DOUBLE
        },
        image: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        },
        areaId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Area',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    },
    {
        tableName: 'Bin',
        timestamps: true
    }
);

const BinStateLog = sequelize.define(
    'BinStateLog',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        latitude: {
            type: DataTypes.DOUBLE
        },
        longitude: {
            type: DataTypes.DOUBLE
        },
        weight: {
            type: DataTypes.DOUBLE
        },
        status: {
            type: DataTypes.STRING
        },
        binId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Bin',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    },
    {
        tableName: 'BinStateLog',
        timestamps: true
    }
);

const Task = sequelize.define(
    'Task',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        vehicleId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Vehicle',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        areaId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Area',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        status: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'Task',
        timestamps: true
    }
);

async function createDB() {
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
}

module.exports = {
    createDB,
    Vehicle,
    VehicleStateLog,
    User,
    Area,
    Bin,
    BinStateLog,
    Task
};
