import { server } from "..";
import { createTable, editUserCredits } from "../services/admin";

/**
 * @swagger
 * /admin/create/user-table:
 *   post:
 *     summary: Create new table
 *     tags: [ADMIN]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Table have been created
 *       401:
 *         description: Authorization error
 */
server.post('/admin/create/user-table', async (req, res) => {
    const body = await createTable();
    res.send(body);
    return res;
});

/**
 * @swagger
 * /admin/edit/user-credits:
 *   post:
 *     summary: Edit user credits
 *     tags: [ADMIN]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                  description: id of user
 *                credits:
 *                  type: number
 *                  description: Desired number of user credits
 *              required:
 *                - id
 *                - credits
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User credits have been changed
 *       401:
 *         description: Authorization error
 */
server.post('/admin/edit/user-credits', async (req, res) => {
    const editUserValue = req.body;
    const body = await editUserCredits(editUserValue);
    if(body) {
        res.statusCode = 200;
        res.send('Ok!');
    } else {
        res.statusCode = 404;
        res.send('User not found');
    };
    return res;
});