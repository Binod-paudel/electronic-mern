import User from "../models/user.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/token.util.js";

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

export { signup, login , logout };
