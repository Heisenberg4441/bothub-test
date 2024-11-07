import { sql } from "../config";

export const getUserBalance = async (id: string) => {
    const basic_encoded = id.replace('Basic ', '');
    const buffer = Buffer.from(basic_encoded, 'base64');
    const [login, password] = buffer.toString().split(':');
    const check_result = await sql`
    SELECT * FROM users WHERE login=${login} AND password=${password}
    `
    return check_result[0].credits;
}