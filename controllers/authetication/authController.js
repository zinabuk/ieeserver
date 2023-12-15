import jwt from "jsonwebtoken";
import UserClass from "../../models/userModel.js";
const UserModel = UserClass.getUserInstance();

import jwtSign from "../../utils/jsonwebtoken.js";
// const userModel = UserClass.getUserInstance();
class AuthClass {
  static async login(req, res) {
    
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(200).json({
        status: "fail",
        message: "Please enter all fields",
      });
    }
    const user = await UserModel.findOne({ email });

    if (!user || !(await user.matchPassword(password, user.password))) {
      return res.status(200).json({
        status: "fail",
        message: "Invalid user credentials",
      });
    }
    const token = jwtSign({ id: user._id });
    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  }
  // Authentication
  static authenticate = async (req, res, next) => {
    let token;
    let decodedToken;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }

    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decodedToken) {
      return res.json({
        message: "The token is misbehaving",
      });
    }
    const newUser = await UserModel.findById(decodedToken.id);
    if (!newUser) {
      return res.json({
        message: "Your account is not available",
      });
    }
    req.isAuthenticated = newUser;
    next();
  };
}

export default AuthClass;
