//config/config.js
const dtCfgMongo = {
  MONGO_IP: process.env.MONGO_IP || "mongodb-node",
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_USER: process.env.MONGO_USER || "root",
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || "super-password1",
}

export const mongoURL = `mongodb://${dtCfgMongo.MONGO_USER}:${dtCfgMongo.MONGO_PASSWORD}@${dtCfgMongo.MONGO_IP}:${dtCfgMongo.MONGO_PORT}/?authSource=admin`