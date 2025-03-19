import { Service } from "typedi";
import { AppDataSource } from "../typeorm";
import { GoldScheme } from "../entity/entities/GoldScheme";
import { SchemeUserMapping } from "../entity/entities/SchemeUserMapping";

@Service()
export class SchemeLogic{
    public async schemeMeta (){
        try {
          const data = await AppDataSource.manager.query(
            `
            select gs.id ,gs.name,gs.amount 
            from gold_scheme gs ;
            `
          ) 
          console.log("data",data);
           
          console.log("hii suresh bro");
          
          return data;
        } catch (error) {
            throw error;
        }
    }
    public async addNewSchem(reqbody : any){
        try {
            const goldScheme = new GoldScheme();
            goldScheme.name = reqbody.schemeName
            goldScheme.amount = reqbody.amount
           await AppDataSource.manager.save(goldScheme);
        } catch (error) {
            throw error;
        }
    }
    public async schemeUser(yearId : number,monthId : number){
        try {
            let paymentList = []
            let year : number = yearId
            for (let i=monthId ; i<=12 ; i++){
                console.log("monthID",monthId);
                
                console.log(i);
               
                if(paymentList.length > 10){
                    break;
                }
                // if(i > 12){
                //     i = 1;
                //     payment.yearId = yearId + 1
                // }else{
                //     payment.yearId = yearId
                // }
               console.log(year,"as");
               
                let payment = {
                    MonthId : i,
                    yearId : year,
                    isPaid : 0
                }
                if(i >= 12){
                    i=0;
                     year++;
                    console.log(year);
                    
                }

              
                paymentList.push(payment);
            }

            return paymentList;
        } catch (error) {
            throw error;
        }
    }
    public async saveSchemeUser(reqbody : any){
        try {
            // const schemeUserData = new SchemeUserMapping()
            // schemeUserData.goldSchemeId = reqbody.schemeId,
            // schemeUserData.userId = reqbody.userId,

        } catch (error) {
            
        }
    }
}