import { port, server } from '..';
import { config } from '../config';
import { checkUserAuth } from '../utils';

server.use(".*", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', "auth,content-type,init-data");
});

server.options(".*", async (req, res) => {
    res.setHeader('Access-Control-Allow-Methods', "*");
    res.setHeader('Access-Control-Request-Headers', "auth,content-type");
    res.setHeader('Access-Control-Allow-Headers', "auth,content-type");
    res.sendStatus(200); // Отправляем ответ для завершения OPTIONS-запроса
});

server.use('/admin/', async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).send('authorization error: missing token');
    };

    const admin_token = req.headers.authorization.replace('Bearer ', '');
    if (admin_token !== config.ADMIN_TOKEN) {
        res.status(401).send('authorization error');
    } else {
        return next()
    };
});

server.use('/private/user/', async (req, res, next) => {
    console.log(req.headers)
    if (!req.headers.authorization) {
        res.status(401).send('authorization error: missing credentials');
        return;
    }

    const basic_encoded = req.headers.authorization.replace('Basic ', '');
    const buffer = Buffer.from(basic_encoded, 'base64');
    const [login, password] = buffer.toString().split(':');

    const result = await checkUserAuth(login, password);
    if (result) {
        return next()
    } else {
        res.status(401).send('authorization error');
    };
});
