import mongoose from "mongoose";

mongoose.set('strictQuery', true);

const URL = process.env.MONGOURL;

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connect = mongoose.connect(URL,dbOptions ,(error)=>{
    if (error) {
        console.error("Failed To Connect Database...");
        console.log(error);
    }else{
        console.info("Database Connected Successfully!");
    }
});

export {connect}
