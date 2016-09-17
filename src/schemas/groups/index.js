import mongoose from 'mongoose';
import groupSchema from './schema';

const groupsModel = mongoose.model('Groups', groupSchema, 'groups');

const modelCreator = data => ({
  name: data.name,
  lat: data.lat,
  lon: data.lon,
  url: data.link,
  photo: data.key_photo ? data.key_photo.photo_link : '',
  hires_photo: data.key_photo ? data.key_photo.highres_link : '',
  meetup_id: data.id,
  meetup_urlname: data.urlname,
  assistants_nickname: data.who,
});

export const upsertGroups = data => new Promise((resolve, reject) => {
  const bulk = groupsModel.collection.initializeUnorderedBulkOp();
  const records = data.data;
  const groupsWithEvents = [];
  records.forEach((record) => {
    if (record.next_event) {
      groupsWithEvents.push(record.id);
    }
    const queryData = modelCreator(record);
    bulk.find({
      meetup_id: record.id,
    }).upsert().updateOne(queryData);
  });
  bulk.execute((err) => {
    if (err) reject(err);
    resolve(groupsWithEvents);
  });
});


export const retrieveGroups = ids => new Promise((resolve, reject) => {
  groupsModel.find({
    'meetup_id': {
      $in: ids,
    },
  }).exec((err, data) => {
    console.log(data);
    if (err) reject(err);
    resolve(data);
  });
});

export default {
  upsertGroups,
  retrieveGroups,
};
