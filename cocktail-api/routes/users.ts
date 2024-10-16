import express from 'express';
import {imagesUpload} from '../multer';
import mongoose from 'mongoose';
import User from '../models/User';

const usersRouter = express.Router();

usersRouter.post('/', imagesUpload.single('avatar'), async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      displayName: req.body.displayName,
      avatar: req.file?.filename,
      password: req.body.password,
    });

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
   if (!req.body.email || !req.body.password) {
     return res.status(400).send({error: 'Email and password are required'});
   }

   const user = await User.findOne({email: req.body.email});

   if (!user) {
     return res.status(400).send({error: 'Email or password is incorrect'});
   }

   const isMatch = await user.checkPassword(req.body.password);

   if (!isMatch) {
     return res.status(400).send({error: 'Email or password is incorrect'});
   }

   user.generateToken();
   user.save();

   return res.send(user);
  } catch (error) {
    return next(error);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');

    if(!headerValue) return res.status(204).send();

    const [_bearer, token] = headerValue.split(' ');

    if(!token) return res.status(204).send();

    const user = await User.findOne({token});

    if(!user) return res.status(204).send();

    user.generateToken();
    user.save();

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;