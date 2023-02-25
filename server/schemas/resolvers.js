const { AuthenticationError } = require('apollo-server-express');
const { User, Appointment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
  
          return userData;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      allUsers: async () => {
        try { 
          const userData = await User.find({});
          return userData;
        }
        catch (err) {
          console.log(err);
          throw new Error('Failed to retrieve users');
        }
      },
      appointments: async () => {
        const appointments = await Appointment.find({});
        return appointments;
      },
    },

    Mutation: {
      signup: async (parent, { input }) => {
        const user = await User.create(input);
        const token = signToken(user);
  
        return { token, user };
      },
      login: async (parent, { input }) => {
        const { email, password } = input;
  
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('Incorrect email or password');
        }
  
        const correctPassword = await user.isCorrectPassword(password);
  
        if (!correctPassword) {
          throw new AuthenticationError('Incorrect email or password');
        }
  
        const token = signToken(user);
        return { token, user };
      },
    }

}


module.exports = resolvers