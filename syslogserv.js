const net = require('net');
const syslogParser = require('glossy').Parse;
const port = process.env.PORT || 514;
const server = net.createServer();
server.maxConnections = 10;

server.on('connection', function (socket) {
    socket.setEncoding('utf8');
    socket.on('data', function (data) {
        console.log("syslog:", syslogParser.parse(data));
        console.log('------------------------------------------------------------')
    });

    socket.on('drain', function () {
        console.log('write buffer is empty now .. u can resume the writable stream');
        socket.resume();
    });

    socket.on('error', function (error) {
        console.log('Error : ' + error);
    });

    socket.on('timeout', function () {
        console.log('Socket timed out !');
        socket.end('Timed out!');
    });

    socket.on('end', function (data) {
        console.log('Socket ended from other end!');
        console.log('End data : ' + data);
    });

    socket.on('close', function (error) {
        console.log('Socket closed!');
        if (error) {
            console.log('Socket was closed coz of transmission error');
        }
    });
});

server.on('close', function () {
    console.log('Server closed !');
});

server.on('error', (error) => {
    console.log('Error: ' + error);
});

server.listen(port, () => {
    console.log(`Syslog server is listening on port ${port}...`);
});