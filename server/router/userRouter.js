const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const upload = require('../middleware/multer')

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/check-auth', userController.auth);
router.post('/profilePic/:id',upload.single('image',1), userController.profilePic);
router.get('/profile/:id',userController.profile)
router.post('/editProfile/:id',userController.editProfile)
router.get('/logout',userController.logout)

module.exports = router;
