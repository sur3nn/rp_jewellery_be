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
            goldScheme.createdBy = 1
            goldScheme.createdOn = new Date();
           await AppDataSource.manager.save(goldScheme);
        } catch (error) {
            throw error;
        }
    }
    public async paymentDetails(yearId : number,monthId : number){
        try {
            let paymentList = []
            let isAvailable = 1;
            let year : number = yearId
            for (let i=monthId ; i<=12 ; i++){
                console.log("monthID",monthId);
                
                console.log(i);
               
                if(paymentList.length > 10){
                    break;
                }
                let payment = {
                    MonthId : i,
                    yearId : year,
                    isPaid : 0,
                    isAvailable : isAvailable
                }
                if(i >= 12){
                    i=0;
                     year++; 
                     
                }
                isAvailable = 0 
              
                paymentList.push(payment);
            }

            return paymentList;
        } catch (error) {
            throw error;
        }
    }
    public async validateSchemeUser(userId : number){
        try {
            const data = await AppDataSource.manager.findOne(SchemeUserMapping,
                {
                    where : {
                        userId : userId
                    }
                }
                
            )
            return data;
        } catch (error) {
            throw error;
        }
    }
    public async schemeUser(reqbody : any){
        try {
            const payment = await this.paymentDetails(reqbody.yearId,reqbody.monthId)
            const schemeUserData = new SchemeUserMapping()
            schemeUserData.goldSchemeId = reqbody.schemeId,
            schemeUserData.userId = reqbody.userId,
            schemeUserData.paymentDetails = payment,
            schemeUserData.createdBy = "1";
            await AppDataSource.manager.save(schemeUserData);
            return schemeUserData;
        } catch (error) {
            throw error;
        }
    }
    public async schemePaid(reqbody : any){
        try {
            console.log("req",reqbody);
            const { userId, paymentData} : any = reqbody;
 
            let existingUser = await this.validateSchemeUser(userId);
            if(existingUser){
                const schmeUser =  AppDataSource.getRepository(SchemeUserMapping)
                const data = await schmeUser.update({userId : userId},{
                    paymentDetails : paymentData
                })
                return "Scheme Paid Succesfully";
            }else{
                return "User Not Found"

            }
            
           
            
        } catch (error) {
            throw error;
        }
    }
    public async userSchemeData(userId : number){
        try {
            const data = await AppDataSource.manager.query(`
                select gs.name ,gs.amount ,sum2.payment_details 
                from scheme_user_mapping sum2 
                join gold_scheme gs 
                on gs.id = sum2.gold_scheme_id 
                where  sum2.user_id = ${userId} and sum2.deleted_on is null;
                `)
            return data[0]
        } catch (error) {
            throw error;
        }
    }
}