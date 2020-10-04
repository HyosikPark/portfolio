import express from 'express';
import User from '../models/userModel';
import { getToken } from '../util';

const router = express.Router();

router.post('/register', (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: true,
  });

  user
    .save()
    .then((newUser) =>
      res.send({
        _id: newUser._id,
        name: newUser.name,
        eamil: newUser.eamil,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser),
      })
    )
    .catch((err) => res.send({ msg: 'Invalid User Data.' }));
});

router.post('/signin', (req, res) => {
  User.findOne({
    email: req.body.email,
    password: req.body.password,
  })
    .then((signinUser) => {
      res.send({
        _id: signinUser.id,
        name: signinUser.name,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser),
      });
    })
    .catch((error) =>
      res.status(401).send({ msg: 'Invalid eamil or password' })
    );
});

// router.get('/createadmin', async (req, res) => {
//   try {
//     const user = new User({
//       name: 'goos',
//       email: 'abcdd@abcdd.com',
//       password: '1234',
//       isAdmin: true,
//     });
//     const newUser = await user.save();
//     res.send(newUser);
//   } catch (error) {
//     res.send({ msg: error.message });
//   }
// });

export default router;
