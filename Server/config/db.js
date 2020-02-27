
import { connect } from 'mongoose';
import { get } from 'config';

const db = get('mongoURI');

const connectDB = async () => {
  try {
    await connect(
      db,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;