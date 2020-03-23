import dotenv from 'dotenv';

dotenv.config();

import { createConnection } from 'typeorm'; // eslint-disable-line import/first
import server from './server'; // eslint-disable-line import/first

const {
    DB_DRIVER,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    APP_PORT,
    DB_CHARSET
} = process.env;

createConnection({
    type: DB_DRIVER,
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    charset: DB_CHARSET,
    // dropSchema: true,
    synchronize: true,
    logging: true,
    entities: [`${__dirname}/entity/**`]
}).then(() => {
    server.listen(APP_PORT, () =>
        console.info(`App is running on port ${APP_PORT}`)
    );
});
