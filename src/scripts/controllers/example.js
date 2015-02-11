/* jshint unused:false */
'use strict';

/**
 * Example controller.
 */
angular
    .module('example')
    .controller('ExampleCtrl', ['$scope', '$log', function ($scope, $log) {

        // log messages
        $scope.log = [ 'What your server receives ...'];

        //-------------------------------------------------------------------------

        $scope.ajax = function () {
            $scope.log.push('AJAX - Message');
        };

        $scope.debug = function () {
            $scope.log.push('DEBUG - Message');
        };

        $scope.error = function () {
            $scope.log.push('ERROR - Message');
        };

        $scope.info = function () {
            $scope.log.push('INFO - Message');
        };

        /**
         * Initialize the controller
         */
        $scope.init = function () {
            $log.info('Example controller started');
        };

    }
    ]);