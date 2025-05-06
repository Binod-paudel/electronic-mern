import User from "../models/user.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/token.util.js";
import ApiError from "../utils/apiError.js";

//@desc register new user
//@route /api/v4/users/signup
//@acess public
const signup = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;
  let userexists = await User.findOne({ email });
  if (userexists) {
    let err = new Error(`User with email ${email} already exist!`);
    err.status = 400;
    throw err;
  }
  let user = await User.create(req.body);
  createToken(res, user._id);
  res.send({
    message: "User registered:",
    user: {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    let err = new Error(`${email} not registered`);
    err.status = 400;
    throw err;
  }
  if (await user.matchPassword(password)) {
    createToken(res, user._id);
    res.send({
      message: "Login Success!",
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  }
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("jwt");
  res.send({ message: "logout success!" });
});

//@desc get all the users
//@route /api/v4/users
//@access private + admin
const getUsers = asyncHandler(async (req, res) => {
  let users = await User.find({}).select("-password");
  res.send(users);
});

//@desc get profile
//@route /api/v4/users/profile
//@access private
const getProfileUser = asyncHandler(async (req, res) => {
  res.send(req.user);
});

//@desc update profileuser
//@route /api/v4/users/profile
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {
  let id = req.user._id;
  let user = await User.findById(id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;
    let updatedUser = await user.save();
    res.send({
      message: "User Profile updated",
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      },
    });
  } else {
    throw new ApiError(404, "User not found");
  }
});

//@desc update user
//@route /api/v4/users
//@access private+admin
const updateUser = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let user = await User.findById(id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    let updatedUser = await user.save();
    res.send({ message: "User updated!", user: updatedUser });
  } else {
    throw new ApiError(404, "User not found!");
  }
});

//@desc delete user
//@route PUT/api/v4/users
//@access private + admin
const deleteUser = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let user = await User.findById(id);
  if (user.isAdmin) {
    throw new ApiError(400, "Cannot delete an admin user!");
  }
  await User.findByIdAndDelete(id);
  res.send({ message: "User deleted successfully!" });
});

export {
  signup,
  login,
  logout,
  getUsers,
  getProfileUser,
  updateUserProfile,
  updateUser,
  deleteUser
};
