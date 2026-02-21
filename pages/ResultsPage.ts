import {Locator, Page} from '@playwright/test';

import { ElementUtil } from "../utils/ElementUtil";
import {ProductInfoPage} from './ProductInfoPage';

export class ResultsPage{


    private readonly page:Page;
    private readonly eleUtil;

    private readonly results: Locator;
    // private readonly product:Locator;



    constructor(page: Page){
        this.page=page;
        this.eleUtil= new ElementUtil(page);

        this.results = page.locator(`div.product-thumb`);


    }

    async getSearchResultsCount():Promise<number>{
        return await this.results.count();

    }

    async selectProduct(productName:string): Promise<ProductInfoPage> {
        await this.eleUtil.click(this.page.getByRole('link', { name: `${productName}` }));
        return  new ProductInfoPage(this.page);

    }





}