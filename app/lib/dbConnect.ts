import mongoose from "mongoose";

const connection:{isConnected?:number} = {};

async function dbConnect() {
    if(connection.isConnected) return;

    const db = await mongoose.connect(process.env.MONGO_URI!);
    connection.isConnected = db.connections[0].readyState;
    console.log(`Connected to MongoDB: ${db.connections[0].host}`);
}

export default dbConnect;