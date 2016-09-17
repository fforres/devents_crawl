import mongoose from 'mongoose';
import eventsSchema from './schema';

const eventsModel = mongoose.model('Events', eventsSchema, 'events');

const modelCreator = (data, groupId) => {
  const object = {
    description: data.description,
    assistants_limit: data.rsvp_limit,
    assistants_current: data.yes_rsvp_count,
    assistants_waitlist: data.waitlist_count,
    time: data.time,
    utc_offset: data.utc_offset,
    group: groupId,
    meetup_id: data.id,
  };
  // Adding venue information;
  if (data.venue) {
    const venue = {
      meetup_id: data.venue.id,
      address: data.venue.address_1,
      name: data.venue.name,
      lat: data.venue.lat,
      lon: data.venue.lon,
      city: data.venue.city,
      country: data.venue.country,
      localized_country_name: data.venue.localized_country_name,
    };
    object.venue = venue;
  }
  return object;
};

export const upsertEvents = (data, groupId) => new Promise((resolve, reject) => {
  const bulk = eventsModel.collection.initializeUnorderedBulkOp();
  const records = data.data;
  if (records.length <= 0) resolve(null);
  records.forEach((record) => {
    const queryData = modelCreator(record, groupId);
    bulk.find({
      meetup_id: queryData.meetup_id,
    }).upsert().updateOne(queryData);
  });
  bulk.execute((err, bulkres) => {
    if (err) reject(err);
    resolve(bulkres);
  });
});


export const retrieveEvents = () => new Promise((resolve, reject) => {
  eventsModel.find().exec((err, data) => {
    if (err) reject(err);
    resolve(data);
  });
});

export default {
  upsertEvents,
  retrieveEvents,
};
