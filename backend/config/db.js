import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log('Reusing the existing operational MongoDB connection instance.');
    return;
  }

  if (mongoose.connection.readyState === 2) {
    console.log('A database connection is already in the middle of establishing...');
    return;
  }

  try {
    console.log('No active connection found. Initializing fresh connection pipeline...');
    console.log(`Connecting to: ${process.env.MONGO_URI}`);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;