'use strict';

const { networkInterfaces } = require('os');


import  publicIp  from  'public-ip';


async function publicIpFn(){
console.log('ip v4' ,await publicIp.v4());
//=> '46.5.21.123'

console.log('ip v6' ,await publicIp.v6());
//=> 'fe80::200:f8ff:fe21:67cf'
}
const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}

function getLocalIp() {
    const os = require('os');

    for(let addresses of Object.values(os.networkInterfaces())) {
        for(let add of addresses) {
            if(add.address.startsWith('192.168.')) {
                return add.address;
            }
        }
    }
}


console.log('results', results)
console.log('locale ip', getLocalIp())
publicIpFn()