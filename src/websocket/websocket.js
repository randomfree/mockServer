const net = require('net');


let clientArr = [];

const server = net.createServer();

server.on('connection', (person) => {
    console.log(clientArr.length);
    console.log(person);
    person.id = clientArr.length;
    clientArr.push(person);
    person.setEncoding('utf8');
    person.on('data', (chunk) => {
        console.log(chunk);
        clientArr.forEach((val) => {
            val.write(chunk);
        });
    });
    person.on('error', (p1) => {
        clientArr[p1.id] = null;
    });
    person.on('close', (p1) => {
        clientArr[p1.id] = null;
    });
});



module.exports={
    start:function(){
        server.listen(800);
    }
}
