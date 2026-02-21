import {test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

// Variable defined


type MyFixtures = {
  homePage: HomePage;
};


 export const test = base.extend<MyFixtures>({

    homePage : async({page, baseURL}, use, testInfo) => {
 
        // This fixture will do the login before any test

        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);

        //un and pwd:from playwright.config.

        const username =testInfo.project.metadata.appUsername;
        const password = testInfo.project.metadata.appPassword;

       const homePage = await loginPage.doLogin(username, password);
       expect(await homePage.isUserLoggedIn).toBeTruthy();

       //Return the home page object to the test csae

       await use(homePage);
    }

    })


    // to avoid expect line in every test clss
    export {expect}