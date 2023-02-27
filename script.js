const mongoose = require("mongoose");
const { User } = require("./User");
const { Persons } = require("./User");
const dotenv = require("dotenv");
dotenv.config();
URI = process.env.MONGO_URI;

const database = (module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(URI);
    console.log("database connected successfully");
  } catch (error) {
    console.log(error);
  }
});

database();

//Create a person
async function run() {
  const user = new User({
    name: "ahmed",
    age: 30,
    favoriteFoods: ["plat scalop", "Chicken"],
  });
  await user.save();
}
run();

//Create Many Records
Persons.createCollection()
  .then(function (arrayOfPeople) {
    console.log(arrayOfPeople);
  })
  .then(
    Persons.insertMany([
      {
        name: "badis",
        age: 20,
        favoriteFoods: ["spagheti", "pizza","Lasagna"],
      },
      {
        name: "ali",
        age: 54,
        favoriteFoods: ["Paella", "Apfelstrude"],
      },
      {
        name: "med sayed",
        age: 15,
        favoriteFoods: ["Sushi", "Fish", "Goulash","spagheti"],
      },
      {
        name: "dali",
        age: 26,
        favoriteFoods: [
          "Meatloaf",
          "Kimchi",
          " Fried chicken",
          "Hamburger",
          "Steak and Kidney Pie",
        ],
      },
    ])
  );

//find
Persons.find({ name: "ali" }, function (err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log("Result : ", res);
  }
});

//findOne
Persons.findOne({ name: "badis" }, function (err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log("Result : ", res);
  }
});


//Classic Updates Find, Edit, then Save
Persons.findOne({ name: "ali" }).then((user) => {
  user.favoriteFoods.push("Paella");
  user.markModified("favoriteFoods");
  user.save((err) => console.log(err));
});

//findOneAndUpdate
Persons.findOneAndUpdate(
  { name: "badis" },
  { name: "med sayed" },
  null,
  function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Original Doc : ", docs);
    }
  }
);

//findByIdAndRemove
Persons.findByIdAndRemove("63f32d8a7ac8f62fb085d755", function (err, docs) {
  if (err) {
    console.log(err);
  } else {
    console.log("Deleted User : ", docs);
  }
});

//Delete Many Documents
Persons.remove({ name: "Sekiro" }).then((result) => {
  console.log(result);
});

//Chain Search Query Helpers

Persons.find({ favoriteFoods: "spagheti" })
  .sort({ name: "asc" })
  .limit(2)
  .select("-age")
  .exec()
  .then((result) => {
    console.log(result);
  });