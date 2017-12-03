import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Testeur e2e test', () => {

    let navBarPage: NavBarPage;
    let testeurDialogPage: TesteurDialogPage;
    let testeurComponentsPage: TesteurComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);


    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Testeurs', () => {
        navBarPage.goToEntity('testeur');
        testeurComponentsPage = new TesteurComponentsPage();
        expect(testeurComponentsPage.getTitle()).toMatch(/qualiToastApp.testeur.home.title/);

    });

    it('should load create Testeur dialog', () => {
        testeurComponentsPage.clickOnCreateButton();
        testeurDialogPage = new TesteurDialogPage();
        expect(testeurDialogPage.getModalTitle()).toMatch(/qualiToastApp.testeur.home.createOrEditLabel/);
        testeurDialogPage.close();
    });

    it('should create and save Testeurs', () => {
        testeurComponentsPage.clickOnCreateButton();
        testeurDialogPage.setIdentifiantInput('identifiant');
        expect(testeurDialogPage.getIdentifiantInput()).toMatch('identifiant');
        testeurDialogPage.setNomInput('nom');
        expect(testeurDialogPage.getNomInput()).toMatch('nom');
        testeurDialogPage.setPrenomInput('prenom');
        expect(testeurDialogPage.getPrenomInput()).toMatch('prenom');
        testeurDialogPage.typetestSelectLastOption();
        testeurDialogPage.save();
        expect(testeurDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TesteurComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-testeur div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TesteurDialogPage {
    modalTitle = element(by.css('h4#myTesteurLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    identifiantInput = element(by.css('input#field_identifiant'));
    nomInput = element(by.css('input#field_nom'));
    prenomInput = element(by.css('input#field_prenom'));
    typetestSelect = element(by.css('select#field_typetest'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setIdentifiantInput = function (identifiant) {
        this.identifiantInput.sendKeys(identifiant);
    }

    getIdentifiantInput = function () {
        return this.identifiantInput.getAttribute('value');
    }

    setNomInput = function (nom) {
        this.nomInput.sendKeys(nom);
    }

    getNomInput = function () {
        return this.nomInput.getAttribute('value');
    }

    setPrenomInput = function (prenom) {
        this.prenomInput.sendKeys(prenom);
    }

    getPrenomInput = function () {
        return this.prenomInput.getAttribute('value');
    }

    typetestSelectLastOption = function () {
        this.typetestSelect.all(by.tagName('option')).last().click();
    }

    typetestSelectOption = function (option) {
        this.typetestSelect.sendKeys(option);
    }

    getTypetestSelect = function () {
        return this.typetestSelect;
    }

    getTypetestSelectedOption = function () {
        return this.typetestSelect.element(by.css('option:checked')).getText();
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
