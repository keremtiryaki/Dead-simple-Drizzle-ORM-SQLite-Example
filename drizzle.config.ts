import type { Config } from "drizzle-kit";

export default {
    schema: "./src/db/schema/*",
    out: "./dkit-migrations-folder",
    driver: 'better-sqlite',
    dbCredentials: {
        url: 'todos.db'
    }
    // driver: 'libsql',
    // dbCredentials: {
    //     url: 'http://localhost:8080'
    // }
} satisfies Config;

