import {Locator, Page} from '@playwright/test';
import {ElementUtil} from '../utils/ElementUtil';
import { LoginPage } from '../pages/LoginPage';
import {ResultsPage} from '../pages/ResultsPage';



export class HomePage{
    
    readonly page:Page;
    private readonly eleUtil: ElementUtil;

    //Locators
    private readonly logOutLink:Locator;
    private readonly searchIcn:Locator;
    private readonly search :Locator;
    private readonly continue : Locator;
    private readonly loginLink :Locator;

    


    constructor(page:Page){
        this.page =page;
        this.eleUtil=new ElementUtil(page);

        //locators
        this.logOutLink= page.getByRole('link', { name: 'Logout' });
        this.search = page.getByRole('textbox', { name: 'Search' });
        this.searchIcn = page.locator(`#search > span.input-group-btn > button.btn`);
        this.continue = page.getByRole('link', { name: 'Continue' });
        this.loginLink =  page.getByRole('link', { name: 'Login' });



    }

    async isUserLoggedIn(): Promise<boolean>{
        return await this.eleUtil.isVisible(this.logOutLink, 0);
    }

   async doLogout() : Promise<LoginPage>{
     await this.eleUtil.click(this.logOutLink,{timeout:5000},1);
     await this.eleUtil.click(this.continue);
     await this.eleUtil.click(this.loginLink, {timeout:5000}, 1)
     
     //Now return to Login Page so here return the Login page object
     return new LoginPage(this.page);

   }

   async doSearch(searchKey:string): Promise<ResultsPage>{
    console.log("User wants to search " + searchKey);
     await this.eleUtil.fill(this.search, searchKey);
     await this.eleUtil.click(this.searchIcn);

     return new ResultsPage(this.page);


   }





}