const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const { v4: uuidv4 } = require("uuid");
const { type } = require("os");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    unique: true,
  },
});

// In Mongoose, userSchema.pre('save', async function(next) { ... }) is used to define middleware functions that execute before saving a document (save operation) to the database.

userSchema.pre("save", async function (next) {
  //to check if in the current instance of the password is changed and then hash, i.e this functions run before saving document in mongoose user may type password in field
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  // this indicates the middleware has finished it's task
  next();
});

//static signup method
userSchema.statics.signup = async function (username, email, password) {
  if (!(username || email || password)) {
    throw new Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid Email");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  const emailExists = await this.findOne({ email });
  const usernameExists = await this.findOne({ username });

  if (emailExists) {
    throw new Error("Email already used");
  }
  if (usernameExists) {
    throw new Error("Username already taken. Use different username");
  }

  const user = new this({ username, email, password });

  //initialize the token creation to hash password before saving data in database
  await user.save();

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!(email || password)) {
    throw new Error("All finelds must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Incorrect email");
  }

  //password is from the frontend and user.password is the hashed password saved in database

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw new Error("Incorrect password");
  }

  return user;
};

//exporting userSchema as User so as to accesss the userShema we should import the schema as User and can access the schema as "User."
module.exports = mongoose.model("User", userSchema);
