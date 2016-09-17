import mongoose from 'mongoose';
import env from './env';

import { get } from './meetup_api';
import { upsertGroups, retrieveGroups } from './schemas/groups';

mongoose.connect(env.mongodb.url);
// 
// // GETTING ALL TECH MEETUPS FOR CHILE
// get('/find/groups', {
//   city: 'chile',
//   category: 34,
// })
// .then(upsertGroups)
// .catch((err) => {
//   console.log(err);
// })
// .then(retrieveGroups)
// .then((data) => {
//   console.log(data[0]);
// });


// GETTING NEXT EVENT FOR 'Javascript-Chile'
get('/Javascript-Chile/events', {
  page: 1,
}).then((response) => {
  debugger;
  console.log(response.data);
})
.catch((err) => {
  console.log(err.response.config);
  console.log(err.response.status);
  console.log(err.response.statusText);
  console.log(err.response.data);
});
