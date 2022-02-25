import mongoose from "mongoose";

// const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['employer', 'interviewer', 'recruiter'],
    required: true,
  },
  signupType: {
    type: String,
    enum: ['incruiter', 'google', 'linkedin'],
    required: true,
  },
},
  {
    timestamps: true
  }
);

export default mongoose.model('User', UserSchema);