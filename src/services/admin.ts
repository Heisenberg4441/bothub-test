import { sql } from "../config";
import { User } from "../types";

export const createTable = async () => {
    const response = await sql`
        CREATE TABLE users (
	        Id SERIAL PRIMARY KEY,
            login CHARACTER VARYING(30),
            password CHARACTER VARYING(30),
            credits NUMERIC,
            role TEXT
    )`;
    return response;
}

export const editUserCredits = async (body: User) => {
    const id = body.id;
    const credits = body.credits;
    const user = await sql`
    SELECT * FROM users
    WHERE id=${id}`
    if(user[0].id){
        const response = await sql`
        UPDATE users
        SET credits=${credits}
        WHERE id=${id}`
        return `user credits edited! ${response}`
    } else {
        return false;
    }
}