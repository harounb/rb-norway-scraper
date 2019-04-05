"use strict";

const pLimit = require("p-limit");
const { download } = require("./rbnT7Fr");

const limit = pLimit(1);
download(limit);
