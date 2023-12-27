const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../models/userSchema");
const mongoose = require('mongoose');
const { response } = require("express");
require("dotenv").config();

module.exports = {
  login: async (req, res) => {
    const name = "SUPERADMIN";
    const adminId = "SUPER89798";
    try {
      if (
        req.body.email === process.env.ADMIN_EMAIL &&
        req.body.password === process.env.ADMIN_PASS
      ) {
        const accessToken = jwt.sign(
          { admin: adminId },
          process.env.SECRET_KEY_ADMIN,
          {
            expiresIn: "30d",
          }
        );
        res.cookie("adminJWT", accessToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.json({
          success: true,
          adminId: adminId,
          name: name,
        });
      } else {
        res.json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error in admin login:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },

  users: async (req, res) => {
    const user = await users.find();
    res.json({ user });
  },
  auth: async (req, res) => {
    const token = req?.cookies?.adminJWT;
    const nameofAdmin = "SUPERADMIN";
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY_ADMIN, async (err, decoded) => {
        if (err) {
          res.json({ success: false, message: err });
        } else {
          const adminId = decoded.admin;
          const name = nameofAdmin;
          res.json({ success: true, adminId, name });
        }
      });
    } else {
      res.json({ success: false });
    }
  },
  editUser: async (req, res) => {
    try {
      await users
        .findByIdAndUpdate(
          { _id: req.body.userId },
          { userName: req.body.editedValue },
          { new: true }
        )
        .then((response) => {
          res.json({ success: true, response });
        })
        .catch((res) => {
          res.json({ success: false, message: "Not updated try again" });
        });
    } catch (err) {
      throw err;
    }
  },
  deleteUser: async (req, res) => {
    try {  
      await users
        .findOneAndDelete({_id:req.body.userId})
        .then((response) => {
          res.json({ success: true, response });
        })
        .catch((error) => {
          res.json({
            success: false,
            message: "Not deleted, try again",
            error,
          });
        });
    } catch (error) {
        throw error
      res.json({ success: false, message: "Invalid user ID", error });
    }
  },
  addUser: async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        await users.create(req.body).then((response)=>{
        res.json({success:true})
      }).catch((response)=>{
        res.json({ success: false, message: "Invalid user", error });
      })

    } catch (error) {
      res.json({ success: false, message: "Invalid user", error });
    }
  },
  logout: (req, res) => {
    res.clearCookie('adminJWT');
    res.json({ success: true});
  },
};
