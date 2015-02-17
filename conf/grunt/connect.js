'use strict';

var bayeux,
    bodyParser = require('body-parser'),
    express = require('express'),
    faye = require('faye'),
    topic = '/jsnlog';

module.exports = {
  options: {
    port: 3000,
    // Change this to '0.0.0.0' to access the server from outside.
    hostname: 'localhost'
    //livereload: 35729
  },
  dist: {
    options: {
      open: true,
      base: '<%= yeoman.dist %>/examples',
      onCreateServer: [
        function (server) {
          bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});
          bayeux.attach(server);
          console.log('faye attached to express server');
        }
      ],
      middleware: function (connect, option, middlewares) {
        // since we are unshift-ing these functions on to the front of the
        // middleware stack, we need to add them in reverse order
        middlewares.unshift(function (req, res, next) {
          if ((req.url === '/jsnlog.logger' || req.url === '/log') && req.method === 'POST') {
              if (req.body) {
                bayeux.getClient().publish(topic, {text: req.body});
              }
            res.end();
          } else {
            return next();
          }
        });
        // parse the POST body and add it to req.body
        middlewares.unshift(bodyParser.json());
        // make sure that we accept GET and POST requests
        middlewares.unshift(function(req, res, next){
          res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
          res.setHeader('Access-Control-Allow-Credentials', true);
          res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
          res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
          return next();
        });
        // return middleware
        return middlewares;
      }
    }
  },
  livereload: {
    options: {
      open: true,
      middleware: function (connect) {
        return [
          connect.static('<%= yeoman.app %>')
        ];
      }
    }
  },
  test: {
    options: {
      port: 3001,
      middleware: function (connect) {
        return [
          connect.static('test'),
          connect.static('<%= yeoman.app %>/examples')
        ];
      }
    }
  }
};
