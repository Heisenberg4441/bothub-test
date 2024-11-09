import OpenAI from "openai";
import { server, port } from "..";
import { config } from "../config";

server.listen(port, () => {
    console.log(`Server started, port: ${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
server.use('/', async (req, res) => {
    console.log(`Not found: endpoints with point ${req.originalUrl}, and method ${req.method}`);
    res.statusCode = 404;
    res.send('Not found!');
});


const openai = new OpenAI({
    apiKey: `${config.OPENAI_KEY}`,
    baseURL: 'https://bothub.chat/api/v2/openai/v1'
});
