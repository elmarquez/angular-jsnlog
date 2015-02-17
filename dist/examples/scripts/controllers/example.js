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
         * Log an AJAX message.
         */
        $scope.ajax = function () {
            $scope.log.push('AJAX - Message');
        };

        /**
         * Log a debug message.
         */
        $scope.debug = function () {
            $log.debug('A DEBUG message');
        };

        /**
         * Log an error message.
         */
        $scope.error = function () {
            try {
                var x = 1 / 0;
            } catch (err) {
                $log.error(err);
            }
        };

        /**
         * Log an info message.
         */
        $scope.info = function () {
            $log.info('An INFO message');
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
        };

    }
]);