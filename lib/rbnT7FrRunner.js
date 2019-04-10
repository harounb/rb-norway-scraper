"use strict";

const { download } = require("./rbnT7Fr");

const config = {
  limit: 1
};

download(config).then(console.log);
