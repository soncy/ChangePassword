/*
 * Created with WebStorm.
 * @author: song.chen
 * @date: 12/16/13 10:12 PM
 * @contact: soncy1986@gmail.com
 * @fileoverview: cookie存储管理
 */
"use strict";

var cookieStore = {};
var cookieCache = [];

function set(cookie) { // cookie格式 "[ 'UserContext=23424234242; Path=/', 'Q=33242; Path=/' ]"
  cookie.forEach(function (val) {
    var cookieVal = val.split(';')[0];
    var co = cookieVal.split('=');
    cookieCache.push(cookieVal);
    val = co[1];
    if (val) {
      cookieStore[co[0]] = co[1];
    }
  });
}

function get(key) {
  return cookieStore[key] || null;
}

function getAll() {
  return cookieCache.join(';');
}

function clear() {
  cookieStore = {};
  cookieCache = [];
}

exports.set = set;
exports.get = get;
exports.getAll = getAll;
exports.clear = clear;
