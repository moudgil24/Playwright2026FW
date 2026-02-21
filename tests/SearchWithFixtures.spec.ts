import {test, expect} from '../fixtures/baseFixtures';
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

test(`'Search for ${product.searchkey}`,{tag:['@smoke','@regression']}, async({homePage}) =>{

    let resultPage: ResultsPage = await homePage.doSearch(product.searchkey);

    let rsult = await resultPage.getSearchResultsCount();
    expect(rsult).toBe(product.resultCount);

    console.log("Test case Passed for ${searchkey}");
})

}