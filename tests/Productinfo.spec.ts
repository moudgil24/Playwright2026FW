import {test, expect} from '@playwright/test'
import {LoginPage} from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ProductInfoPage } from '../pages/ProductInfoPage';
import { ResultsPage } from '../pages/ResultsPage';

let searchData =[
{searchkey:'macbook', productName:"MacBook Pro", imageCount:4, brand:"Apple", productCode:"Product 18",rewardPoints:'800',availability:'Out Of Stock',price:'$2,000.00', extraprice:'$2,000.00'},
{searchkey:'macbook', productName:"MacBook Air", imageCount:4,  brand:"Apple", productCode:"Product 17",rewardPoints:'700',availability:'Out Of Stock',price:'$1,202.00', extraprice:'$1,000.00'},
{searchkey:'samsung', productName:"Samsung Galaxy Tab 10.1", imageCount:7,  brand:"", productCode:"SAM1",rewardPoints:'1000',availability:'Pre-Order',price:'$241.99', extraprice:'$199.99'}


]

for (let product of searchData){
test(`Product Info for ${product.productName}`, async({page})=>{

     let loginpage = new LoginPage(page);
     await loginpage.goToLoginPage();

    let homePage: HomePage = await loginpage.doLogin("pwuser@nal.com","Asdf@1234");

    let isUserLoggedIn = await homePage.isUserLoggedIn(); 
    expect(isUserLoggedIn).toBeTruthy();

    let resultPage: ResultsPage = await homePage.doSearch(product.searchkey);
    let rsult = await resultPage.getSearchResultsCount();
    // expect(rsult).toBe(4);

    // Select on the product
    let productInfoPage: ProductInfoPage=await resultPage.selectProduct(product.productName)
    let actualHeading =await productInfoPage.getProductHeader();
    expect(actualHeading).toBe(product.productName);

    // validate the numer of images
    expect(await productInfoPage.getProductImagesCount()).toBe(product.imageCount);

    let actualProductDetails = await productInfoPage.getProductDetails();
    expect.soft(actualProductDetails.get('header')).toBe(product.productName);
    expect.soft(actualProductDetails.get('Brand')).toBe(product.brand);
    expect.soft(actualProductDetails.get('Product Code')).toBe(product.productCode);
    expect.soft(actualProductDetails.get('Reward Points')).toBe(product.rewardPoints);
    expect.soft(actualProductDetails.get('Availability')).toBe(product.availability);
    expect.soft(actualProductDetails.get('price')).toBe(product.price);
    expect.soft(actualProductDetails.get('extraprice')).toBe(product.extraprice);

    console.log(`Test case Passed for ${product.productName}`);
})

}