const { getPaginatedRecords } = require("../_helpers/paginate");
const mongoose = require("mongoose");

class Repository {
  constructor(Model) {
    this.Model = Model;
  }

  async initSession(mongodbUri) {
    const db = await mongoose.createConnection(mongodbUri).asPromise();
    const session = await db.startSession();
    return session;
  }
  async startTransaction(session) {
    return session.startTransaction();
  }
  async commitTransaction(session){
    return session.commitTransaction();
  }
  async abortTransaction(session){
    return session.abortTransaction();
  }
  async endSession(){
    return session.endSession()
  }

  getModel() {
    return this.Model;
  }

  create(obj) {
    return this.Model.create(obj);
  }

  findById(id) {
    return this.Model.findById(id);
  }

  findOne(condition = {}) {
    return this.Model.findOne(condition);
  }

  all(limit, page, data, selectedFields) {
    return getPaginatedRecords(this.Model, {
      limit: limit,
      page: page,
      data,
      selectedFields,
    });
  }

  count(condition, callback) {
    if (condition) {
      return this.Model.where(condition).count(callback);
    }
    return this.Model.count();
  }

  delete(condition) {
    return this.Model.deleteMany(condition);
  }

  deleteOne(condition) {
    return this.Model.deleteOne(condition);
  }

  update(condition, update) {
    return this.Model.findOneAndUpdate(condition, update, {
      new: true,
      lean: true,
    });
  }

  updateMany(condition, update) {
    return this.Model.updateMany(condition, update, {
      new: true,
      lean: true,
    });
  }
}

module.exports = Repository;
