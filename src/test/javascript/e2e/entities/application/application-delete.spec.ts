import { browser, element, by } from 'protractor';

describe('Application e2e test', () => {

    const username = element(by.id('username'));
    const password = element(by.id('password'));
    const entityMenu = element(by.id('entity-menu'));
    const accountMenu = element(by.id('account-menu'));
    const login = element(by.id('login'));
    const logout = element(by.id('logout'));
    /*
    const code = element(by.id('field_code'));
    const nom = element(by.id('field_nom'));
    const description = element(by.id('field_description'));
    */

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

    // Delete an application
    it('should search an application', function() {
        element(by.id('currentSearch')).clear();
        element(by.id('currentSearch')).sendKeys('application');
        element(by.id('buttonSearch')).click();
    });

    it('should load delete Application dialog', function() {
        element(by.id('application-component-delete')).click().then(() => {
            const expectVal = /entity.delete.title/;
            element.all(by.css('h4.modal-title')).first().getAttribute('jhiTranslate').then((value) => {
                expect(value).toMatch(expectVal);
            });
            element(by.id('application-delete-dialog-component-delete')).click();
        });
    });

    afterAll(function() {
        accountMenu.click();
        logout.click();
    });
});
