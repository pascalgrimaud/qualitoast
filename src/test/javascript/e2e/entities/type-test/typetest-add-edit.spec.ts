import { browser, element, by, $ } from 'protractor';

describe('TypeTest e2e test', () => {

    const username = element(by.id('username'));
    const password = element(by.id('password'));
    const entityMenu = element(by.id('entity-menu'));
    const accountMenu = element(by.id('account-menu'));
    const login = element(by.id('login'));
    const logout = element(by.id('logout'));
    const code = element(by.id('field_code'));
    const nom = element(by.id('field_nom'));

    beforeAll(() => {
        browser.get('/');

        accountMenu.click();
        login.click();

        username.sendKeys('admin');
        password.sendKeys('admin');
        element(by.css('button[type=submit]')).click();
        browser.waitForAngular();
    });

    it('should load TypeTests', () => {
        entityMenu.click();
        element.all(by.css('[routerLink="type-test"]')).first().click().then(() => {
            const expectVal = /qualiToastApp.typeTest.home.title/;
            element.all(by.css('h2 span')).first().getAttribute('jhiTranslate').then((value) => {
                expect(value).toMatch(expectVal);
            });
        });
    });

    it('should load create TypeTest dialog', function () {
        element(by.css('button.create-type-test')).click().then(() => {
            const expectVal = /qualiToastApp.typeTest.home.createOrEditLabel/;
            element.all(by.css('h4.modal-title')).first().getAttribute('jhiTranslate').then((value) => {
                expect(value).toMatch(expectVal);
            });

            element(by.css('button.close')).click();
        });
    });

    // Create a new type test
    it('should load create Type-test dialog', function () {
        element(by.css('button.create-type-test')).click().then(() => {
            const expectVal = /qualiToastApp.typeTest.home.createOrEditLabel/;
            element.all(by.css('h4.modal-title')).first().getAttribute('jhiTranslate').then((value) => {
                expect(value).toMatch(expectVal);
            });
            code.sendKeys('fonc');
            nom.sendKeys('type-test');
            element(by.id('type-test-dialog-component-save')).click();
        });
    });

    // Edit a type-test
    it('should search a type-test', function () {
        element(by.id('currentSearch')).clear();
        element(by.id('currentSearch')).sendKeys('type-test');
        element(by.id('buttonSearch')).click();
    });

    it('should edit a type-test', function () {
        element(by.id('type-test-component-edit')).click().then(() => {
            const expectVal = /qualiToastApp.typeTest.home.createOrEditLabel/;
            element.all(by.css('h4.modal-title')).first().getAttribute('jhiTranslate').then((value) => {
                expect(value).toMatch(expectVal);
            });
            code.clear();
            code.sendKeys('fonc');
            nom.clear();
            nom.sendKeys('nom type-test');
            element(by.id('type-test-dialog-component-save')).click();
        });
    });

    afterAll(function () {
        accountMenu.click();
        logout.click();
    });
});
