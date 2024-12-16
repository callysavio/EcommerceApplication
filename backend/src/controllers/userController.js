import httpStatus from "http-status";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import { registerSchema, loginUserSchema } from "../validation/userValidation.js";
import jwt from "jsonwebtoken";

// Controller function for registering a user
const registerUser = async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: error.details[0].message,
    });
  }
  const { email, password, role } = value;

  try {
    // Check if a user with the provided email already exists
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(httpStatus.CONFLICT).json({
        status: "error",
        message: "User with email already exists",
      });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = new User({
      email,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    await user.save();

    // Return a success response
    res.status(httpStatus.CREATED).json({
      status: "success",
      message: "Registration successful",
      data: user,
    });
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "An error occurred while registering the user",
    });
  }
};

// fetch all users
const fetchUsers = async (req, res) => {
  try {
    const users = await User.find({});
    console.log("Fetched users:", users); // Debug log
    res.status(httpStatus.OK).json({
      status: "success",
      message: "Successfully fetched all users",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Failed to fetch users",
    });
  }
};

// updating of users details
// const updateUser = async (req, res) => {
//   try {
//     const { email, password, fullname, gender, phone } = req.body;
//     const { id } = req.params;

//     // check if user exists using id
//     const existingUser = await User.findById(id);

//     if (!existingUser) {
//       return res.status(httpStatus.NOT_FOUND).json({
//         status: "error",
//         message: "User not found",
//       });
//     }

//     // check if the email entered already exists
//     const emailExist = await User.findOne({ email });
//     const nameExist = await User.findOne({ fullname });
//     if (emailExist || nameExist) {
//       return res.status(httpStatus.CONFLICT).json({
//         status: "success",
//         message: "Details entered already exist",
//       });
//     }

//     // check if the password entered already exists

//     // prepare the request body object
//     const updateData = {};
//     if (email) updateData.email = email;
//     if (fullname) updateData.fullname = fullname;
//     if (password) updateData.password = password;
//     if (phone) updateData.phone = phone;
//     if (gender) updateData.gender = gender;

//     // create and return updatedUser
//     const updatedUser = await User.findByIdAndUpdate(
//       id,
//       { $set: updateData },
//       { new: true }
//     );

//     res.status(httpStatus.OK).json({
//       status: "success",
//       message: "User details updated successfully",
//       updatedData: updatedUser,
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//       status: "error",
//       message: "SERVER ERROR",
//     });
//   }
// };

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Log the incoming request body to ensure it's being parsed
  console.log(req.body);

  // Validate the request body using the Joi schema
  const { error } = loginUserSchema.validate({ email, password });
  if (error) {
    console.log(error); // Log the error details for debugging
    return res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: error.details[0].message, // Error message from Joi validation
    });
  }

  try {
    const userExists = await User.findOne({ email: email });

    if (!userExists) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "Invalid Login details",
      });
    }

    // Check and compare password
    const correctPassword = await bcrypt.compare(password, userExists.password);
    if (!correctPassword) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: "error",
        message: "Invalid password",
      });
    }

    // Create an authorization token for the user
    const token = jwt.sign(
      {
        id: userExists._id,
        email: userExists.email,
      },
      process.env.JWT_SECRET
    );

    return res.status(httpStatus.OK).json({
      status: "success",
      message: "Login Successful!",
      userData: {
        id: userExists._id,
        name: userExists.username,
        email: userExists.email,
      },
      authToken: token,
    });
  } catch (err) {
    console.error(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "An error occurred while trying to login",
    });
  }
};

export { registerUser, fetchUsers, loginUser };

