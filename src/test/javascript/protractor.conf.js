const HtmlScreenshotReporter = require("protractor-jasmine2-screenshot-reporter");
const JasmineReporters = require('jasmine-reporters');

exports.config = {
    allScriptsTimeout: 20000,

    specs: [
        './e2e/account/*.spec.ts',
        './e2e/admin/*.spec.ts',
        './e2e/dashboard/dashboard.spec.ts',

        './e2e/entities/type-test/typetest-add-edit.spec.ts',
        './e2e/entities/resultat/resultat-add-edit.spec.ts',
        './e2e/entities/testeur/testeur-add-edit.spec.ts',
        './e2e/entities/application/application-add-edit.spec.ts',

        './e2e/entities/application/application-delete.spec.ts',
        './e2e/entities/testeur/testeur-delete.spec.ts',
        './e2e/entities/type-test/typetest-delete.spec.ts',
        './e2e/entities/resultat/resultat-delete.spec.ts',
    ],

    capabilities: {
        'browserName': 'chrome',
        'phantomjs.binary.path': require('phantomjs-prebuilt').path,
        'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
    },

    directConnect: true,

    baseUrl: 'http://localhost:8080/',

    framework: 'jasmine2',

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 60000
    },

    beforeLaunch: function() {
        require('ts-node').register({
            project: ''
        });
    },

    onPrepare: function() {
        browser.driver.manage().window().setSize(1280, 1024);
        jasmine.getEnv().addReporter(new JasmineReporters.JUnitXmlReporter({
            savePath: 'target/reports/e2e',
            consolidateAll: false
        }));
        jasmine.getEnv().addReporter(new HtmlScreenshotReporter({
            dest: "target/reports/e2e/screenshots"
        }));
    },

    useAllAngular2AppRoots: true
};
