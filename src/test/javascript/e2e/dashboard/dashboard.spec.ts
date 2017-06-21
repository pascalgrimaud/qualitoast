import { browser, element, by } from 'protractor';

describe('administration', () => {

    const username = element(by.id('username'));
    const password = element(by.id('password'));
    const accountMenu = element(by.id('account-menu'));
    const dashboardMenu = element(by.id('dashboard-menu'));
    const login = element(by.id('login'));
    const logout = element(by.id('logout'));

    beforeAll(() => {
        browser.get('/');

        accountMenu.click();
        login.click();

        username.sendKeys('admin');
        password.sendKeys('admin');
        element(by.css('button[type=submit]')).click();
        browser.waitForAngular();
    });

    beforeEach(() => {
        dashboardMenu.click();
    });

    it('should load BarChart', () => {
        element(by.css('[routerLink="barchart"]')).click();
        const expect1 = /dashboard.barchart.home.title/;
        element.all(by.css('h2 span')).first().getAttribute('jhiTranslate').then((value) => {
            expect(value).toMatch(expect1);
        });
    });

    it('should load DoughnutChart', () => {
        element(by.css('[routerLink="doughnutchart"]')).click();
        const expect1 = /dashboard.doughnutchart.home.title/;
        element.all(by.css('h2 span')).first().getAttribute('jhiTranslate').then((value) => {
            expect(value).toMatch(expect1);
        });
    });

    it('should load LineChart', () => {
        element(by.css('[routerLink="linechart"]')).click();
        const expect1 = /dashboard.linechart.home.title/;
        element.all(by.css('h2 span')).first().getAttribute('jhiTranslate').then((value) => {
            expect(value).toMatch(expect1);
        });
    });

    it('should load PieChart', () => {
        element(by.css('[routerLink="piechart"]')).click();
        const expect1 = /dashboard.piechart.home.title/;
        element.all(by.css('h2 span')).first().getAttribute('jhiTranslate').then((value) => {
            expect(value).toMatch(expect1);
        });
    });

    it('should load PolarAreaChart', () => {
        element(by.css('[routerLink="polarareachart"]')).click();
        const expect1 = /dashboard.polarareachart.home.title/;
        element.all(by.css('h2 span')).first().getAttribute('jhiTranslate').then((value) => {
            expect(value).toMatch(expect1);
        });
    });

    it('should load RadarChart', () => {
        element(by.css('[routerLink="radarchart"]')).click();
        const expect1 = /dashboard.radarchart.home.title/;
        element.all(by.css('h2 span')).first().getAttribute('jhiTranslate').then((value) => {
            expect(value).toMatch(expect1);
        });
    });

    afterAll(() => {
        accountMenu.click();
        logout.click();
    });
});
