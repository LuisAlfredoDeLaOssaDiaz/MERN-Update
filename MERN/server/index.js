const mongoose = require("mongoose")
const app = require("./app.js")
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    API_VERSION,
    IP_SERVER,
    DB_CONNECT
} = require("./constants");

const PORT = process.env.POST || 3977;

mongoose.set('strictQuery', false);

mongoose.connect(DB_CONNECT,(err) => {
    if(err) {
        throw err;
    } else {
        app.listen(PORT, () => {
            console.log("####################");
            console.log("##### API REST #####");
            console.log("####################");
            console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}/`);
        })
    }
})
