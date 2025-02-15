const { User, Blog } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const sendVerificationEmail = require("../utils/nodemailer");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
    user: async (parent, { username }) => {
      return await User.findOne({ username });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    getAllBlogs: async () => {
      return await Blog.find().sort({ createdAt: -1 }); // Fetch latest blogs first
    },
    getBlog: async (_, { id }) => {
      return await Blog.findById(id);
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        if (!existingUser.isVerified) {
          // ✅ Resend verification code for unverified users
          const newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
          existingUser.verificationCode = newVerificationCode;
          await existingUser.save();
          await sendVerificationEmail(email, newVerificationCode);
          return "User already exists but is unverified. A new verification code has been sent.";
        }
        throw new Error("User already exists!");
      }

      // ✅ Generate a new verification code for new users
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

      // ✅ Create the new user
      const user = await User.create({
        username,
        email,
        password,
        verificationCode,
        isVerified: false,
      });

      // ✅ Send verification email
      await sendVerificationEmail(email, verificationCode);

      return "Verification code sent to your email. Please verify your account.";
    },

    verifyEmail: async (parent, { email, verificationCode }) => {
      const user = await User.findOne({ email });

      if (!user) throw new Error("User not found!");
      if (user.isVerified) throw new Error("User is already verified.");
      if (user.verificationCode !== verificationCode) throw new Error("Invalid verification code.");

      // ✅ Mark the user as verified and clear the verification code
      user.isVerified = true;
      user.verificationCode = null;
      await user.save();

      // ✅ Log the user in immediately after verification
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new AuthenticationError("Incorrect email or password");

      // ✅ Prevent login if the user is not verified
      if (!user.isVerified) throw new AuthenticationError("Please verify your email before logging in.");

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) throw new AuthenticationError("Incorrect email or password");

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;