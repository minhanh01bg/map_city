const url = require('url');
const {
    ADM_Bin,
    ADM_Vehicle,
    LOG_Vehicle_Work,
    LOG_Bin_State,
    SUP_Vehicle_Position,
    SUP_Vehicle_State,
    SUP_Vehicle_Trouble,
    ADM_Task,
    ADM_Area
} = require('../../models/ver1/models');

const addEvent_Vehicle_work = async (data) => {
    try {
        const vehicle = await ADM_Vehicle.findOne({
            where: { vehicleID: data.vehicleID },
            raw: true
        });
        const vehicle_position = await SUP_Vehicle_Position.findOne({
            where: { vehicleId: data.vehicleID },
            raw: true
        });
        const bin_state = await LOG_Bin_State.findOne({
            where: { id: data.binStateID },
            raw: true
        });
        const log = await LOG_Vehicle_Work.create({
            latitude: vehicle_position.latitude,
            longitude: vehicle_position.longitude,
            altitude: data.altitude,
            speed: data.speed,
            angle: data.angle,
            odometer: data.odometer,
            engineHours: data.engineHours,
            fuel: data.fuel,
            description: 'vehicle work',
            status: vehicle.status,
            vehicleId: data.vechicleID,
            driverId: data.driverID,
            binStateId: bin_state.id
        });
        return log;
    } catch (err) {
        console.log(err);
    }
};

// add event to log_bin_State
const addEvent_Bin_state = async (data) => {
    try {
        await ADM_Bin.update(
            { status: data.status },
            { where: { id: data.binID }, raw: true }
        );
        const bin = await ADM_Bin.findOne({
            where: { id: data.binID },
            raw: true
        });
        const log = new LOG_Bin_State(
            {
                latitude: bin.latitude,
                longitude: bin.longitude,
                weight: data.weight,
                description: data.description,
                status: data.status,
                binId: data.binID
            },
            { raw: true }
        );
        await log.save();
        return {latitude:log.dataValues.latitude,longitude:log.dataValues.longitude,updatedAt:log.dataValues.updatedAt};
    } catch (err) {
        console.log(err);
    }
};

const check_Vehicle_area_bin = async (data) => {
    const bin = await ADM_Bin.findOne({where:{id:data.binID},raw:true})
    const area = await ADM_Area.findOne({where:{id:bin.areaId},raw:true})
    const task = await ADM_Task.findOne({where:{areaId:area.id,status:'on'},raw:true})
    return {vehicleID:task.vehicleId}
}


const updatePosition = async (data) => {
    try {
        const log = await SUP_Vehicle_Position.update(
            {
                latitude: data.latitude,
                longitude: data.longitude
            },
            {
                where: { vehicleId: data.vechicleID },
                raw: true
            }
        );
        return log;
    } catch (err) {
        console.log(err);
    }
};

const addEvent_Vehicle_state = async (data) => {
    try {
        const vehicle_position = await SUP_Vehicle_Position.findOne({
            where: { vehicleId: data.vehicleID },
            raw: true
        });
        const taskOfDriver = await ADM_Task.findOne({where: {vehicleId: data.vehicleID},raw: true});
        const log = new SUP_Vehicle_State({
            latitude: vehicle_position.latitude,
            longitude: vehicle_position.longitude,
            altitude: data.altitude,
            speed: data.speed,
            angle: data.angle,
            state: data.state,
            description: data.description,
            status: data.status,
            vehicleId: data.vehicleID,
            driverId: taskOfDriver.driverId
        });
        await log.save();
        return {updatedAt:log.dataValues.updatedAt,latitude:vehicle_position.latitude,longitude:vehicle_position.longitude};
    } catch (err) {
        console.log(err);
    }
};

const addEvent_Vehicle_trouble = async (data) => {
    try {
        await ADM_Vehicle.update(
            {
                // work, available, trouble
                status: data.status
            },
            { where: { id: data.vehicleID }, raw: true }
        );
        const vehicle_position = await SUP_Vehicle_Position.findOne({
            where: { vehicleId: data.vehicleID },raw: true
        });
        const taskOfDriver = await ADM_Task.findOne({where: {vehicleId: data.vehicleID},raw: true});
        const log = new SUP_Vehicle_Trouble({
            latitude: vehicle_position.latitude,
            longitude: vehicle_position.longitude,
            altitude: data.altitude,
            speed: data.speed,
            angle: data.angle,
            fuel: data.fuel,
            trouble: data.trouble,
            description: data.description,
            status: data.status,
            vehicleId: data.vehicleID,
            driverId: taskOfDriver.driverId
        });
        await log.save();
        // return log
        return {lat:vehicle_position.latitude,long:vehicle_position.longitude,updateAt:log.dataValues.updatedAt};
    } catch (err) {
        console.log(err);
    }
};


module.exports = {
    addEvent_Vehicle_trouble,
    updatePosition,
    addEvent_Bin_state,
    addEvent_Vehicle_work,
    addEvent_Vehicle_state,
    check_Vehicle_area_bin
};
