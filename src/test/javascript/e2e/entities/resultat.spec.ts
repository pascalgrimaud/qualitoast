import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Resultat e2e test', () => {

    let navBarPage: NavBarPage;
    let resultatDialogPage: ResultatDialogPage;
    let resultatComponentsPage: ResultatComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Resultats', () => {
        navBarPage.goToEntity('resultat');
        resultatComponentsPage = new ResultatComponentsPage();
        expect(resultatComponentsPage.getTitle()).toMatch(/qualiToastApp.resultat.home.title/);

    });

    it('should load create Resultat dialog', () => {
        resultatComponentsPage.clickOnCreateButton();
        resultatDialogPage = new ResultatDialogPage();
        expect(resultatDialogPage.getModalTitle()).toMatch(/qualiToastApp.resultat.home.createOrEditLabel/);
        resultatDialogPage.close();
    });

    it('should create and save Resultats', () => {
        resultatComponentsPage.clickOnCreateButton();
        resultatDialogPage.setCodeInput('code');
        expect(resultatDialogPage.getCodeInput()).toMatch('code');
        resultatDialogPage.save();
        expect(resultatDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ResultatComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-resultat div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ResultatDialogPage {
    modalTitle = element(by.css('h4#myResultatLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    codeInput = element(by.css('input#field_code'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCodeInput = function(code) {
        this.codeInput.sendKeys(code);
    }

    getCodeInput = function() {
        return this.codeInput.getAttribute('value');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
