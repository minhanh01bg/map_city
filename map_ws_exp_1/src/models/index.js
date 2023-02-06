const { DataTypes, Sequelize } = require('sequelize');

const createUser = require('./User');
const createBin = require('./Bin');
const createBinStateLog = require('./BinStateLog');
const createPath = require('./Path');
const createTask = require('./Task');
const createVehicle = require('./Vehicle');
const createVehicleStateLog = require('./VehicleStateLog');

const sequelize = new Sequelize('map_ws_dev', 'root', 'S1mple00@', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = createUser(sequelize, DataTypes);
const Bin = createBin(sequelize, DataTypes);
const BinStateLog = createBinStateLog(sequelize, DataTypes);
const Path = createPath(sequelize, DataTypes);
const Task = createTask(sequelize, DataTypes);
const Vehicle = createVehicle(sequelize, DataTypes);
const VehicleStateLog = createVehicleStateLog(sequelize, DataTypes);

const createDB = async () => {
    Bin.hasMany(BinStateLog, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
    BinStateLog.belongsTo(Bin);

    Path.hasMany(Bin);
    Bin.belongsTo(Path);

    User.hasMany(Task, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
    Task.belongsTo(User);

    Vehicle.hasMany(Task, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
    Task.belongsTo(Vehicle);

    Path.hasOne(Task, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
    Task.belongsTo(Path);

    Vehicle.hasMany(VehicleStateLog, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
    VehicleStateLog.belongsTo(Vehicle);

    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
};

module.exports = {
    createDB,
    User,
    Bin,
    BinStateLog,
    Path,
    Task,
    Vehicle,
    VehicleStateLog
};
