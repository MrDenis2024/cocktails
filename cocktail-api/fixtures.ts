import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Cocktail from './models/Cocktail';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('cocktails');
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

  await Cocktail.create({
    user: user._id,
    name: 'Long Island Iced Tea',
    image: 'fixtures/longIsland.jpg',
    recipe: 'Mix all contents in a highball glass and sitr gently. Add dash of Coca-Cola for the coloring and garnish with lemon or lime twist.',
    isPublished: true,
    ingredients: [
      {ingredientName: 'White rum', amount: '15 ml'},
      {ingredientName: 'Tequila', amount: '15 ml'},
      {ingredientName: 'Vodka', amount: '15 ml'},
      {ingredientName: 'Triple sec', amount: '15 ml'},
      {ingredientName: 'Gin', amount: '15 ml'},
      {ingredientName: 'Sour mix', amount: '30 ml'},
      {ingredientName: 'Cola', amount: '50 ml'},
      {ingredientName: 'Lime', amount: '2 slices'},
    ],
  }, {
    user: user._id,
    name: 'Gin Tonik',
    image: 'fixtures/ginTonik.jpg',
    recipe: 'Fill a highball glass with ice, pour the gin, top with tonic water and squeeze a lemon wedge and garnish with a lemon wedge.',
    isPublished: false,
    ingredients: [
      {ingredientName: 'Gin', amount: '50 ml'},
      {ingredientName: 'Tonic Water', amount: '150 ml'},
      {ingredientName: 'Lime', amount: '1 slice'},
      {ingredientName: 'Ice', amount: '180 gm'},
    ],
  }, {
    user: admin._id,
    name: 'Margarita',
    image: 'fixtures/margarita.jpg',
    recipe: 'Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.',
    isPublished: true,
    ingredients: [
      {ingredientName: 'Tequila', amount: '50 ml'},
      {ingredientName: 'Triple sec', amount: '25 ml'},
      {ingredientName: 'Lime juice', amount: '30 ml'},
      {ingredientName: 'Salt', amount: '2 gm'},
    ],
  }, {
    user: admin._id,
    name: 'Pina Colada',
    image: 'fixtures/pinaColada.jpg',
    recipe: 'Mix with crushed ice in blender until smooth. Pour into chilled glass, garnish and serve.',
    isPublished: false,
    ingredients: [
      {ingredientName: 'Light rum', amount: '60 ml'},
      {ingredientName: 'Coconut milk', amount: '40 ml'},
      {ingredientName: 'Pineapple', amount: '30 ml'},
      {ingredientName: 'Salt', amount: '1 kilo'},
    ],
  })

  await db.close();
};

run().catch(console.error);