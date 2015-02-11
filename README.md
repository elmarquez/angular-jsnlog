Angular JSNLog
==============

Client logging library and drop-in replace for Angular's $log service. A packaged
implementation of Mattijs Perdeck's Angular/JSNLog example.


Installation
------------

Use Bower to automatically install the library and its dependencies in your project:

    bower install -S angular-jsnlog


Dependencies
------------

The library has the following runtime dependencies:

 * Angular.js
 * JSNLog

To compile the library from sources, you will require the following dependencies:

 * Nodejs
 * Bower
 * Grunt

Install all build and run time dependencies as follows:

    npm install; bower install

Run `grunt` at the console to see the list of build commands.


Usage
-----

In your HTML, add a reference to JSNLog and the angular-jsnlog library:

    <script type="text/javascript" src="path/to/jsnlog/jsnlog.js"></script>
    <script type="text/javascript" src="path/to/angular/angular.min.js"></script>
    <script type="text/javascript" src="path/to/angular-jsnlog/dist/angular-jsnlog.js"></script>

In your Angular application file, configure and initialize JSNLog as follows:

    TBD

Please read the Angular/JSNLog documentation on the JSNLog web site:

    http://jsnlog.com/Documentation/GetStartedLogging/AngularJsErrorHandling


License
-------

Please see the LICENSE file for licensing and copyright information.

