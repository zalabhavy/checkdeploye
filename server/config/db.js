import mongoose from "mongoose";

const connectToMongo = async  () =>
    {
           const res = await mongoose.connect("mongodb+srv://zalabhavy2004:SpPPJLu2f2H8GUB1@blogwebsite.kyg24ji.mongodb.net/");
           if(res)
            {
                console.log("Connected successfully");
            }
    };
export default connectToMongo;

