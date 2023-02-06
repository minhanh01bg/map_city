const WebSocket = require('ws');
const bin_Send_Event_status_Auto = (id)=>{
    const socket = new WebSocket('ws://localhost:5000?id=bin_'+id);
    
    // Connection opened
    socket.addEventListener('open', function (event) {
        console.log('Connected to WS Server')
        const sendMessage = () => {
            //let mess = $('#mess').val();
            let mess={
                id:"bin_"+id,
                weight:30,
                status:'full',
                description:'bin full'
                //lat:123.213,
                //long:12313
            }
            socket.send(JSON.stringify(mess));
        }
        // setInterval(sendMessage,1000*10*60)
        sendMessage()
    });
    // const reader = new FileReader();
    // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
        $('.chat').append(JSON.parse(event.data));
    });
    
    // const sendMessage = () => {
    //     //let mess = $('#mess').val();
    //     let mess={
    //         id:"bin_"+id,
    //         weight:30,
    //         status:'full',
    //         description:'bin full'
    //         //lat:123.213,
    //         //long:12313
    //     }
    //     socket.send(JSON.stringify(mess));
    // }
    // // setInterval(sendMessage,1000*10*60)
    // sendMessage()
}

const vehicle_Send_Event_breakdown_Auto = (id) =>{
    const socket = new WebSocket('ws://localhost:5000?id=vehicle_'+id);
    
    // Connection opened
    socket.addEventListener('open', function (event) {
        console.log('Connected to WS Server')
        const sendMessage = () => {
            //let mess = $('#mess').val();
            let mess={
                id:"vehicle_break_"+id,
                altitude:123,
                speed:123,
                angle:90,
                fuel:102,
                trouble:'car puncture',
                description:'car puncture',
            }
            socket.send(JSON.stringify(mess));
        }
        // setInterval(sendMessage,1000*5*60)
        sendMessage()
    });
    // const reader = new FileReader();
    // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
        $('.chat').append(JSON.parse(event.data));
    });
    
    // const sendMessage = () => {
    //     //let mess = $('#mess').val();
    //     let mess={
    //         id:"vehicle_break_"+id,
    //         altitude:123,
    //         speed:123,
    //         angle:90,
    //         fuel:102,
    //         trouble:'car puncture',
    //         description:'car puncture',
    //     }
    //     socket.send(JSON.stringify(mess));
    // }
    // // setInterval(sendMessage,1000*5*60)
    // sendMessage()
}

const gps_Send__Auto = (id) =>{//id=5
    var dataTemporary = [
        [
            21.0233,
            105.8426
        ],
        [
            21.02368,
            105.84271
        ],
        [
            21.02376,
            105.84273
        ],
        [
            21.02376,
            105.84273
        ],
        [
            21.02389,
            105.84277
        ],
        [
            21.02461,
            105.84299
        ],
        [
            21.02532,
            105.84323
        ],
        [
            21.02544,
            105.84327
        ],
        [
            21.02555,
            105.84331
        ],
        [
            21.02648,
            105.8436
        ],
        [
            21.02678,
            105.84371
        ],
        [
            21.02692,
            105.84376
        ],
        [
            21.02692,
            105.84376
        ],
        [
            21.02689,
            105.84386
        ],
        [
            21.02678,
            105.84421
        ],
        [
            21.02659,
            105.8449
        ],
        [
            21.02659,
            105.8449
        ]
    ];
    dataTemporary = dataTemporary.filter((item, index) => dataTemporary.indexOf(item) === index);
    // const base_url = 'ws://map-ws-exp.cleverapps.io?id=gps_' +id
    const base_url = 'ws://localhost:5000?id=gps_' +id
    
    // const base_url = 'ws://192.168.1.86:3000/2'
    // const base_url = 'ws://172.20.10.3:3000/2'

    const ws = new WebSocket(base_url)

    let connection_resolvers = [];
    let checkConnection = () => {
    return new Promise((resolve, reject) => {
        if (ws.readyState === WebSocket.OPEN) {
        resolve();
        }
        else {
        connection_resolvers.push({ resolve, reject });
        }
    });
    }


    function updateService(dataTemporary) {
    for (let i = 0; i < dataTemporary.length; i++) {
        setTimeout(function () {
        const gps = {
            id: "gps_"+id,
            lat: dataTemporary[i][0],
            long: dataTemporary[i][1]
        }
        ws.send(JSON.stringify(gps));
        }, 1000 * i);
    }
    }

    ws.addEventListener('open', () => {
        connection_resolvers.forEach(r => r.resolve())
        const sendMessage = () => {
            checkConnection().then(() => {
                updateService(dataTemporary);
            });
        }
        sendMessage()
    });
    // setInterval(sendMessage,1000*5*60)
    
}
const delay = require('delay')
const Automatic = async ()=>{
    await delay(5000)
    bin_Send_Event_status_Auto(1)
    vehicle_Send_Event_breakdown_Auto(1)
    gps_Send__Auto(5)
}
module.exports = {Automatic,bin_Send_Event_status_Auto,vehicle_Send_Event_breakdown_Auto,gps_Send__Auto}