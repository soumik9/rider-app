const User = require('../models/userSchema');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {

  const url = req.protocol + '://' + req.get('host') + req.originalUrl.slice(0, 4);

    try {
        const findUser = await User.findOne({ email: req.body.email });
        if(findUser) return res.send({ message: 'Already Exists', success: false });

        if(req.body.password !== req.body.confirmPassword) return res.send({ message: 'Password Mismatched!', success: false });

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = { ...req.body, password: hashedPassword, confirmPassowrd: undefined };

        if (req.files.img) {
          console.log(req.files.img[0].path)
            newUser.image = url + '/' + req.files.img[0].path
        } else {
            newUser.image = ''
        } 
        
        if (req.files.dlImg) {
            newUser.drivingLicence = url + '/' + req.files.dlImg[0].path
        } else {
            newUser.drivingLicence = ''
        } 
        
        if (req.files.nid) {
            newUser.nid = url + '/' + req.files.nid[0].path
        } else {
            newUser.nid = ''
        }

        const user = new User(newUser);
        await user.save();
        res.send({ message: 'Successfully Created User', success: true });
      } catch (error) {
        console.log(error.message)
        res.send({ error: error.message, message: 'Server side error', success: false });
      }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // checking email and password given
    if(!email || !password) return res.send({ message: 'Credential mismatch!', success: false });

    // checking is user registred
    const user = await User.findOne({ email });
    if(!user) return res.status(404).send({ message: 'User not found!', success: false });

    // comparing password
    const isPasswordValid = user.comparePassword(password, user.password);
    if(!isPasswordValid) return res.status(403).send({ message: 'Password not matched!', success: false });

    // token
    const token = generateToken(user);

    const { password: pwd, ...others } = user.toObject();
    res.status(200).send({ data:{ user: others, token }, message: 'Successfully logged!', success: true });
  } catch (error) {
    res.status(500).send({ error: error.message, message: 'Server side error', success: false });
  }
}

const profile = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user?.email });
    res.status(200).send({data: user, message: 'Successfully get user data!', success: true });
  } catch (error) {
    res.status(500).send({ error: error.message, message: 'Server side error', success: false });
  }
}

module.exports = { signup, login, profile }