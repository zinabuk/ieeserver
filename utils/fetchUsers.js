export default class FetchUsers {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    //Filtering
    const reqObj = { ...this.queryString };
    const excludeFields = ["limit", "page", "sort", "fields"];
    excludeFields.forEach((el) => delete reqObj[el]);

    //Advanced filtering
    let queryString = JSON.stringify(reqObj);
    queryString = queryString.replace(
      /\b(gte|lte|lt|gt)\b/g,
      (val) => `$${val}`
    );
    this.query.find(JSON.parse(queryString));
    return this;
  }
  sort() {
    // Sorting
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  limited() {
    // Limiting
    if (this.queryString.fields) {
      const field = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(field);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  paginated() {
    // Pagination
    let page = this.queryString.page * 1 || 1;
    let limit = this.queryString.limit * 1 || 100;
    let skipn = (page - 1) * limit;
    this.query = this.query.skip(skipn).limit(limit);
    return this;
  }
}
