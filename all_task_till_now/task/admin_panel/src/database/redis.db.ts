// import Redis from "ioredis";
// import { createClient } from "redis";
// import { redisConfig } from "../../envConfig";


// console.log(redisConfig.HOST,'/////////////',redisConfig.PORT);
// const client = new Redis({
//     host: redisConfig.HOST,
//     port: redisConfig.PORT,
//   }); 
// // const client = createClient();
// // client.on("error", (err) => console.log("Redis Client Error", err));
// // client.connect();

// export default client;

import { Redis, RedisOptions } from 'ioredis';
import { redisConfig } from "../../envConfig";

class RedisStorage {
    private client: Redis;

    constructor() {
        this.client = new Redis(this.getConfiguration());
    }

    /**
     * @description Fetch Configuration for Redis
     * @returns {RedisOptions}
     */
    private getConfiguration(): RedisOptions {
        const creds: RedisOptions = {
            host: redisConfig.HOST,
            port: redisConfig.PORT, // <number>config.get(Config.REDIS_PORT)
        };
        return creds;
    }

    /**
     * @description Set key in Redis
     * @param key
     * @param time
     * @param value
     * @returns
     */
    async setKey(key: string,time: number , value: string) {
        try {
            return await this.client.setex(key,time,value);
        } catch (error) {
            console.log('Redis storage set', error, false);
            throw error;
        }
    }

    /**
     * @description Get Value from Redis by key
     * @param key
     * @returns
     */
    async getKey(key: string) {
        try {
            return await this.client.get(key);
        } catch (error) {
            console.log('Redis storage insertKeyInRedis', error, false);
            throw error;
        }
    }

    /**
     * @description Delete key from Redis
     * @param key
     * @returns
     */
    async delKey(key: string) {
        try {
            return await this.client.del(key);
        } catch (error) {
            console.log('Redis storage insertKeyInRedis', error, false);
            throw error;
        }
    }

    /**
     * @description Delete key from Redis
     * @param key
     * @returns
     */
    async existKey(key: string) {
        try {
            return await this.client.exists(key);
        } catch (error) {
            console.log('Redis storage insertKeyInRedis', error, false);
            throw error;
        }
    }

    /**
     * @description Delete key from Redis
     * @param key
     * @returns
     */
    async keyExpiryTime(key: string) {
        try {
            return await this.client.ttl(key);
        } catch (error) {
            console.log('Redis storage insertKeyInRedis', error, false);
            throw error;
        }
    }
    
}

export const redis = new RedisStorage();