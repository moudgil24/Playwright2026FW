// import {test, expect} from '@playwright/test'. not required now becuae use fixtures now
import {LoginPage} from '../pages/LoginPage';
import {test, expect} from '../fixtures/baseFixtures';


test('Valid login.', async({homePage})=>{
    //Login take care of the fixtures
   await expect(homePage.page).toHaveTitle("My Account");

})


test('Invalid login', async({page, baseURL}) =>{
        let loginpage = new LoginPage(page);
        await loginpage.goToLoginPage(baseURL);
        loginpage.doLogin("pwwtest@nal.com","test1223");
        let warmingMsg =await loginpage.getInvalidLoginMessage();
        console.log(warmingMsg);
        expect(warmingMsg).toContain("Warning: No match for E-Mail Address and/or Password.");

})