import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('TypeTest e2e test', () => {

    let navBarPage: NavBarPage;
    let typeTestDialogPage: TypeTestDialogPage;
    let typeTestComponentsPage: TypeTestComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load TypeTests', () => {
        navBarPage.goToEntity('type-test');
        typeTestComponentsPage = new TypeTestComponentsPage();
        expect(typeTestComponentsPage.getTitle()).toMatch(/qualiToastApp.typeTest.home.title/);

    });

    it('should load create TypeTest dialog', () => {
        typeTestComponentsPage.clickOnCreateButton();
        typeTestDialogPage = new TypeTestDialogPage();
        expect(typeTestDialogPage.getModalTitle()).toMatch(/qualiToastApp.typeTest.home.createOrEditLabel/);
        typeTestDialogPage.close();
    });

    it('should create and save TypeTests', () => {
        typeTestComponentsPage.clickOnCreateButton();
        typeTestDialogPage.setCodeInput('code');
        expect(typeTestDialogPage.getCodeInput()).toMatch('code');
        typeTestDialogPage.setNomInput('nom');
        expect(typeTestDialogPage.getNomInput()).toMatch('nom');
        typeTestDialogPage.save();
        expect(typeTestDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TypeTestComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-type-test div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TypeTestDialogPage {
    modalTitle = element(by.css('h4#myTypeTestLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    codeInput = element(by.css('input#field_code'));
    nomInput = element(by.css('input#field_nom'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCodeInput = function (code) {
        this.codeInput.sendKeys(code);
    }

    getCodeInput = function () {
        return this.codeInput.getAttribute('value');
    }

    setNomInput = function (nom) {
        this.nomInput.sendKeys(nom);
    }

    getNomInput = function () {
        return this.nomInput.getAttribute('value');
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
