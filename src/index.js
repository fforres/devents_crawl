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
  const promises = groups.map(group => get(`/${group.meetup_urlname}/events`, {
    page: 2,
  })
  .then(events => upsertEvents(events, group._id)));
  return promises.all;
})
.then(console.log)
.catch(console.log)
