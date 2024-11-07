import { server } from "..";
import { config } from "../config";
import { userRegistration } from "../services/user";
import OpenAI from "openai";
import { checkModel } from "../utils";

/**
 * @swagger
 * /registration:
 *   post:
 *     summary: Create new user
 *     tags: [PUBLIC]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                login:
 *                  type: string
 *                  description: Login of new user
 *                password:
 *                  type: string
 *                  description: Password of new user
 *              required:
 *                - login
 *                - password
 *     responses:
 *       200:
 *         description: User have been created!
 *       500:
 *         description: Server error
 */
server.post('/registration', async (req, res) => {
    const body = await userRegistration(req.body);
    res.status(200).send('User have been created!');
    return res;
});