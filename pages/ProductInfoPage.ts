import {Page,Locator} from '@playwright/test';
import {ElementUtil} from '../utils/ElementUtil';


export class ProductInfoPage{

    private readonly page:Page;
    private readonly eleUtil;
    
    private readonly header: Locator;
    private readonly images: Locator;
    private readonly productMetaData: Locator;
    private readonly productPriceData: Locator;

    private readonly productMap = new Map<string, string | null | number>();

    constructor(page:Page)
    {
        this.page=page;
        this.eleUtil= new ElementUtil(page);

        this.header = page.locator('h1');
        this.images = page.locator(`div#content img`);
        this.productMetaData = page.locator(`//div[@id='content']//ul[@class='list-unstyled'][1]/li`)
        this.productPriceData = page.locator(`//div[@id='content']//ul[@class='list-unstyled'][2]/li`)
 
    }


    async getProductHeader(): Promise<string>{
        const header = await this.eleUtil.getInnerText(this.header);
        return header.trim();
    }

    async getProductImagesCount():Promise<number>{
        await this.eleUtil.waitForElementVisible(this.images);
        return await this.images.count();

    }


            //     Brand: Apple
            // Product Code: Product 18
            // Reward Points: 800
            // Availability: Out Of Stock

    private async getProductMetaData(){
       let ProductMetadata = await this.productMetaData.allInnerTexts();
       for(let meta of ProductMetadata){
               let metadata:string[]= meta.split(':')
               let metakey=metadata[0].trim();
               let metaValue = metadata[1].trim();
               
               //Insert value in to the Map
                this.productMap.set(metakey,metaValue);
       }
        return this.productMap;
    }

            //         $2,000.00
            // Ex Tax: $2,000.00

    private async getProductPricingData(){
       let productPricing: string[] = await this.productPriceData.allInnerTexts();

       let productPrice=productPricing[0].trim();
       let productExTax = productPricing[1].split(':')[1].trim();

       //enter avlue into the map
       this.productMap.set('price', productPrice);
        this.productMap.set('extraprice', productExTax);

    }

    // this returns the complete product infor:  header, images, count, metadata and pricing data
    async getProductDetails():Promise<Map<string, string| number |null>>{

        //setting the header initially
        this.productMap.set('header',await this.getProductHeader());
        this.productMap.set('imageCount',await this.getProductImagesCount());
        
        this.getProductMetaData();
        this.getProductPricingData();
        console.log(`Full product detils of this ${this.getProductHeader()}`);

        //To print this 
        this.printProductDetails();
        return this.productMap;

    }

    // Print the map with the iteration
    async printProductDetails()
    {
        for (const [key, value] of this.productMap){
            console.log(key, value);

        }


    }


}