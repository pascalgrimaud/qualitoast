import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Application e2e test', () => {

    let navBarPage: NavBarPage;
    let applicationDialogPage: ApplicationDialogPage;
    let applicationComponentsPage: ApplicationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Applications', () => {
        navBarPage.goToEntity('application');
        applicationComponentsPage = new ApplicationComponentsPage();
        expect(applicationComponentsPage.getTitle()).toMatch(/qualiToastApp.application.home.title/);

    });

    it('should load create Application dialog', () => {
        applicationComponentsPage.clickOnCreateButton();
        applicationDialogPage = new ApplicationDialogPage();
        expect(applicationDialogPage.getModalTitle()).toMatch(/qualiToastApp.application.home.createOrEditLabel/);
        applicationDialogPage.close();
    });

    it('should create and save Applications', () => {
        applicationComponentsPage.clickOnCreateButton();
        applicationDialogPage.setCodeInput('code');
        expect(applicationDialogPage.getCodeInput()).toMatch('code');
        applicationDialogPage.setNomInput('nom');
        expect(applicationDialogPage.getNomInput()).toMatch('nom');
        applicationDialogPage.setDescriptionInput('description');
        expect(applicationDialogPage.getDescriptionInput()).toMatch('description');
        applicationDialogPage.getPriorityInput().isSelected().then((selected) => {
            if (selected) {
                applicationDialogPage.getPriorityInput().click();
                expect(applicationDialogPage.getPriorityInput().isSelected()).toBeFalsy();
            } else {
                applicationDialogPage.getPriorityInput().click();
                expect(applicationDialogPage.getPriorityInput().isSelected()).toBeTruthy();
            }
        });
        applicationDialogPage.save();
        expect(applicationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ApplicationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-application div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ApplicationDialogPage {
    modalTitle = element(by.css('h4#myApplicationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    codeInput = element(by.css('input#field_code'));
    nomInput = element(by.css('input#field_nom'));
    descriptionInput = element(by.css('textarea#field_description'));
    priorityInput = element(by.css('input#field_priority'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCodeInput = function(code) {
        this.codeInput.sendKeys(code);
    }

    getCodeInput = function() {
        return this.codeInput.getAttribute('value');
    }

    setNomInput = function(nom) {
        this.nomInput.sendKeys(nom);
    }

    getNomInput = function() {
        return this.nomInput.getAttribute('value');
    }

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    }

    getPriorityInput = function() {
        return this.priorityInput;
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
