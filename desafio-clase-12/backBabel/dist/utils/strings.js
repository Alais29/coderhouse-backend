"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmail = exports.isUrl = void 0;

var isUrl = function isUrl(string) {
  var regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)/gm;
  return regex.test(string);
};

exports.isUrl = isUrl;

var isEmail = function isEmail(string) {
  var regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm;
  return regex.test(string);
};

exports.isEmail = isEmail;