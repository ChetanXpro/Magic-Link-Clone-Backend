const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
  
    email: {
      type: String,
      require: true,
      unique: true,
    },
    // password: {
    //   type: String,
    //   require: true,
    // },
    // token:{
    //   type:String
    // },
    // isVerified:{
    //   type:Boolean,
    // }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", schema);
