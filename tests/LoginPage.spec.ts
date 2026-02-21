import {test, expect} from '@playwright/test'
import {LoginPage} from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';


test('Valid login. with Util classes', async({page, baseURL})=>{

    //login obj
    let loginpage = new LoginPage(page);
    await loginpage.goToLoginPage(baseURL);

    // let actualtitle=await loginpage.doLogin("pwwtest@nal.com","test123");
        // await expect(page).toHaveTitle(actualtitle);


    let homePage:HomePage = await loginpage.doLogin("pwtest@nal.com","test123")
    let isUserLoggedIn =homePage.isUserLoggedIn();
    expect(isUserLoggedIn).toBeTruthy();
    console.log("Test case1 Passed");

})

test('Valid Login without Util', async({page}) =>{
    let loginpage = new LoginPage(page);
        await loginpage.goToLoginPage();
    let actTitle =await loginpage.doLoginWithoutUtil("pwuser@nal.com","Asdf@1234");
    await expect(page).toHaveTitle("My Account");
        console.log("Test case2 Passed");

})

test('Invalid login', async({page}) =>{
        let loginpage = new LoginPage(page);
        await loginpage.goToLoginPage();
        loginpage.doLogin("pwwtest@nal.com","test1223");
        let warmingMsg =await loginpage.getInvalidLoginMessage();

        console.log(warmingMsg);
        expect(warmingMsg).toContain("Warning: No match for E-Mail Address and/or Password.");

})