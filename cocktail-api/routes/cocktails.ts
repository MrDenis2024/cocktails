import express from 'express';
import Cocktail from '../models/Cocktail';
import mongoose from 'mongoose';
import auth, {RequestWithUser} from '../middleware/auth';
import {imagesUpload} from '../multer';
import parseIngredients from '../helpers/parseIngredients';
import permit from '../middleware/permit';

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', async (req, res, next) => {
  try {
    const userId = req.query.user;
    const cocktails = await Cocktail.find(userId ? ({user: userId}) : ({}));

    return res.send(cocktails);
  } catch (error) {
   return next(error);
  }
});

cocktailsRouter.get('/:id', async (req, res, next) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);

    if (cocktail === null) {
      return res.status(404).send({error: 'Cocktail not found'});
    }

    return res.send(cocktail);
  } catch (error) {
    return next(error);
  }
})

cocktailsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    const ingredients = parseIngredients(req.body.ingredients);

    const cocktail = new Cocktail({
      user: req.user?._id,
      name: req.body.name,
      image: req.file?.filename,
      recipe: req.body.recipe,
      ingredients,
    });
    await cocktail.save();

    return res.send(cocktail);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

cocktailsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);

    if (cocktail === null) {
      return res.status(404).send({error: 'Cocktail not found'});
    }

    const updateCocktail =  await Cocktail.findByIdAndUpdate(cocktail._id, {$set: {isPublished: !cocktail.isPublished}}, {new: true});

    return res.send(updateCocktail);
  } catch (error) {
    return next(error);
  }
});

cocktailsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);

    if (cocktail === null) {
      return res.status(404).send({error: 'Cocktail not found'});
    }

    await Cocktail.deleteOne({_id: req.params.id});

    return res.send({message: 'Cocktail deleted successfully'})
  } catch (error) {
    return next(error);
  }
});

export default cocktailsRouter;