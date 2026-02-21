import { dataTest, expect} from '../fixtures/dataFixture';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import {test} from '@playwright/test';


function getRandonEmail(): string{
    let randonValue = Math.random().toString(36).substring(2,9);
    return `auto_${randonValue}@nal.com`;


}

    test(`register verify user is able to register `, async ({ regData, page, baseURL }) => {
    
      // It will suport the sequential execution .. not supporting the parallel execution 
      // So existing approach is the best which is defined in the register.spec.ts
        for (const user of regData){

        }

    });

}



