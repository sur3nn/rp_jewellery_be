import { Service } from "typedi";
import { AppDataSource } from "../typeorm";
import { User } from "../entity/entities/User";
import { admin } from "../server";
import { v4 as uuidV4} from 'uuid'

@Service()
export class UserLogic{
    public async validateUser(emailId: string,password : string){
        try {
           console.log(emailId,password);
           
           const data = await AppDataSource.manager.findOne(User,
               {
                   where : {
                       emailId : emailId,
                       password : password
                   },
                   select : ['uniqueKey','firstName']
               }
            )
            console.log("user",data);
            
            return data
        } catch (error) {
           throw error;
        }
   }
   public async existingUser(emailId : any){
       try {
           const existingUser = await AppDataSource.manager.findOne(User, {
               where: { emailId : emailId }, 
             });
             return existingUser;
       } catch (error) {
           throw error
       }
   }
   public async validateUserOtp(emailId : string,otp : any){
       try {  
          const data = await AppDataSource.manager.findOne(User,
              {
                  where : {
                      emailId : emailId,
                      otp : otp
                  },
                  select : ['id','firstName']
              }
           )
           console.log("user",data);
           
           return data
       } catch (error) {
          throw error;
       }
  }
  public async updateUserFcmToken(userId : number,token : string){
    try {
        const userData =  AppDataSource.manager.getRepository(User);
        await userData.update({id : userId},
            {
                fcmToken : token
            }
        )
        return token;
    } catch (error) {
        throw error;
    }
}
public async notifacttion(fcmToken : string,title : string,body : string) {
    try {
     
        const message = {
            notification: {
                title: title,
                body: body
            },
            token: fcmToken
            //token: 'eNDQ1nwKQ9KKEd9auYYrn9:APA91bFyIxPn1nMrxUk5l0jlxwLTvEbxgxNPE8DuSqfE48GwejM88r2ayu1k_X0p1KQIuP7jxVm85zt2xLXpvgfIzLtZ3O_kz6ltDOLzKY3jaSL8QgroS3Y' 
        };
        admin.messaging().send(message).then(response => {
          console.log('Successfully sent message:', response.messageId);
        })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    } catch (error) {
        throw error;
    }
}
public async saveOtp(otp:any,emailId : any){
    try {
        const user = AppDataSource.getRepository(User)
        const update = user.update({emailId : emailId},{
            otp : otp
        })
        return update
    } catch (error) {
        throw error
    }
}
public async updatePassword(reqbody:any){
    try {
        const {emailId,password} = reqbody
        const user = AppDataSource.getRepository(User)
        const update = user.update({emailId : emailId},{
            password : password
        })
        return update
    } catch (error) {
        throw error
    }
}
public async createUser(reqbody : any){
    try {
        const user = new User();
        user.uniqueKey = reqbody.uniqueKey ? reqbody.uniqueKey : uuidV4()
        user.firstName = reqbody.firstName
        user.emailId = reqbody.emailId
        user.password = reqbody.password
        user.createdBy = "1";
        await AppDataSource.manager.save(user);
        return user.id;
    } catch (error) {
        throw error;
    }
}
 
}