import mongoose from 'mongoose';
import eventsSchema from './schema';

const eventsModel = mongoose.model('Events', eventsSchema, 'events');

const modelCreator = (data) => {
  console.log(data);
  debugger;
  return {
    // description:
    // assistants_limit:
    // assistants_current:
    // assistants_waitlist:
    // time:
    // utc_offset:
    // group: // Schema.Types.ObjectId,
    // venue: {
    //   meetup_id:
    //   address:
    //   name:
    //   lat:
    //   long:
    //   city:
    //   country:
    //   localized_country_name:
    // },
    // meetup_id: ,
  };
};

export const upsertGroups = data => new Promise((resolve, reject) => {
  const bulk = eventsModel.collection.initializeUnorderedBulkOp();
  const records = data.data;

  records.forEach((record) => {
    const queryData = modelCreator(record);
    console.log(queryData);
    bulk.find({
      meetup_id: record.meetup_id,
    }).upsert().updateOne(queryData);
  });
  bulk.execute((err, bulkres) => {
    if (err) reject(err);
    resolve(bulkres);
  });
});


export const retrieveGroups = () => new Promise((resolve, reject) => {
  eventsModel.find().exec((err, data) => {
    if (err) reject(err);
    resolve(data);
  });
});

export default {
  upsertGroups,
  retrieveGroups,
};
