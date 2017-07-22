import { browser, element, by, $ } from 'protractor';

describe('Resultat e2e test (delete)', () => {

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

    // Delete a resultat
    it('should search a resultat', function() {
        element(by.id('currentSearch')).clear();
        element(by.id('currentSearch')).sendKeys('resultat');
        element(by.id('buttonSearch')).click();
    });

    it('should load delete Resultat dialog', function() {
        element(by.id('resultat-component-delete')).click().then(() => {
            const expectVal = /entity.delete.title/;
            element.all(by.css('h4.modal-title')).first().getAttribute('jhiTranslate').then((value) => {
                expect(value).toMatch(expectVal);
            });
            element(by.id('resultat-delete-dialog-component-delete')).click();
        });
    });

    afterAll(function() {
        accountMenu.click();
        logout.click();
    });
});
