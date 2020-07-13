#!/usr/bin/env node
const mdLinks = require("./index.js");
const path = require("path");
const pathFile = path.resolve(process.argv[2]);
const array = process.argv[3];

mdLinks(pathFile, option)
  .then((result) => result.forEach((i) => {
    if (array) {
      console.log(i.href, i.txt, i.status);
    } else {
      console.log(i.href, i.txt);
    };
  }))
  .catch((reject) => console.log(reject));