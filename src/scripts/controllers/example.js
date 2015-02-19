/* globals Faye */
/* jshint unused:false */
'use strict';

/**
 * Example controller.
 */
angular
    .module('example')
    .controller('ExampleCtrl', ['$http', '$location', '$log', '$q', '$scope',
        function ($http, $location, $log, $q, $scope) {

            // channel
            $scope.channel = null;

            // pubsub client
            $scope.client = null;

            // pubsub service
            $scope.faye = $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/faye';

            // log size limit
            $scope.limit = 10000;

            // log messages
            $scope.log = [ 'What your server receives ...' ];

            // time in milliseconds between refreshes
            $scope.period = 1000;

            // channel topic
            $scope.topic = '/jsnlog';

            ///////////////////////////////////////////////////////////////////////

            /**
             * Log an AJAX error message.
             */
            $scope.ajax = function () {
                var url = '/path/does/not/exist';
                $http.get(url)
                    .success(function() {
                        $log.debug('Hmm ... that shouldn\'t have worked');
                    })
                    .error(function(err) {
                        $log.error(err);
                    });
            };

            /**
             * Log a debug message.
             */
            $scope.debug = function () {
                $log.debug('DEBUG message');
            };

            /**
             * Log an error message.
             */
            $scope.error = function () {
                try {
                    throw new Error('An error occurred. Take a look at the stacktrace for information.');
                } catch (err) {
                    $log.error('ERROR message');
                }
            };

            /**
             * Log an info message.
             */
            $scope.info = function () {
                $log.info('INFO message');
            };

            /**
             * Initialize the controller
             */
            $scope.init = function () {
                $log.info('Example controller started');
                // connect to pubsub
                $scope.client = new Faye.Client($scope.faye, { retry: 5, timeout: 120 });
                $scope.client.disable('websocket');
                $scope.channel = $scope.client
                    .subscribe($scope.topic, $scope.update)
                    .then(function() {
                        $log.info('Listening on ' + $scope.topic + ' channel');
                        $scope.$apply();
                    });
                // periodically generate a logging message
            };

            /**
             * Update the log display when a message is received on the channel.
             * @param {String} message Message
             */
            $scope.update = function (message) {
                $scope.log.push(message);
                if ($scope.log.length > $scope.limit) {
                    $scope.limit.splice(0, $scope.log.length - $scope.limit);
                }
                $scope.$apply();
            };

            /**
             * Generate a WARN message.
             */
            $scope.warn = function () {
                $log.warn('WARN message');
            };

    }
]);