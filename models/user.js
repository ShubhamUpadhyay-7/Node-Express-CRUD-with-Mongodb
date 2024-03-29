const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "node-crud";

async function findAll() {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db(dbName);
  const users = await db.collection("users").find({}).toArray();
  console.log(users);
  client.close();
  return users;
}

async function findById(id) {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db(dbName);
  const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
  console.log(user);
  client.close();
  return user;
}

async function create(user) {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db(dbName);
  const createdUser = await db.collection("users").insertOne(user);
  client.close();
  return createdUser;
}

async function update(id, updatedFields) {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db(dbName);
  const updatedUser = await db.collection("users").updateOne(
    {
      _id: new ObjectId(id),
    },
    { $set: updatedFields }
  );
  client.close();
  return updatedUser;
}

async function del(id) {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db(dbName);
  const user = await db
    .collection("users")
    .deleteOne({ _id: new ObjectId(id) });
  client.close();
  return user;
}
module.exports = {
  findAll,
  findById,
  create,
  update,
  del,
};
