require("dotenv").config();
/* eslint-disable no-useless-catch */
const express = require("express");
const { createUser, getUser, getUserByUsername } = require("../db/models/user");
const jwt = require("jsonwebtoken");

const { getUserByEmail } = require("../db/models/user");
const router = express.Router();

router.post("/register", async (req, res, next) => {
  const { email, username, password } = req.body;
  const isAdmin = false;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      next({
        error: "UserNameError",
        message: `User ${username} is already taken, Be Original.`,
        name: "UserNameError",
      });
    }

    const userEmail = await getUserByEmail(email);
    if (userEmail) {
      next({
        error: "EmailError",
        message: `Email ${email} is already in use, Did you Forget?`,
        name: "EmailError",
      });
    }

    const user = await createUser({ email, username, password, isAdmin });

    if (password.length < 8) {
      next({
        error: "PasswordError",
        message: "Password Too Short! Are you trying to get hacked?",
        name: "PasswordError",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      process.env.JWT_SECRET
    );

    res.send({
      message: "Thanks for signing up",
      token,
      user,
    });
  } catch ({ error, name, message }) {
    next({ error, name, message });
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a email and password, Do Better",
    });
  }
  try {
    const user = await getUserByEmail(email);
    if (user && user.password == password) {
      let token = jwt.sign(
        {
          email: user.email,
          username: user.username,
          password: user.password,
          id: user.id,
        },
        process.env.JWT_SECRET
      );

      res.send({ message: "you're logged in!", token, user });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Email or Password is incorrect, Not gonna say which Though",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/me", async (req, res, next) => {
  const user = await getUserByUsername(req.user.username);

  res.send(user);
});

module.exports = router;
