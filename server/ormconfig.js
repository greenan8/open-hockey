const SnakeNamingStrategy = require("typeorm-naming-strategies")
  .SnakeNamingStrategy;

module.exports = [
  {
    name: "development",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "open-hockey",
    synchronize: true,
    logging: true,
    entities: ["../**/*.entity.{ts,js}"],
    migrations: ["src/migrations/**/*.ts"],
    subscribers: ["src/subscribers/**/*.ts"],
    cli: {
      entitiesDir: "src/entities",
      migrationsDir: "src/migrations",
      subscribersDir: "src/subscribers",
    },
  },
  {
    name: "production",
    type: "postgres",
    host: process.env.DB_URL,
    port: 25060,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: true,
    synchronize: true, // switch this to false once you have the initial tables created and use migrations instead
    logging: false,
    entities: ["dist/entities/**/*.js"],
    migrations: ["dist/migrations/**/*.js"],
    subscribers: ["dist/subscribers/**/*.js"],
    cli: {
      entitiesDir: "dist/entities",
      migrationsDir: "dist/migrations",
      subscribersDir: "dist/subscribers",
    },
  },
];
