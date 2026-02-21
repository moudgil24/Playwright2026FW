import {test, expect} from '@playwright/test'
import {LoginPage} from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ResultsPage } from '../pages/ResultsPage';


// Parameterization- Data Provider

let searchData =[
    {searchkey: "macbook", resultCount: 3},
    {searchkey: "samsumg", resultCount: 2},
    {searchkey: "imac", resultCount: 1},
    {searchkey: "canon", resultCount: 1},
    {searchkey: "dummy", resultCount: 0},

]

for (let product of searchData){

test(`'Search for ${product.searchkey}`, async({page})=>{

     let loginpage = new LoginPage(page);
    await loginpage.goToLoginPage();

    let homePage: HomePage = await loginpage.doLogin("pwuser@nal.com","Asdf@1234");

    let isUserLoggedIn = await homePage.isUserLoggedIn(); // ✅ FIX
    expect(isUserLoggedIn).toBeTruthy();

    let resultPage: ResultsPage = await homePage.doSearch(product.searchkey);

    let rsult = await resultPage.getSearchResultsCount();
    expect(rsult).toBe(product.resultCount);

    console.log("Test case Passed for ${searchkey}");
})

}