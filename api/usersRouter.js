require("dotenv").config();
const express = require("express");
const usersRouter = express.Router();
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail } = require("../db/index");

usersRouter.post("/register", async (req, res, next) => {
  const { email, password, fullname } = req.body;
  try {
    const _user = await getUserByEmail(email);

    if (_user) {
      res.status(401);
      next({
        name: "UserTakenError",
        message: `User ${email} is already taken.`,
      });
    } else if (password.length < 8) {
      res.status(401);
      next({
        name: "PasswordTooShortError",
        message: "Password Too Short!",
      });
    } else {
      const user = await createUser({
        email,
        password,
        fullname,
      });

      if (!user) {
        res.status(400);
        next({
          name: "UserCreationError",
          message: "Bad Request",
        });
      } else {
        const token = jwt.sign(
          {
            id: user.id,
            username: email,
          },
          JWT_SECRET,
          {
            expiresIn: "1w",
          }
        );

        res.send({
          user,
          message: "thank you for signing up",
          token,
        });
      }
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a email and password",
    });
  }

  try {
    const user = await getUserByEmail(email);
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
      const token = jwt.sign(user, JWT_SECRET);
      res.send({ user, message: "you're logged in!", token: `${token}` });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "email or password is incorrect",
      });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/me", async (req, res, next) => {
  try {
    if (req.user) {
      res.send(req.user);
    } else {
      res.status(401).send({
        error: "401 - Unauthorized",
        message: "You must be logged in to perform this action",
        name: "UnauthorizedError",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;