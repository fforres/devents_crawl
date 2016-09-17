import mongoose from 'mongoose';
import groupSchema from './schema';

const groupsModel = mongoose.model('Groups', groupSchema, 'groups');

const modelCreator = data => ({
  name: data.name,
  lat: data.lat,
  long: data.long,
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
  groupsModel.find().exec((err, data) => {
    if (err) reject(err);
    resolve(data);
  });
});

export default {
  upsertGroups,
  retrieveGroups,
};
