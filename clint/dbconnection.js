import mongoose from "mongoose"


//**********************************DataBase Connect logic*********************************/
export const dbConnection = async () => {
    await mongoose.connect(process.env.MONGO_URI).then((data) => {
        console.log(`database Connected`);         
    })
}