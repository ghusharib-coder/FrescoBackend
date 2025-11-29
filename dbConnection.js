import mongoose from "mongoose"
const dbConnection = async() =>{
     try{
        await mongoose.connect('mongodb://127.0.0.1:27017/myapp');
        console.log('DB Connected');
    }
    catch(err){
        console.log("error",err);
    }
}
export default dbConnection;
