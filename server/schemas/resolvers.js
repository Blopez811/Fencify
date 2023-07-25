const { AuthenticationError } = require("apollo-server-express");
const { User, Appointment } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log('here is dat context.user: ', context.user)
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    allUsers: async () => {
      try {
        const userData = await User.find({});
        return userData;
      } catch (err) {
        console.log(err);
        throw new Error("Failed to retrieve users");
      }
    },
    appointments: async () => {
      const appointments = await Appointment.find({});
      return appointments;
    },
  },

  Mutation: {
    signup: async (parent, { input }, context) => {
      const user = await User.create(input);
      const token = signToken(user);
      context.res.cookie('token', token, {
        httpOnly: true,
        // maxAge: 1000 * 60 * 60 * 2, // would set cookie expiration to 2 hours
        // secure: true, // set to true if your using https
      });

      return { token, user };
    },
    login: async (parent, { input }, context) => {
      const { email, password } = input;

      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect email or password");
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError("Incorrect email or password");
      }

      const token = signToken(user);
      context.res.cookie('token', token, {
        httpOnly: true,
        // maxAge: 1000 * 60 * 60 * 2, // would set cookie expiration to 2 hours
        // secure: true, // set to true if your using https
      });
      return { token, user };
    },
    createAppointment: async (_, { input }, { user }) => {
      try {
        console.log("test");
        console.log("here is user: ", user);
        const {
          date,
          time,
          customerName,
          phoneNumber,
          email,
          propertyAddress,
        } = input;

        if (!user) {
          throw new AuthenticationError(
            "User is not logged in. Please log in to create an appointment."
          );
        }
        // Create a new appointment using the provided date, location, and the authenticated user's ID.
        const newAppointment = await Appointment.create({
          date,
          time,
          customerName,
          phoneNumber,
          email,
          propertyAddress,
          user: user._id,
        });

        // Update the appointments field in the associated User model.
        await User.findByIdAndUpdate(user._id, {
          $push: { appointments: newAppointment._id },
        });

        // Return the newly created appointment as the result.
        // Populate the user field in the newAppointment object to include the username.
        const populatedAppointment = await newAppointment
          .populate("user")


        // Return the populated appointment object, which includes the user with the username.
        return populatedAppointment;
      } catch (error) {
        // Handle any errors that occur during the appointment creation process.
        console.error(error);
        throw new Error("Failed to create appointment");
      }
    },

    updateAppointment: async (_, { _id, input }, { user }) => {
      try {
        if (!user) {
          throw new AuthenticationError('User is not logged in. Please log in to update an appointment.');
        }
  
        // Find the appointment by ID
        const appointment = await Appointment.findById(_id);
  
        if (!appointment) {
          throw new Error('Appointment not found');
        }
  
        // Check if the authenticated user owns the appointment
        if (appointment.user.toString() !== user._id.toString()) {
          throw new AuthenticationError('You are not authorized to update this appointment');
        }
  
        // Update the appointment fields with the provided input values
        if (input.date) {
          appointment.date = input.date;
        }
        if (input.time) {
          appointment.time = input.time;
        }
        if (input.customerName) {
          appointment.customerName = input.customerName;
        }
        if (input.phoneNumber) {
          appointment.phoneNumber = input.phoneNumber;
        }
        if (input.email) {
          appointment.email = input.email;
        }
        if (input.propertyAddress) {
          appointment.propertyAddress = input.propertyAddress;
        }
  
        // Save the updated appointment
        const updatedAppointment = await appointment.save();
  
        return updatedAppointment;
      } catch (error) {
        // Handle any errors that occur during the appointment update process
        console.error(error);
        throw new Error('Failed to update appointment');
      }
    },

    deleteAppointment: async (_, { _id }, { user }) => {
      try {
        if (!user) {
          throw new AuthenticationError('User is not logged in. Please log in to delete an appointment.');
        }
        
        // Find the appointment by ID
        const appointment = await Appointment.findById(_id);
        
        if (!appointment) {
          throw new Error('Appointment not found');
        }
        
        // Check if the authenticated user owns the appointment
        if (appointment.user.toString() !== user._id.toString()) {
          throw new AuthenticationError('You are not authorized to delete this appointment');
        }
        
        // Delete the appointment
        await appointment.remove();
        
        // Return the deleted appointment as the result
        return appointment;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to delete, you are not authorized to delete this appointment.');
      }
    },
  },
};

module.exports = resolvers;
