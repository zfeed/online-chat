declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_DRIVER: 'mysql' | 'mariadb';
            DB_USERNAME: string;
            DB_PASSWORD: string;
            DB_HOST: string;
            DB_PORT: string;
            DB_NAME: string;
            APP_PORT: string;
            DB_CHARSET: string;
        }
    }
}

declare module 'koa-session' {
    interface Session {
        user: { id: number; username: string };
    }
}

export {};
