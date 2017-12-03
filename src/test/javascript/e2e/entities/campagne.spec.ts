import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Campagne e2e test', () => {

    let navBarPage: NavBarPage;
    let campagneDialogPage: CampagneDialogPage;
    let campagneComponentsPage: CampagneComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);


    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Campagnes', () => {
        navBarPage.goToEntity('campagne');
        campagneComponentsPage = new CampagneComponentsPage();
        expect(campagneComponentsPage.getTitle()).toMatch(/qualiToastApp.campagne.home.title/);

    });

    it('should load create Campagne dialog', () => {
        campagneComponentsPage.clickOnCreateButton();
        campagneDialogPage = new CampagneDialogPage();
        expect(campagneDialogPage.getModalTitle()).toMatch(/qualiToastApp.campagne.home.createOrEditLabel/);
        campagneDialogPage.close();
    });

    it('should create and save Campagnes', () => {
        campagneComponentsPage.clickOnCreateButton();

        campagneDialogPage.applicationSelectLastOption();

        campagneDialogPage.setVersionInput('version');
        expect(campagneDialogPage.getVersionInput()).toMatch('version');

        campagneDialogPage.typetestSelectLastOption();
        campagneDialogPage.resultatSelectLastOption();

        campagneDialogPage.setDatedebutInput('2017-12-31');
        expect(campagneDialogPage.getDatedebutInput()).toMatch('2017-12-31');
        campagneDialogPage.setDatefinInput('2018-12-31');
        expect(campagneDialogPage.getDatefinInput()).toMatch('2018-12-31');

        campagneDialogPage.setBloquantInput('5');
        expect(campagneDialogPage.getBloquantInput()).toMatch('5');
        campagneDialogPage.setMajeurInput('5');
        expect(campagneDialogPage.getMajeurInput()).toMatch('5');
        campagneDialogPage.setMineurInput('5');
        expect(campagneDialogPage.getMineurInput()).toMatch('5');
        campagneDialogPage.setEvolutionInput('5');
        expect(campagneDialogPage.getEvolutionInput()).toMatch('5');
        campagneDialogPage.getTermineInput().isSelected().then(function (selected) {
            if (selected) {
                campagneDialogPage.getTermineInput().click();
                expect(campagneDialogPage.getTermineInput().isSelected()).toBeFalsy();
            } else {
                campagneDialogPage.getTermineInput().click();
                expect(campagneDialogPage.getTermineInput().isSelected()).toBeTruthy();
            }
        });

        campagneDialogPage.testeurSelectLastOption();

        campagneDialogPage.setCommentaireInput('commentaire');
        expect(campagneDialogPage.getCommentaireInput()).toMatch('commentaire');

        campagneDialogPage.save();
        expect(campagneDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CampagneComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-campagne div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CampagneDialogPage {
    modalTitle = element(by.css('h4#myCampagneLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    versionInput = element(by.css('input#field_version'));
    datedebutInput = element(by.css('input#field_datedebut'));
    datefinInput = element(by.css('input#field_datefin'));
    commentaireInput = element(by.css('textarea#field_commentaire'));
    bloquantInput = element(by.css('input#field_bloquant'));
    majeurInput = element(by.css('input#field_majeur'));
    mineurInput = element(by.css('input#field_mineur'));
    evolutionInput = element(by.css('input#field_evolution'));
    termineInput = element(by.css('input#field_termine'));
    applicationSelect = element(by.css('select#field_application'));
    typetestSelect = element(by.css('select#field_typetest'));
    resultatSelect = element(by.css('select#field_resultat'));
    testeurSelect = element(by.css('select#field_testeur'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setVersionInput = function (version) {
        this.versionInput.sendKeys(version);
    }

    getVersionInput = function () {
        return this.versionInput.getAttribute('value');
    }

    setDatedebutInput = function (datedebut) {
        this.datedebutInput.sendKeys(datedebut);
    }

    getDatedebutInput = function () {
        return this.datedebutInput.getAttribute('value');
    }

    setDatefinInput = function (datefin) {
        this.datefinInput.sendKeys(datefin);
    }

    getDatefinInput = function () {
        return this.datefinInput.getAttribute('value');
    }

    setCommentaireInput = function (commentaire) {
        this.commentaireInput.sendKeys(commentaire);
    }

    getCommentaireInput = function () {
        return this.commentaireInput.getAttribute('value');
    }

    setBloquantInput = function (bloquant) {
        this.bloquantInput.sendKeys(bloquant);
    }

    getBloquantInput = function () {
        return this.bloquantInput.getAttribute('value');
    }

    setMajeurInput = function (majeur) {
        this.majeurInput.sendKeys(majeur);
    }

    getMajeurInput = function () {
        return this.majeurInput.getAttribute('value');
    }

    setMineurInput = function (mineur) {
        this.mineurInput.sendKeys(mineur);
    }

    getMineurInput = function () {
        return this.mineurInput.getAttribute('value');
    }

    setEvolutionInput = function (evolution) {
        this.evolutionInput.sendKeys(evolution);
    }

    getEvolutionInput = function () {
        return this.evolutionInput.getAttribute('value');
    }

    getTermineInput = function () {
        return this.termineInput;
    }
    applicationSelectLastOption = function () {
        this.applicationSelect.all(by.tagName('option')).last().click();
    }

    applicationSelectOption = function (option) {
        this.applicationSelect.sendKeys(option);
    }

    getApplicationSelect = function () {
        return this.applicationSelect;
    }

    getApplicationSelectedOption = function () {
        return this.applicationSelect.element(by.css('option:checked')).getText();
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

    resultatSelectLastOption = function () {
        this.resultatSelect.all(by.tagName('option')).last().click();
    }

    resultatSelectOption = function (option) {
        this.resultatSelect.sendKeys(option);
    }

    getResultatSelect = function () {
        return this.resultatSelect;
    }

    getResultatSelectedOption = function () {
        return this.resultatSelect.element(by.css('option:checked')).getText();
    }

    testeurSelectLastOption = function () {
        this.testeurSelect.all(by.tagName('option')).last().click();
    }

    testeurSelectOption = function (option) {
        this.testeurSelect.sendKeys(option);
    }

    getTesteurSelect = function () {
        return this.testeurSelect;
    }

    getTesteurSelectedOption = function () {
        return this.testeurSelect.element(by.css('option:checked')).getText();
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
