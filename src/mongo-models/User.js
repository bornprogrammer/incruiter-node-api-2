import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  scope: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  }
);

export default mongoose.model('User', userSchema);