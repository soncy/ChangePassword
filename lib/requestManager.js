/*
 * Created with WebStorm.
 * @author: song.chen
 * @date: 12/16/13 10:13 PM
 * @contact: song.chen@qunar.com
 * @fileoverview: 请求管理
 */
"use strict";

var url = require('url');

var HEADER = {
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Connection": "keep-alive",
  "User-Agent": 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:25.0) Gecko/20100101 Firefox/25.0'
};

function merge(a, b) {
  for (var k in b) {
    if (b.hasOwnProperty(k)) {
      a[k] = b[k];
    }
  }
  return a;
}

exports.go = function (method, urlString, params, headers, callback) {
  var urlObj = url.parse(urlString);
  var protocol = urlObj.protocol.replace(':', '');
  var port = protocol === 'https' ? 443 : 80;
  var options = {
    hostname: urlObj.hostname,
    port: port,
    path: urlObj.path,
    rejectUnauthorized: false,
    method: method,
    headers: merge(headers, HEADER)
  };

  protocol = require(protocol);
  var req = protocol.request(options,function (res) {
    var content = '';
    res.on('data', function (d) {
      content += d;
    });
    res.on('end', function () {
      callback(res, content);
    });
  }).on('error', function (err) {
      console.log(err);
    });

  if (params) req.write(params + '\n');
  req.end();
  return req;
};