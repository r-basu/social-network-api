const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);

const usersData = [
  {
    username: `user1`,
    email: `user1@user1.com`,
  },
  {
    username: `user2`,
    email: `user2@user2.com`,
  },
  {
    username: `user3`,
    email: `user3@user3.com`,
  },
  {
    username: `user4`,
    email: `user4@user4.com`,
  },
];

const thoughtsData = [
  {
    thoughtText: "thought text example 1",
    username: `user1`,
  },
  {
    thoughtText: "thought text example 2",
    username: `user2`,
  },
  {
    thoughtText: "thought text example 3",
    username: `user3`,
  },
  {
    thoughtText: "thought text example 4",
    username: `user4`,
  },
];

connection.once(`open`, async () => {
  console.log("connected");

  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }

  await User.collection.insertMany(usersData);
  await Thought.collection.insertMany(thoughtsData);

  console.info("Seeding completed");
  process.exit(0);
});
