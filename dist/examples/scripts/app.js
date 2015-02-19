/* globals JL, angular */
'use strict';

/**
 * An example application to demonstrate logging with JSNLog. The application
 * will send log messages from the browser to the remote logging server. The
 * application then polls the remote logging service displays the message log
 * on the right hand side of the screen.
 */
angular
    .module('example', ['jsnlog', 'uuid4'])
    .config(['$httpProvider', function($httpProvider) {
        // Catch all logging output from $http and send it to JSNLog.
        $httpProvider.interceptors.push('logToServerInterceptor');
    }])
    //.config(['$provide', function ($provide) {
    //    // Decorate the $log service with our shadowLogger. The shadowLogger
    //    // uses JSNLog to send a copy of the $log output to the remote server.
    //    $provide.decorator('$log', function ($delegate, shadowLogger) {
    //        return shadowLogger($delegate);
    //    });
    //}])
    .run(['$log', 'uuid4', function ($log, uuid4) {
        // configure JSNLog
        JL.setOptions({
            // the end point that will receive the log messages
            defaultAjaxUrl: '/log',
            // a unique identifier for the client session
            requestId: uuid4.generate()
        });
        $log.info('angular-jsnlog example application started.');
    }]);
