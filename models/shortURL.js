const mongoose = require('mongoose');
const shortId = require('shortid');

const { Schema } = mongoose;
const urlSchema = new Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate
  }
});

const ShortURL = mongoose.model('ShortURL', urlSchema);
module.exports = ShortURL;