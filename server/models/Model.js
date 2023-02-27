const mongoose = require("mongoose");
const ModelSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true
  },
  description: {
    type: String,
  },
  todono:{
    type:Number,
    required:true
  },
  date:{
  type:Date,
default:new Date() }
});
module.exports = mongoose.model("Model", ModelSchema);
