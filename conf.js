const XrayReporter = require('protractor-xray-reporter');
 
// Jasmine does not support promises for reporters, but protractor does for
// onPrepare and onComplete. We can use that to make the reporter async as
// well. Generate two promises on onPrepare and add them as arguments to the
// reporter.
let onPrepareDefer;
let onCompleteDefer;
exports.config = {
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['todo-spec.js'],
    'framework': 'jasmine2',
    'directConnect': true,
    'capabilities': {
        // the name is what the test set will be called. Default is 'no name'
        'name': 'Google Chrome',
        'browserName': 'chrome'
    },
    'onPrepare': function() {
 
        // first promise is to make sure we get the test set name before the tests start.
        onPrepareDefer = protractor.promise.defer();
        // second promise is to make sure everything is done before protractor
        // quits
        onCompleteDefer = protractor.promise.defer();
 
        const options = {
            'screenshot': 'fail',
            'version': '1.0',
            'jiraUser': 'sm507198@gmail.com',
            'jiraPassword': 'w1nOusgFl3EmYRfQM8Vh3340',
            'xrayUrl': 'https://saivamgroup.atlassian.net/rest/raven/1.0/import/execution'
        };
 
        // add the reporter
        jasmine.getEnv().addReporter(XrayReporter(options, onPrepareDefer, onCompleteDefer, browser));
 
        // return the promises for onPrepare..
        return onPrepareDefer.promise;
    },
    'onComplete': function() {
        // ..and onComplete
        return onCompleteDefer.promise;
    }
  };