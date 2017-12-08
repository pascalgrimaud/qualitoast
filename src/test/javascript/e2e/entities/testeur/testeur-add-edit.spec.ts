import { browser, element, by } from 'protractor';

describe('Testeur e2e test', () => {

    const username = element(by.id('username'));
    const password = element(by.id('password'));
    const entityMenu = element(by.id('entity-menu'));
    const accountMenu = element(by.id('account-menu'));
    const login = element(by.id('login'));
    const logout = element(by.id('logout'));
    const identifiant = element(by.id('field_identifiant'));
    const nom = element(by.id('field_nom'));
    const prenom = element(by.id('field_prenom'));
    const typetest = element(by.id('field_typetest'));

    beforeAll(() => {
        browser.get('/');

        accountMenu.click();
        login.click();

        username.sendKeys('admin');
        password.sendKeys('admin');
        element(by.css('button[type=submit]')).click();
        browser.waitForAngular();
    });

    it('should load Testeurs', () => {
        entityMenu.click();
        element.all(by.css('[routerLink="testeur"]')).first().click().then(() => {
            const expectVal = /qualiToastApp.testeur.home.title/;
            element.all(by.css('h2 span')).first().getAttribute('jhiTranslate').then((value) => {
                expect(value).toMatch(expectVal);
            });
        });
    });

    // Cancel creation
    it('should load create Testeur dialog', function() {
        element(by.css('button.create-testeur')).click().then(() => {
            const expectVal = /qualiToastApp.testeur.home.createOrEditLabel/;
            element.all(by.css('h4.modal-title')).first().getAttribute('jhiTranslate').then((value) => {
                expect(value).toMatch(expectVal);
            });

            element(by.css('button.close')).click();
        });
    });

    // Create a new testeur
    it('should load create Testeur dialog', function() {
        element(by.css('button.create-testeur')).click().then(() => {
            const expectVal = /qualiToastApp.testeur.home.createOrEditLabel/;
            element.all(by.css('h4.modal-title')).first().getAttribute('jhiTranslate').then((value) => {
                expect(value).toMatch(expectVal);
            });
            identifiant.sendKeys('111111');
            nom.sendKeys('testeur');
            prenom.sendKeys('prenom');
            typetest.sendKeys('fonc');
            element(by.id('testeur-dialog-component-save')).click();
        });
    });

    // Edit a testeur
    it('should search a testeur', function() {
        element(by.id('currentSearch')).clear();
        element(by.id('currentSearch')).sendKeys('testeur');
        element(by.id('buttonSearch')).click();
    });

    it('should edit a testeur', function() {
        element(by.id('testeur-component-edit')).click().then(() => {
            const expectVal = /qualiToastApp.testeur.home.createOrEditLabel/;
            element.all(by.css('h4.modal-title')).first().getAttribute('jhiTranslate').then((value) => {
                expect(value).toMatch(expectVal);
            });
            identifiant.clear();
            identifiant.sendKeys('111112');
            nom.clear();
            nom.sendKeys('nom testeur');
            prenom.clear();
            prenom.sendKeys('prenom testeur');
            typetest.sendKeys('fonc');
            element(by.id('testeur-dialog-component-save')).click();
        });
    });

    afterAll(function() {
        accountMenu.click();
        logout.click();
    });
});
