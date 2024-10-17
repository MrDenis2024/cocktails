import mongoose, {Types} from 'mongoose';
import User from './User';

const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  ingredientName: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
});

const CocktailSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist',
    },
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  recipe: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
  ingredients: [IngredientSchema],
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

export default Cocktail;