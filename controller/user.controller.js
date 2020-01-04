const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const secretKey = config.get("secretkey");

exports.registerUser = (req, res) => {
  const { name, password, email } = req.body;
  if (!email || !name || !password)
    return res.status(400).json("Please Enter All Fields");
  const newUser = new User({
    name,
    email,
    password
  });
  User.findOne({ email }, (err, email) => {
    if (err) return res.status(400).json({ msg: err });

    if (email) return res.status(400).json({ msg: "Email Already Exists" });

    bcrypt.genSalt(10, (err, salt) => {
      try {
        if (err) throw err;
        bcrypt
          .hash(newUser.password, salt)
          .then(hash => {
            newUser.password = hash;
            newUser.save().then(user => {
              jwt.sign(
                { id: user._id },
                secretKey,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err)
                    return res
                      .status(400)
                      .json({ msg: "Cannot sign user token" });

                  res.json({
                    token,
                    user: {
                      name: user.name,
                      id: user._id,
                      email: user.email
                    }
                  });
                }
              );
            });
          })
          .catch(err =>
            res.status(400).json({ msg: "error registering user" })
          );
      } catch (err) {
        res.status(400).json({ msg: err });
      }
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json("Please Enter All Fields");

  User.findOne({ email }, (err, user) => {
    if (err) return res.status(400).json({ msg: "Invalid Credentials" });
    if (!user) return res.status(400).json({ msg: "User Does Not Exist" });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(400).json({ msg: "Error matching password" });
      if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

      jwt.sign(
        { id: user._id },
        secretKey,
        { expiresIn: 3600 },
        (err, token) => {
          if (err)
            return res.status(400).json({ msg: "Cannot sign user token" });

          res.json({
            token,
            user: {
              name: user.name,
              id: user._id,
              email: user.email
            }
          });
        }
      );
    });
  });
};

exports.getUser = (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user))
    .catch(err => res.status(400).json({ msg: err }));
};
