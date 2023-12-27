const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../models/userSchema");

module.exports = {
  signup: async (req, res) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const newUser = await users.create(req.body);
      if (newUser) {
        const accessToken = jwt.sign({ user: newUser._id }, process.env.SECRET_KEY_user, {
          expiresIn: "30d",
        });
        res.cookie("userJwt", accessToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.json({
          success: true,
          userId: newUser?._id,
          name: newUser?.userName,
        });
      } else {
        throw new Error(
          "something went wrong in signup ====> newUser is not creating "
        );
      }
    } catch (error) {
      if (error.code === 11000) {
        res.json({
          success: false,
          message: "already registered with this email",
        });
      } else {
        res.json({ success: false, message: error.message });
      }
    }
  },
  login: async (req, res) => {
    try{
    const email = req.body?.email;
    const password = req.body?.password;
    const user = await users.findOne({ email: email });
    if (user) {
      const passwordStatus = await bcrypt.compare(password, user?.password);
      if (passwordStatus) {
        const token = req?.cookies?.userJwt;
        if (!token) {
            const accessToken = jwt.sign({ user: user._id },process.env.SECRET_KEY_user, {
                expiresIn: "30d",
              });
              res.cookie("userJwt", accessToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
              });
        }
        res.json({ success: true, userId: user?._id, name: user?.userName });
      } else {
        res.json({ success: false, message: "invalied password" });
      }
    } else {
      res.json({ success: false, message: "no user exist in this email" });
    }
    }catch(err){
        console.log('error in the login try ')
        throw err
    }
  },
  auth : async (req, res) => {
    const token = req?.cookies?.userJwt;
    if (token) {
      jwt.verify(token,process.env.SECRET_KEY_user, async (err, decoded) => {
        if (err) {
          res.json({ success: false, message: err });
        } else {
          const userId = decoded.user;
          const userData = await users.findById(userId)
          res.json({ success: true, userData });
        }
      });
    } else {
      res.json({ success: false });
    }
  },
  profilePic : async (req,res)=>{
    const userId = req.params.id
    try {
        const user = await users.findOne({ _id: userId });
        if (user) {
          const newuser = await users.findByIdAndUpdate(user._id,{profilePic:req.file.filename})
          res.json({ success: true, message: 'Profile picture updated successfully',newuser });
        } else {
          res.json({ success: false, message: 'User not found' });
        }
      } catch (error) {
        res.json({ success: false, message: error.message });
      }
  },
  profile : async (req,res)=>{
    const user = await users.findById(req.params.id)
    res.json({success:true,user})
  },
  editProfile : async (req,res)=>{
    try{
      const user = await users.findByIdAndUpdate({_id:req.params.id},{userName:req.body.newName}).then((response)=>{
              res.json({success:true,response})
      })
    }catch(err){
      throw err
    }
  },
  logout: (req, res) => {
    res.clearCookie('userJwt');
    res.json({ success: true});
  },
}
