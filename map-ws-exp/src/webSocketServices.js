// const { default: axios } = require('axios');
const url = require('url');
// const { Vehicle, VehicleStateLog } = require('./models/ver1/models');
// const { Bin, BinStateLog } = require('./models/ver1/models');
const {
    addEvent_Vehicle_trouble,
    updatePosition,
    addEvent_Bin_state,
    addEvent_Vehicle_work,
    addEvent_Vehicle_state,
    check_Vehicle_area_bin
} = require('./controllers/ver1/wss');

const webSocketServices = (wss) => {
    let vehicles = {};
    let gpss = {};
    let admins = {};
    let routing = {};
    wss.on('connection', function connection(ws, req) {
        console.log('A new client connected');
        // var userID = parseInt(req.url.substr(1), 10)
        // console.log(userID)
        try {
            const parameters = url.parse(req.url, true);
            let id = parameters.query.id;
            console.log(id);
            if (id[0] == 'v') {
                id = id.substr(id.length - 1);
                // let arr = id.split("_");
                vehicles[id] = ws;
            }
            if (id[0] == 'g') {
                id = id.substr(id.length - 1);
                gpss[id] = ws;
            }
            if (id[0] == 'a') {
                id = id.substr(id.length - 1);
                admins[id] = ws;
            }
            if (id[0] == 'r') {
                id = id.substr(id.length - 1);
                routing[id] = ws;
            }
        } catch (err) {
            console.log(err);
        }
        ws.on('message', async function (message) {
            console.log(message);
            var messageArray = JSON.parse(message);
            // gps send location
            try {
                let gps = messageArray['id'].substr(
                    0,
                    messageArray['id'].length - 2
                );

                if (gps == 'gps') {
                    let gpsID = messageArray['id'].substr(4);
                    console.log('gps connection ' + gpsID);
                    let vehicle = vehicles[gpsID];
                    const update = [
                        gpsID,
                        messageArray['lat'],
                        messageArray['long']
                    ];
                    // await Vehicle.update(
                    //     {
                    //         latitude: messageArray['lat'],
                    //         longitude: messageArray['long']
                    //     },
                    //     {
                    //         where: {
                    //             id: gpsID
                    //         },
                    //         raw: true
                    //     }
                    // );
                    
                    updatePosition({
                        latitude: messageArray['lat'],
                        longitude: messageArray['long'],
                        vechicleID: gpsID
                    }).then(() => {
                        if (vehicle) {
                            console.log('sending to vehicle ' + gpsID);
                            vehicle.send(JSON.stringify(update));
                        }
                        for (const [key, value] of Object.entries(admins)) {
                            console.log('sending to admin');
                            value.send(JSON.stringify(update));
                        }
                    })
                    
                }
            } catch (err) {
                console.log(err);
            }
            // event vehicle breakdown
            try {
                let vehicle_break = messageArray['id'].substr(
                    0,
                    messageArray['id'].length - 2
                );
                // console.log(vehicle_break);

                if (vehicle_break == 'vehicle_break') {
                    let vehicleID = messageArray['id'].substr(
                        messageArray['id'].length - 1
                    );
                    console.log('vehicle breakdown connection ' + vehicleID);

                    addEvent_Vehicle_trouble({
                        altitude: messageArray['altitude'],
                        speed: messageArray['speed'],
                        angle: messageArray['angle'],
                        fuel: messageArray['fuel'],
                        trouble: messageArray['trouble'],
                        description: messageArray['description'],
                        status: 'breakdown',
                        vehicleID: vehicleID
                    }).then((res) => {
                        // console.log(res);
                        let ob_= {
                            latitude: res.lat,
                            longitude: res.long,
                            updatedAt: res.updateAt,
                            id: vehicleID
                        }
                        // console.log(ob_);
                        const update = ['alert', ob_,'car breakdown'];
                        for (const [key, value] of Object.entries(admins)) {
                            console.log('sending to admin');
                            value.send(JSON.stringify(update));
                        }
                    });
                    
                    // console.log(eventV);
                    // update vehicleStatelog
                }
            } catch (err) {
                console.log(err);
            }
            // event bin status
            try {
                let bin = messageArray['id'].substr(
                    0,
                    messageArray['id'].length - 2
                );
                let arr = messageArray['id'].split("_");
                console.log(arr[0]);
                console.log(arr[1]);
                if (arr[0] == 'bin') {
                    let binID = arr[1];
                    console.log('bin connection ' + binID);
                    // let bin_full = await Bin.findOne({
                    //     where: {
                    //         id: binID
                    //     },
                    //     raw: true
                    // });
                    // console.log(bin_full);
                    // await BinStateLog.create(
                    //     {
                    //         latitude: bin_full.latitude,
                    //         longitude: bin_full.longitude,
                    //         weight: bin_full.weight,
                    //         description: 'bin full',
                    //         status: 'full',
                    //         binId: bin_full.id,
                    //         weight: messageArray['weight']
                    //     },
                    //     { raw: true }
                    // );
                    // await Bin.update(
                    //     {
                    //         status: 'full',
                    //         weight: messageArray['weight']
                    //     },
                    //     { where: { id: bin_full.id } },
                    //     { raw: true }
                    // );
                    addEvent_Bin_state({
                        weight: messageArray['weight'],
                        status: messageArray['status'],
                        binID:binID,
                        description: messageArray['description']
                    }).then((res) => {
                        const update = ['alert', {
                            latitude:res.latitude,
                            longitude:res.longitude,
                            weight:messageArray['weight'],
                            updatedAt:res.updatedAt,
                            id:binID,
                            status:messageArray['status']
                        }, messageArray['description'],'bin'];
                        for (const [key, value] of Object.entries(admins)) {
                            console.log('sending to admin');
                            value.send(JSON.stringify(update));
                        }
                        check_Vehicle_area_bin({binID:binID}).then((res) =>{
                            // console.log(res.vehicleID)
                            let vehicle = vehicles[res.vehicleID]
                            if(vehicle){
                                console.log('sending to vehicle ' + res.vehicleID);
                                vehicle.send(JSON.stringify(update));
                            }
                        })
                    })
                    
                }
            } catch (err) {
                console.log(err);
            }
            // try {
            //     let bin_weight = messageArray['id'].substr(
            //         0,
            //         messageArray['id'].length - 2
            //     );

            //     if (bin_weight == 'bin_weight') {
            //         let binID = messageArray['id'].substr(
            //             messageArray['id'].length - 1
            //         );
            //         console.log('bin weight connection ' + binID);
            //         await Bin.update(
            //             {
            //                 weight: messageArray['weight']
            //             },
            //             { where: { id: binID }, raw: true }
            //         );
            //     }
            // } catch (err) {
            //     console.log(err);
            // }
            // request get routing machine
            try {
                let request = messageArray['id'].substr(
                    0,
                    messageArray['id'].length - 2
                );
                if (request == 'request') {
                    // let routeID = messageArray['id'].substr(
                    //     messageArray['id'].length - 1
                    // );
                    console.log('request ');
                    const update = [
                        messageArray['id'],
                        messageArray['bin'],
                        messageArray['vehicle']
                    ];

                    for (const [key, value] of Object.entries(routing)) {
                        console.log('sending to routing_machine');
                        value.send(JSON.stringify(update));
                    }
                }
            } catch (err) {
                console.log(err);
            }
            // status vehicle
            try {
                let vehicle_status = messageArray['id'].substr(
                    0,
                    messageArray['id'].length - 2
                );
                if(vehicle_status == 'vehicle_status'){
                    let vehicleID = messageArray['id'].substr(messageArray['id'].length - 1)
                    console.log('vehicle status connection' + vehicleID)

                    addEvent_Vehicle_state({
                        altitude:messageArray['altitude'],
                        speed:messageArray['speed'],
                        angle:messageArray['angle'],
                        state:messageArray['state'],
                        description:messageArray['description'],
                        status:messageArray['status'],
                        vehicleID:vehicleID
                    }).then((res)=>{
                        const update = ['alert', {
                            latitude:res.latitude,
                            longitude:res.longitude,
                            status:messageArray['status'],
                            updatedAt:res.updatedAt,
                            id:vehicleID
                        }, 'Vehicle replace status','vehicle'];
                        for (const [key, value] of Object.entries(admins)) {
                            console.log('sending to admin');
                            value.send(JSON.stringify(update));
                        }
                        let vehicle = vehicles[vehicleID]
                        if (vehicle) {
                            console.log('sending to vehicle');
                            vehicle.send(JSON.stringify(update));
                        }
                    })
                }
            } catch(err){
                console.log(err);
            }
        });
        ws.on('close', function () {
            ws.close();
            // console.log('deleted: ' + id);
        });
    });
};

module.exports = webSocketServices;
