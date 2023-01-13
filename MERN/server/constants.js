const DB_USER = "luisdiaz";
const DB_PASSWORD = "luisdiaz";
const DB_HOST = "cluster0.pwwikk4.mongodb.net";

const JWT_SECRET_KEY = 'oiuer4568dfgkjw589fjgkw4985jkfg';

const API_VERSION = "v1";
const IP_SERVER = "127.0.0.1";
// const DB_CONNECT = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority`
const DB_CONNECT = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`
// const DB_CONNECT = `mongodb://${IP_SERVER}:27017/test`;
// console.log(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority`);
 
module.exports = {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    API_VERSION,
    IP_SERVER,
    DB_CONNECT,
    JWT_SECRET_KEY
}
