/* DATABASE_ADDR: `mongodb://sia_db_1:27017/` */

/*  `mongodb://localhost:27017/local` */
export default {
    SERVER_PORT: process.env.SERVER_PORT || 3000,
    DATABASE_PORT: process.env.MONGO_PORT || 27017,
    DATABASE_ADDR: process.env.MONGO_URL || `mongodb://localhost:27017/servidor-parasitour`,
    JWT_SECRET: "0b38f97d2429fb5c4396e812541f504c"
}