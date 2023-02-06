const { DataTypes, Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
);

const ADM_Vehicle = sequelize.define(
    'adm_vehicle',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        engineHours: {
            type: DataTypes.TEXT
        },
        engineId: {
            type: DataTypes.TEXT
        },
        engineType: {
            type: DataTypes.TEXT
        },
        model: {
            type: DataTypes.TEXT
        },
        height: {
            type: DataTypes.DOUBLE
        },
        length: {
            type: DataTypes.DOUBLE
        },
        width: {
            type: DataTypes.DOUBLE
        },
        odometer: {
            type: DataTypes.DOUBLE
        },
        plate: {
            type: DataTypes.TEXT
        },
        tonnage: {
            type: DataTypes.DOUBLE
        },
        image: {
            type: DataTypes.TEXT
        },
        description: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.TEXT
        }
    },
    {
        tableName: 'adm_vehicle',
        timestamps: true
    }
);

const ADM_User = sequelize.define(
    'adm_user',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        phone: {
            type: DataTypes.TEXT
        },
        password: {
            type: DataTypes.TEXT
        },
        email: {
            type: DataTypes.TEXT
        },
        firstName: {
            type: DataTypes.TEXT
        },
        lastName: {
            type: DataTypes.TEXT
        },
        gender: {
            type: DataTypes.TEXT
        },
        dob: {
            type: DataTypes.TEXT
        },
        image: {
            type: DataTypes.TEXT
        },
        role: {
            type: DataTypes.TEXT
        },
        description: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.TEXT
        }
    },
    {
        tableName: 'adm_user',
        timestamps: true
    }
);

const ADM_Area = sequelize.define(
    'adm_area',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        acreage: {
            type: DataTypes.DOUBLE
        },
        description: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.TEXT
        }
    },
    {
        tableName: 'adm_area',
        timestamps: true
    }
);

const ADM_Bin = sequelize.define(
    'adm_bin',
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
        address: {
            type: DataTypes.TEXT
        },
        height: {
            type: DataTypes.DOUBLE
        },
        length: {
            type: DataTypes.DOUBLE
        },
        width: {
            type: DataTypes.DOUBLE
        },
        maxWeight: {
            type: DataTypes.DOUBLE
        },
        color: {
            type: DataTypes.TEXT
        },
        material: {
            type: DataTypes.TEXT
        },
        brand: {
            type: DataTypes.TEXT
        },
        image: {
            type: DataTypes.TEXT
        },
        description: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.TEXT
        },
        areaId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'adm_area',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        }
    },
    {
        tableName: 'adm_bin',
        timestamps: true
    }
);

const ADM_Task = sequelize.define(
    'adm_task',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        driverId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'adm_user',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        vehicleId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'adm_vehicle',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        areaId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'adm_area',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        description: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.TEXT
        }
    },
    {
        tableName: 'adm_task',
        timestamps: true
    }
);

const LOG_Bin_State = sequelize.define(
    'log_bin_state',
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
        description: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.TEXT
        },
        binId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'adm_bin',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        }
    },
    {
        tableName: 'log_bin_state',
        timestamps: true
    }
);

const LOG_Vehicle_Work = sequelize.define(
    'log_vehicle_work',
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
        engineHours: {
            type: DataTypes.DOUBLE
        },
        fuel: {
            type: DataTypes.DOUBLE
        },
        description: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.TEXT
        },
        vehicleId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'adm_vehicle',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        driverId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'adm_user',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        binStateId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'log_bin_state',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        }
    },
    {
        tableName: 'log_vehicle_work',
        timestamps: true
    }
);

const SUP_Vehicle_State = sequelize.define(
    'sup_vehicle_state',
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
        state: {
            type: DataTypes.TEXT
        },
        description: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.TEXT
        },
        vehicleId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'adm_vehicle',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        driverId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'adm_user',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        }
    },
    {
        tableName: 'sup_vehicle_state',
        timestamps: true
    }
);

const SUP_Vehicle_Position = sequelize.define(
    'sup_vehicle_position',
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
        vehicleId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'adm_vehicle',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    },
    {
        tableName: 'sup_vehicle_position',
        timestamps: true
    }
);

const SUP_Vehicle_Trouble = sequelize.define(
    'sup_vehicle_trouble',
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
        fuel: {
            type: DataTypes.DOUBLE
        },
        trouble: {
            type: DataTypes.TEXT
        },
        description: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.TEXT
        },
        vehicleId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'adm_vehicle',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        driverId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'adm_user',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        }
    },
    {
        tableName: 'sup_vehicle_trouble',
        timestamps: true
    }
);

async function createDB() {
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
}

module.exports = {
    createDB,
    ADM_Vehicle,
    ADM_User,
    ADM_Area,
    ADM_Bin,
    ADM_Task,
    LOG_Bin_State,
    LOG_Vehicle_Work,
    SUP_Vehicle_State,
    SUP_Vehicle_Position,
    SUP_Vehicle_Trouble
};
