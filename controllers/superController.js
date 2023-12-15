class Controller {
  constructor(service) {
    this.service = service;
  }

  getAll = async (req, res) => {
    try {
      //Filtering
      
      const reqObj = { ...req.query };
      const excludeFields = ["limit", "page", "sort", "fields",];
      excludeFields.forEach((el) => delete reqObj[el]);

      //Advanced filtering
      let queryString = JSON.stringify(reqObj);
      queryString = queryString.replace(
        /\b(gte|lte|lt|gt)\b/g,
        (val) => `$${val}`
      );

      let query = this.service.getAll(JSON.parse(queryString));

      //Sorting
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        console.log(sortBy);
        query = query.sort(sortBy);
      } else {
        query = query.sort("-createdAt");
      }

      // Limiting Fields
      if (req.query.fields) {
        const field = req.query.fields.split(",").join(" ");
        query = query.select(field);
      } else {
        query = query.select("-__v");
      }

      // Pagination
      // console.log(req.query.page * 1 || 1);
      let page = req.query.page * 1 || 1;
      let limit = req.query.limit * 1 || 100;
      let skipn = (page - 1) * limit;

      if (req.query.page) {
        // const totalUsers = await UserModel.countDocuments();
        const totalU = await this.service.countDocs();

        
        if (skipn >= totalU) {
          throw new Error("The page doesn't exist.");
        }
      }
      query = query.skip(skipn).limit(limit);
      // Execute query
      const users = await query;
      res.status(200).json({
        status: "success",
        total: users.length,
        data: {
          users,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "failed er",
        message: err,
      });
    }
  };

  getOne = async (req, res) => {
    try {
      const user = await this.service.getOne(req.params.id);
     
      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  };

  updateOne = async (req, res) => {
    try {
      const user = await this.service.updateOne(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  };

  // Delete a user
  deleteOne = async (req, res) => {
    try {
      console.log("deleteOne");
      const user = await this.service.deleteOne(req.params.id);
      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  };
}
export default Controller;
