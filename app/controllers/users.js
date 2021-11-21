const express = require('express');

const { User } = require('@@db');

const UsersAPI = express();

UsersAPI.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// TODO : another parts of REST API

module.exports = UsersAPI;
