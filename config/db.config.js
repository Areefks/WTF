// Configuration of PostgreSQL

module.exports = {
  host: "127.0.0.1",
  database: "user",
  user: "postgres",
  password: "areef",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
