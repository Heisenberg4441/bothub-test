import postgres = require("postgres");

export const config = {
    DB_USERNAME: 'postgres',
    DB_PASSWORD: '2808',
    DB_IP: 'localhost',
    DB_PORT: '5432',
    DB_NAME: 'bothub',

    OPENAI_KEY: 'OPENAI_KEY',

    ADMIN_TOKEN: 'e5003628acc2d2dda540fafa3f131ca8'
}

export const sql = postgres(`postgres://${config.DB_USERNAME}:${config.DB_PASSWORD}@${config.DB_IP}:${config.DB_PORT}/${config.DB_NAME}`);
