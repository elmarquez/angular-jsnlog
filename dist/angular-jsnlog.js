/* globals JL, angular */
'use strict';

/**
 * Angular JSNLog service.
 * Copyright 2012-2014 Mattijs Perdeck
 */
angular.module('jsnlog', [])
    .service('$log', function () {
        this.log = function (msg) {
            JL('Angular').trace(msg);
        };
        this.debug = function (msg) {
            JL('Angular').debug(msg);
        };
        this.info = function (msg) {
            JL('Angular').info(msg);
        };
        this.warn = function (msg) {
            JL('Angular').warn(msg);
        };
        this.error = function (msg) {
            JL('Angular').error(msg);
        };
    })
    .factory('$exceptionHandler', function () {
        return function (exception, cause) {
            JL('Angular').fatalException(cause, exception);
            throw new Error(exception.message || cause || 'Exception');
        };
    })
    .factory('logToServerInterceptor', ['$q', function ($q) {
        var myInterceptor = {
            'request': function (config) {
                config.msBeforeAjaxCall = new Date().getTime();
                return config;
            },
            'response': function (response) {
                if (response.config.warningAfter) {
                    var msAfterAjaxCall = new Date().getTime();
                    var timeTakenInMs = msAfterAjaxCall - response.config.msBeforeAjaxCall;
                    if (timeTakenInMs > response.config.warningAfter) {
                        JL('Angular.Ajax').warn({ timeTakenInMs: timeTakenInMs, config: response.config, data: response.data });
                    }
                }

                return response;
            },
            'responseError': function (rejection) {
                var errorMessage = 'timeout';
                if (rejection.status !== 0) {
                    errorMessage = rejection.data.ExceptionMessage;
                }
                JL('Angular.Ajax').fatalException({ errorMessage: errorMessage, status: rejection.status, config: rejection.config }, rejection.data);
                return $q.reject(rejection);
            }
        };
        return myInterceptor;
    }]);

///**
// * Angular JSNLog service based on https://github.com/luboid's example
// * https://github.com/mperdeck/JSNLog.AngularJS/issues/1
// */
//angular.module('jsnlog', [])
//    .config(['$provide', function ($provide) {
//        $provide.decorator('$log', ['$delegate', '$logShadowLogger', function ($delegate, $logShadowLogger) {
//            return $logShadowLogger($delegate);
//        }]);
//    }])
//    .factory('$logShadowLogger', function () {
//        return function ($delegate) {
//            return {
//                log: function () {
//                    $delegate.log.apply($delegate, arguments);
//                },
//                info: function () {
//                    $delegate.info.apply($delegate, arguments);
//                },
//                error: function () {
//                    $delegate.error.apply($delegate, arguments);
//                },
//                warn: function () {
//                    $delegate.warn.apply($delegate, arguments);
//                }
//            };
//
//        };
//    });
