import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const groupSchema = new Schema({
  id: ObjectId,
  name: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
  },
  long: {
    type: Number,
  },
  url: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  hires_photo: {
    type: String,
    required: true,
  },
  meetup_id: {
    type: Number,
    required: true,
  },
  meetup_urlname: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  localized_country_name: {
    type: String,
    required: true,
  },
  assistants_nickname: {
    type: String,
    default: 'devs',
  },
});

export default groupSchema;
