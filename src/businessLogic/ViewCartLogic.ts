import { Service } from "typedi";
import { Product } from "../entity/entities/Product";
import { ViewCart } from "../entity/entities/ViewCart";
import { AppDataSource } from "../typeorm";
import { ProductMaterialMapping } from "../entity/entities/ProductMaterialMapping";

@Service()
export class ViewCartLogic {
public async viewCart(userId : number){
        try {
            const data = await AppDataSource.query(
                ` 
                 select  pmdm.name , (pmdm.grand_total * vc.quantity) AS total_price ,vc.quantity 
                 from view_cart vc 
                 join product_material_details_mapping pmdm 
                  on pmdm.id = vc.product_material_id and pmdm.deleted_on is null
                 where vc.user_id = ? and vc.deleted_on is null
                 order by vc.id desc;
                `,
                [userId]
              ); 
              console.log(data)
              return data;
        } catch (error) {
            throw error;
        }
    }

     public async existingProduct(productId: number) {
        try {

            const existingProduct = await AppDataSource.manager.findOne(ProductMaterialMapping, {
                where: {
                    id: productId,
                    deletedOn : null
                }
            });
            return existingProduct

        } catch (error) {
            throw error;
        }
    }

    public async existingCart(reqbody: any) {
        try {
            const { userId, productMaterialId, quantity } = reqbody;
            const existingItem = await AppDataSource.manager.findOne(ViewCart, {
                where: {
                    userId: userId,
                    productMaterialId: productMaterialId,
                    deletedOn : null
                },
            });

            if (existingItem) {
                existingItem.quantity = (existingItem.quantity ?? 0) + quantity;
                existingItem.updatedOn = new Date();
                existingItem.updatedBy = String(userId); 

                await AppDataSource.manager.save(existingItem);
            } else {
                const cartData = new ViewCart();
                cartData.userId = userId;
                cartData.productMaterialId = productMaterialId;
                cartData.quantity = quantity;
                cartData.createdOn = new Date();
                cartData.createdBy = String(userId);

                await AppDataSource.manager.save(ViewCart, cartData);
            }
        } catch (error) {
            throw error
        }

    }


}