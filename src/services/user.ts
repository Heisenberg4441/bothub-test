import { sql } from "../config";
import { User } from "../types";

export const userRegistration = async (body: User) => {
    const login = body.login;
    const password = body.password;
    const credits = body.credits;
    const role = "USER"
    const response = await sql`
    INSERT INTO users (
        login,
        password,
        credits,
        role
    ) VALUES (
        ${login},
        ${password},
        ${credits !== undefined ? credits : 0},
        ${role}
    )`;

    return response;
}