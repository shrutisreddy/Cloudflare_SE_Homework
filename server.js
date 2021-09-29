"use strict";
var express = require("express");
var app = express();

const path = require("path");
const { request } = require("http");
const { type } = require("os");
var p = path.join(__dirname, "game");
app.use(express.static(p));

/*
app.get("/", function (req, res) {
  console.log(req);
  res.send("Hello World!");
});
*/
const newLocationHost = "developers.cloudflare.com";

app.on(`getRequestHeaders`, (req, res) => {
  // let reqUA = req.header("user-agent");
  // if (reqUA.match("curl") != null) {
  //   let newLocation = "https://" + newLocationHost + "/workers/about";
  //  return res.redirect(302, newLocation);
  // }
  let headerString = JSON.stringify(req.headers);
  let formattedHeaderString = headerString.split(",").join("<br/>");
  return res.send("HTTP Request headers: " + formattedHeaderString);
});

app.get("/getheaders", function (req, res) {
  app.emit(`getRequestHeaders`, req, res);
  //res.send(req.headers);
});

app.get("/secure", function (req, res) {
  res.send("Hello World!");
});

var server = app.listen(8080);
