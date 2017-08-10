import * as restify from 'restify';
import * as bunyan from 'bunyan';


const logServer = bunyan.createLogger({
    name: 'serverLog',
    streams: [
        {
            level: 'debug',
            stream: process.stdout
        },
        {
            level: 'debug',
            path: './logs/server.log',
            type: 'rotating-file',
            period: '1d',   // daily rotation
            count: 10       // keep this number of back copies
        }
    ]
});

export const server = restify.createServer({
    name: 'Restify server',
    log: logServer,
    version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

/**
 * Request handling before routing.
 * Note that req.params will be undefined, as that's filled in after routing.
 */
server.pre(function (req, res, next) {
    const log = req.log;
    log.info(`${req.method.toUpperCase()} ${req.url}`);
    //log.debug({ headers: req.headers }, 'req.Headers:');
    next();
});

/**
 * Utility endpoint.
 */
server.get('/health', function (req, res, next) {
    res.json(200, { 'health': 'ok' });
    return next();
});

/**
 * Mapping static resources.
 */
server.get('/', restify.serveStatic({
    directory: './public',
    file: 'index.html'
}));
server.get(/\/public\/?.*/, restify.serveStatic({
    //directory: __dirname, // it's a /build directory.
    directory: __dirname + '/../', 
    default: 'index.html'
}));

/**
 * Mocking data API.
 */
const dataDir = './data';

server.get('/api/properties', restify.serveStatic({
    directory: dataDir,
    file: 'sampleData.json'    
}));

/*
server.get('/endpoint', function (req, res, next) {
    const log = req.log;
    log.debug({ params: req.params }, 'request params:');

    let json = {result: 'ok'};
    res.json(200, json);
});
*/

/**
 * Starting server
 */
const cfgPort = 8000; //config.get('port') || 8000;
server.listen(cfgPort, function () {
    logServer.info('%s listening at localhost:%s', server.name, cfgPort);
    logServer.info('Open UI in browser at http://localhost:8000');
});
