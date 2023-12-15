import service from "./superService.js"
class userService extends service {
  constructor(model) {
   super(model);
  }

  createUser(data){
    return this.model.create(data);
  }

}

export default  userService;