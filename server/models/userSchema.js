const mongoose = require('mongoose')
const Schema = mongoose.mongoose.Schema


const UsersSchema = new Schema({
  userName: {
      type: String,
    //   required: true 
    },
  email: {
     type: String,
      required: true, 
      unique: true 
    },
  password: {
     type: String, 
     required: true, 
    //  unique: true 
},
profilePic:{
  type:String
}
});

const Users = mongoose.model('Users', UsersSchema);

module.exports = Users