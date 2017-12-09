import { browser, element, by } from 'protractor';

describe('Application e2e test', () => {

    const username = element(by.id('username'));
    const password = element(by.id('password'));
    const entityMenu = element(by.id('entity-menu'));
    const accountMenu = element(by.id('account-menu'));
    const login = element(by.id('login'));
    const logout = element(by.id('logout'));
    const code = element(by.id('field_code'));
    const nom = element(by.id('field_nom'));
    const description = element(by.id('field_description'));

    beforeAll(() => {
        browser.get('/');

        accountMenu.click();
        login.click();

        username.sendKeys('admin');
        password.sendKeys('admin');
        element(by.css('button[type=submit]')).click();
        browser.waitForAngular();
    });

    it('should load Applications', () => {
        entityMenu.click();
        element.all(by.css('[routerLink="application"]')).first().click().then(() => {
            const expectVal = /qualiToastApp.application.home.title/;
            element.all(by.css('h2 span')).first().getAttribute('jhiTranslate').then((value) => {
                expect(value).toMatch(expectVal);
            });
        });
    });

    // Cancel creation application
    it('should load create Application dialog', function() {
        element(by.css('button.create-application')).click().then(() => {
            const expectVal = /qualiToastApp.application.home.createOrEditLabel/;
            element.all(by.css('h4.modal-title')).first().getAttribute('jhiTranslate').then((value) => {
                expect(value).toMatch(expectVal);
            });

            element(by.css('button.close')).click();
        });
    });

    // create a new application
    it('should load create Application dialog', function() {
        element(by.css('button.create-application')).click().then(() => {
            const expectVal = /qualiToastApp.application.home.createOrEditLabel/;
            element.all(by.css('h4.modal-title')).first().getAttribute('jhiTranslate').then((value) => {
                expect(value).toMatch(expectVal);
            });
            code.sendKeys('app');
            nom.sendKeys('application');
            description.sendKeys('description application');
            element(by.id('application-dialog-component-save')).click();
        });
    });

    // Edit an application
    it('should search an application', function() {
        element(by.id('currentSearch')).sendKeys('application');
        element(by.id('buttonSearch')).click();
    });

    it('should load Application dialog', function() {
        element(by.id('application-component-edit')).click().then(() => {
            const expectVal = /qualiToastApp.application.home.createOrEditLabel/;
            element.all(by.css('h4.modal-title')).first().getAttribute('jhiTranslate').then((value) => {
                expect(value).toMatch(expectVal);
            });
            code.clear();
            code.sendKeys('appe');
            nom.clear();
            nom.sendKeys('application');
            description.sendKeys('description application edit');
            element(by.id('application-dialog-component-save')).click();
        });
    });

    afterAll(function() {
        accountMenu.click();
        logout.click();
    });
});
