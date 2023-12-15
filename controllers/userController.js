import jwt from "../utils/jsonwebtoken.js";
import UserClass from "../models/userModel.js";
import userService from "../services/userServices/userService.js";
const UserModel = UserClass.getUserInstance();
const service = new userService(UserModel);
import superController from "./superController.js";

//create a new user
class userController extends superController {
  constructor(service) {
    super(service);
    this.service = service;
  }

  signUp = async (req, res) => {
    try {
      const newUser = await service.createUser(req.body);
     
      const data = jwt({id:newUser._id});
      res.status(200).json({
        status: "success",
        data,
        user: {
          newUser,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "failed",
        message: err.message,
      });
    }
  };

  createUser = async (req, res) => {
    console.log("create User " + req.body.name);
    try {
      const user = await this.service.create(req.body);
      res.status(201).json({
        status: "success",
        data: {
          user,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err.message,
      });
    }
  };
}

export default new userController(service);
