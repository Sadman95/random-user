const fs = require("fs");
let users = [];

//get all users
const getUsers = async (req, res, next) => {
  const { limit } = req.query;
  try {
    fs.readFile("users.json", (err, data) => {
      if (err) {
        res.send(err.message);
      }
      users = JSON.parse(data);
      if (limit) {
        return res.send(users.slice(0, limit));
      }
      res.send(users);
      res.end();
    });
  } catch (err) {
    next(err);
  }
};

//post a user
const postUser = async (req, res, next) => {
  try {
    const { id, gender, name, contact, address, photoUrl } = req.body;
    if (!id || !gender || !name || contact || address || photoUrl)
      throw Error("Fields are required");
    const newUser = {
      id,
      gender,
      name,
      contact,
      address,
      photoUrl,
    };
    fs.readFile("users.json", (err, data) => {
      if (err) {
        res.send(err.message);
      }
      users = JSON.parse(data);
      users.push(newUser);
      fs.writeFile("users.json", JSON.stringify(users), (err) => {
        if (err) {
          res.send(err.message);
        }
      });
      res.send(users);
      res.end();
    });
  } catch (err) {
    next(err);
  }
};

//patch user
const patchUser = async (req, res, next) => {
  try {
    fs.readFile("users.json", (err, data) => {
      if (err) {
        res.send(err.message);
      }
      users = JSON.parse(data);
      const { id } = req.params;
      const user = users.find((u) => u.id === Number(id));
      if (!user) {
        throw Error("User not found");
      }
      user.id = req.body.id;
      user.gender = req.body.gender;
      user.name = req.body.name;
      user.contact = req.body.contact;
      user.address = req.body.address;
      user.photoUrl = req.body.photoUrl;
      fs.writeFile("users.json", JSON.stringify(users), (err) => {
        if (err) {
          res.send(err.message);
        }
      });
      res.send(users);
      res.end();
    });
  } catch (err) {
    next(err);
  }
};

//delete a user
const deleteUser = async (req, res, next) => {
  try {
    fs.readFile("users.json", (err, data) => {
      if (err) {
        res.send(err.message);
      }
      users = JSON.parse(data);
      const { id } = req.params;
      const user = users.find((u) => u.id === Number(id));
      if (!user) {
        throw Error("User not found");
      }
      users = users.filter((u) => u.id !== Number(id));
      fs.writeFile("users.json", JSON.stringify(users), (err) => {
        if (err) {
          res.send(err.message);
        }
      });
      res.send(users);
      res.end();
    });
  } catch (err) {
    next(err);
  }
};

//bulk update
const bulkUpdate = async (req, res, next) => {
  const { updates } = req.body;
  if (!updates) throw Error("Something is missing in the body");
  try {
    fs.readFile("users.json", (err, data) => {
      if (err) {
        res.send(err.message);
      }
      users = JSON.parse(data);
      updates.forEach((m) => {
        const user = users.find((u) => u.id === Number(m.id));
        console.log(user);
        user.id = m.id;
        user.gender = m.gender;
        user.name = m.name;
        user.contact = m.contact;
        user.address = m.address;
        user.photoUrl = m.photoUrl;
        fs.writeFile("users.json", JSON.stringify(users), (err) => {
          if (err) {
            res.send(err.message);
          }
        });
      });
      res.send(users);
      res.end();
    });
  } catch (err) {
    next(err);
  }
};

//get random user
const getRandomUser = async (_req, res, next) => {
  try {
    fs.readFile("users.json", (err, data) => {
      if (err) {
        res.send(err.message);
      }
      users = JSON.parse(data);
      let randomId = Math.round(Math.random() * users.length);
      let user = users.find((u) => u.id === randomId);
      res.send(user);
      res.end();
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  postUser,
  patchUser,
  deleteUser,
  bulkUpdate,
  getRandomUser,
};
