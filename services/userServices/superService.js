class service {
  constructor(model) {
    this.model = model;
  }
  getAll(value) {
    return this.model.find(value);
  }
  getOne(id) {
    return this.model.findById(id);
  }
  deleteOne(id) {
    return this.model.findByIdAndDelete(id);
  }
  deleteAll() {}
  updateOne() {}
  updateall() {}
  countDocs() {
    return this.model().countDocuments();
  }
}

export default service;
