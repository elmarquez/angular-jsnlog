'use strict';

/**
 * Example application.
 */
angular
    .module('example', [ 'jsnlog' ])

    // catch all AJAX call errors
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('logToServerInterceptor');
    }]);