'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const coachSchema = Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  bio: { type: String, default: `Hello!` },

});

export default mongoose.model('coaches', coachSchema);