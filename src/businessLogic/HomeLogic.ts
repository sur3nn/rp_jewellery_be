import { Service } from "typedi";
import { AppDataSource } from "../typeorm";

@Service()
export class HomeLogic{
    public async productList(){
        try {
            const data =await AppDataSource.manager.query(
                `select m.id as material_id,m.name as material_name,
                    JSON_ARRAYAGG(
                    JSON_OBJECT(
                    'product_id',p.id ,
                    'product_material_id' ,pmm.id,
                    'product_name',p.name 
                    )
                    ) as product_details
                    from product_material_mapping pmm 
                    join product p 
                    on pmm.product_id = p.id 
                    join material m 
                    on pmm.material_id = m.id 
                    group by m.id,m.name;`
            )
            return data
        } catch (error) {
            throw error
        }
    }

    public async productDetails(productId : number){
        try {
            const data = await AppDataSource.manager.query(
                `
                    select pmdm.name ,pmdm.stock ,pmdm.size ,pmdm.descrption ,pmdm.metal ,pmdm.purity ,pmdm.stone_amount ,making_changes_amount ,gst_percentage ,grand_total,pmdm.product_amount,pmdm.id as product_details_id
                    from product_material_mapping pmm 
                    join product_material_details_mapping pmdm 
                    on PMM.id = PMDM.product_material_id 
                    where pmm.id = ${productId};
                `
            )
            return data
        } catch (error) {
            throw error
        }
    }
}