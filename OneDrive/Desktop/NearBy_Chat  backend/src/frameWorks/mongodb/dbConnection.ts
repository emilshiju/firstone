

import mongoose from 'mongoose';
import locationModel from './models/userLocation';
const dbURI = process.env.MONGODB_URI || 'mongodb+srv://nearbychat:zgDpibblgp9g5OqE@cluster0.lohk03z.mongodb.net/';

const connectToMongo = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('Connected to MongoDB');

    // await ensureIndexes()
    //  await Location.createIndexes();
    return locationModel.init();

  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

export default connectToMongo;




// // Example usage:
