import mongoose from "mongoose"
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();


const connectToDB = () => {
    mongoose.connect(process.env.DB_URI)
    .then((conn) => {
        console.log(`connected to DB : ${process.env.PORT}`)
    })
    .catch((err) => {
        console.log(err);
       process.getMaxListeners(1);
    })
};

export default connectToDB;