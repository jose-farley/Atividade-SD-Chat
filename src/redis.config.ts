import Redis from 'ioredis'

const RedisClient = new Redis({
    host: process.env.DATABASE,
    port:6379
})

export {RedisClient}