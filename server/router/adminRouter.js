const express = require('express');
const router = express.Router();
const adminController= require('../controller/adminController');

router.post('/login', adminController.login);
router.get('/users',adminController.users)
router.get('/check-auth', adminController.auth);
router.post('/edit-user', adminController.editUser);
router.post('/delete-user', adminController.deleteUser);
router.post('/add-user', adminController.addUser);
router.get('/logout',adminController.logout)

module.exports = router;
