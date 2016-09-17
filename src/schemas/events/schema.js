import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const eventsSchema = new Schema({
  id: ObjectId,
  description: {
    type: String,
    default: '',
  },
  assistants_limit: {
    type: Number,
    default: 0,
  },
  assistants_current: {
    type: Number,
    default: 0,
  },
  assistants_waitlist: {
    type: Number,
    default: 0,
  },
  time: {
    type: Number,
    default: 0,
  },
  utc_offset: {
    type: Number,
    default: 0,
  },
  group: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  venue: {
    meetup_id: {
      type: Number,
    },
    address: {
      type: String,
    },
    name: {
      type: String,
    },
    lat: {
      type: Number,
    },
    long: {
      type: Number,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    localized_country_name: {
      type: String,
    },
  },
  meetup_id: {
    type: Number,
    required: true,
  },
});

export default eventsSchema;
