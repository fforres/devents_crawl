import mongoose from 'mongoose';
import env from './env';

import { get } from './meetup_api';
import { upsertGroups, retrieveGroups } from './schemas/groups';
import { upsertEvents } from './schemas/events';

mongoose.connect(env.mongodb.url);

// GETTING ALL TECH MEETUPS FOR CHILE
get('/find/groups', {
  city: 'chile',
  category: 34,
})
.then(upsertGroups)
.then(retrieveGroups)
.then((groups) => {
  // console.log(group._id, group.meetup_urlname),
  const promises = groups.map((group) => {
    return get(`/${group.meetup_urlname}/events`, {
      page: 2,
    })
    .then(events => upsertEvents(events, group._id));
  });
  console.log(promises);
  return promises.all;
})
.then(console.log)
.catch((err) => {
  console.log(err);
})

//
// // GETTING NEXT EVENT FOR 'Javascript-Chile'
// get('/Javascript-Chile/events', {
//   page: 2,
// }).then((response) => {
//   debugger;
//   console.log(response.data);
// })
// .catch((err) => {
//   console.log(err.response.config);
//   console.log(err.response.status);
//   console.log(err.response.statusText);
//   console.log(err.response.data);
// });
