import mongoose from 'mongoose';
import config from './config';
import User from './models/User';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
  } catch (error) {
    console.log('Skipping drop...');
  }

  const user = new User({
    email: 'anton@local.com',
    password: 'antonpass',
    role: 'user',
    displayName: 'Anton Panamarenko',
    avatar: 'fixtures/avatar.jpeg',
  });

  user.generateToken();
  await user.save();

  const admin = new User({
    email: 'den@local.com',
    password: 'denpass',
    role: 'admin',
    displayName: 'Den Administrator',
    avatar: 'fixtures/admin.png',
  });

  admin.generateToken();
  await admin.save();

  await db.close();
};

run().catch(console.error);