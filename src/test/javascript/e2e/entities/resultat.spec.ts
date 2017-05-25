import { browser, element, by, $ } from 'protractor';

describe('Resultat e2e test', () => {

    const username = element(by.id('username'));
    const password = element(by.id('password'));
    const entityMenu = element(by.id('entity-menu'));
    const accountMenu = element(by.id('account-menu'));
    const login = element(by.id('login'));
    const logout = element(by.id('logout'));
    const code = element(by.id('field_code'));

    beforeAll(() => {
        browser.get('/');

        accountMenu.click();
        login.click();

        username.sendKeys('admin');
        password.sendKeys('admin');
        element(by.css('button[type=submit]')).click();
        browser.waitForAngular();
    });

    it('should load Resultats', () => {
        entityMenu.click();
        element.all(by.css('[routerLink="resultat"]')).first().click().then(() => {
            const expectVal = /qualiToastApp.resultat.home.title/;
            element.all(by.css('h2 span')).first().getAttribute('jhiTranslate').then((value) => {
                expect(value).toMatch(expectVal);
            });
        });
    });
    // Cancel creation resultat
    it('should load create Resultat dialog', function () {
        element(by.css('button.create-resultat')).click().then(() => {
            const expectVal = /qualiToastApp.resultat.home.createOrEditLabel/;
            element.all(by.css('h4.modal-title')).first().getAttribute('jhiTranslate').then((value) => {
                expect(value).toMatch(expectVal);
            });

            element(by.css('button.close')).click();
        });
    });

    // Create a new resultat
    it('should load create Resultat dialog', function () {
        element(by.css('button.create-resultat')).click().then(() => {
            const expectVal = /qualiToastApp.resultat.home.createOrEditLabel/;
            element.all(by.css('h4.modal-title')).first().getAttribute('jhiTranslate').then((value) => {
                expect(value).toMatch(expectVal);
            });
            code.sendKeys('resultat');
            element(by.id('resultat-dialog-component-save')).click();
        });
    });

    // Edit a resultat
    it('should search a resultat', function () {
        element(by.id('currentSearch')).sendKeys('resultat');
        element(by.id('buttonSearch')).click();
    });

    it('should edit a resultat', function () {
        element(by.id('resultat-component-edit')).click().then(() => {
            const expectVal = /qualiToastApp.resultat.home.createOrEditLabel/;
            element.all(by.css('h4.modal-title')).first().getAttribute('jhiTranslate').then((value) => {
                expect(value).toMatch(expectVal);
            });
            code.sendKeys('resultat');
            element(by.id('resultat-dialog-component-save')).click();
        });
    });

    // Delete a resultat
    it('should search a resultat', function () {
        element(by.id('currentSearch')).sendKeys('resultat');
        element(by.id('buttonSearch')).click();
    });

    it('should load delete Resultat dialog', function () {
        element(by.id('resultat-component-delete')).click().then(() => {
            const expectVal = /entity.delete.title/;
            element.all(by.css('h4.modal-title')).first().getAttribute('jhiTranslate').then((value) => {
                expect(value).toMatch(expectVal);
            });
            element(by.id('resultat-delete-dialog-component-delete')).click();
        });
    });


    afterAll(function () {
        accountMenu.click();
        logout.click();
    });
});
