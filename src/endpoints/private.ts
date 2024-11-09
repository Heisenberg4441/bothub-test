import { server } from "..";
import { chatEmitter, main, requestToModel } from "../ai";
import * as http from 'http';
import { checkCost, checkTokensInMessage, getUserGeneratingData, sumTokens } from "../utils";
import { getUserBalance } from "../services/private";

/**
 * @swagger
 * /private/user/newPrompt:
 *   get:
 *     summary: Make request to AI
 *     tags: [PRIVATE]
 *     security:
 *       - BasicAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                prompt:
 *                  type: string
 *                  description: Prompt to AI
 *                model:
 *                  type: string
 *                  description: Model from Bothub models list
 *              required:
 *                - prompt
 *                - model
 *     responses:
 *       200:
 *         description: Ok!
 *       500:
 *         description: Server error
 */
server.get('/private/user/newPrompt', async (req, res) => {
    const text = req.body.prompt;
    const model = req.body.model;

    const user = Buffer.from(req.headers.authorization.replace('Basic ', ''), 'base64');
    const [login, password] = user.toString().split(':');
    const genData = await getUserGeneratingData(login, password);

    const tokensInMessage = await checkTokensInMessage((await requestToModel(text)).fullMessage);
    let tokensAfterMessage = 0;

    if (!genData) return;

    const priceOfModel = await checkCost(tokensInMessage, genData.id, genData.credits, model);

    if (priceOfModel === false) {
        res.send('Not enough tokens!');
        return;
    };
    if (!priceOfModel.input || !priceOfModel.output) {
        res.status(500).send("do not find model's price");
    };

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const onData = (value: string) => {
        tokensAfterMessage += 1
        res.write(`data: ${value}\n\n`);
    };

    chatEmitter.on('data', onData);

    await main(text, model);
    await sumTokens(tokensInMessage * priceOfModel.input, tokensAfterMessage * priceOfModel.output, genData.id);
    chatEmitter.off('data', onData);
    req.on('close', () => {
        chatEmitter.off('data', onData);
        res.end();
        res.send('Chat closed');
        return;
    });
});

/**
 * @swagger
 * /private/user/getBalance:
 *   get:
 *     summary: Get user balance
 *     tags: [PRIVATE]
 *     security:
 *       - BasicAuth: []
 *     responses:
 *       200:
 *         description: User balance retrieved successfully
 *       401:
 *         description: Authorization error
 */
server.get('/private/user/getBalance', async (req, res) => {
    const body = await getUserBalance(req.headers.authorization);
    res.status(200).send(JSON.stringify(body));
});