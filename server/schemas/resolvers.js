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
      }
    },

    Mutation: {
      signup: async (parent, { input }) => {
        const user = await User.create(input);
        const token = signToken(user);
  
        return { token, user };
      },
    }

}


module.exports = resolvers