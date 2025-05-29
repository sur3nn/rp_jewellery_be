import { Service } from "typedi";
import { AppDataSource } from "../typeorm";
import { User } from "../entity/entities/User";
import { admin } from "../server";
import { v4 as uuidV4} from 'uuid'
import { Order } from "../entity/entities/Order";

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
 public async orderUser(userId: any) {
  try {
    const query = `
      SELECT o.id, DATE_FORMAT(CONVERT_TZ(o.created_on, '+00:00', '+05:30'), '%e %b %l:%i %p') AS orderDate,o.order_status,
    u.first_name AS user_name,
             JSON_ARRAYAGG(
               JSON_OBJECT(
                 'product_name', pmdm.name,
                 'total', pmdm.grand_total,
                 'image', pmdm.image
               )
             ) AS order_details
      FROM \`order\` o
      LEFT JOIN product_material_details_mapping pmdm
        ON JSON_CONTAINS(o.product_details_mapping_id, CAST(pmdm.id AS JSON))
      INNER JOIN view_cart vc
        ON vc.product_material_id = pmdm.product_material_id
        AND vc.deleted_on IS NULL
        left JOIN user u
        ON u.id = o.user_id
       where case when  ${userId} != 0 then o.user_id=  ${userId} else true end
        AND o.deleted_on IS NULL
      GROUP BY o.id;
    `;

    let data = await AppDataSource.manager.query(query);

    return data.map(item => {
      let orderDetails = [];
      try {
        console.log(item.order_details);
         orderDetails = [...item.order_details]
         console.log("ab",orderDetails);

      } catch (error) {
        console.error("Error parsing JSON:", error);
      }

      return {
        user_name: item.user_name,
        order_id: item.id,
        order_date: item.orderDate,
        order_status: item.order_status,
        order_details: orderDetails
      };
    });
  } catch (error) {
    throw error;
  }
}

public async orderSave(reqbody : any){
    try{
        const order = new Order();
        order.userId = reqbody.userId;
        order.orderStatus = "Pending";
        order.productDetailsMappingId = reqbody.productDetailsMappingId;
        order.createdBy = "1";
        await AppDataSource.manager.save(order);
        return order.id;
    }catch (error) {
            throw error;
    }
}
public async orderUpdate(orderId : any,orderStatus : any){
    try{
         const user = AppDataSource.getRepository(Order)
        const update = user.update({id : orderId},{
            orderStatus : orderStatus
        })
        return update
    }catch (error) {
            throw error;
    }
}
}