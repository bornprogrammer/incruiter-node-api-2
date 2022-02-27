import mongoose from "mongoose";
import bcrypt from "bcrypt";
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

userSchema.pre('save', async function (next) {
  let context = this;
  if (context.password) {
    const salt = await bcrypt.genSalt(10);
    context.password = await bcrypt.hash(context.password, salt);
  }
  next();
});

export default mongoose.model('User', userSchema);