import mongoose from 'mongoose';
import groupSchema from './schema';

const groupsModel = mongoose.model('Groups', groupSchema, 'groups');

const modelCreator = (data) => {
  const ob = {
    name: data.name,
    lat: data.lat,
    lon: data.lon,
    url: data.link,
    city: data.city,
    country: data.country,
    localized_country_name: data.localized_country_name,
    meetup_id: data.id,
    meetup_urlname: data.urlname,
    assistants_nickname: data.who,
  };
  ob.photo = data.key_photo && data.key_photo.photo_link ? data.key_photo.photo_link : 'https://placehold.it/300x150/E8117F/ffffff?text=No+photo+yet+:(';
  ob.hires_photo = data.key_photo && data.key_photo.highres_link ? data.key_photo.highres_link : 'https://placehold.it/600x300/E8117F/ffffff?text=No+photo+yet+:(';
  return ob;
};

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
    if (err) reject(err);
    resolve(data);
  });
});

export default {
  upsertGroups,
  retrieveGroups,
};
