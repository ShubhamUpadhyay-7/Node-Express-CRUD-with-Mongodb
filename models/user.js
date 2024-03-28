const { ObjectId } = require("mongodb");

class User {
  constructor(db) {
    this.collection = db.collection("users");
  }

  async findAll() {
    return this.collection.find({}).toArray();
  }

  async findById(id) {
    return this.collection.findOne({ _id: ObjectId(id) });
  }

  async create(user) {
    return this.collection.insertOne(user);
  }

  async update(id, updatedFields) {
    return this.collection.updateOne(
      {
        _id: ObjectId(id),
      },
      { $set: updatedFields }
    );
  }

  async delete(id) {
    return this.collection.deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = User;
