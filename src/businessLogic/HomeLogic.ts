import { Service } from "typedi";
import { AppDataSource } from "../typeorm";
import { ProductMaterialDetailsMapping } from "../entity/entities/ProductMaterialDetailsMapping";

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
                    select pmdm.name ,pmdm.stock ,pmdm.size ,pmdm.name as descrption ,pmdm.metal ,pmdm.purity ,pmdm.stone_amount ,making_changes_amount ,gst_percentage ,grand_total,pmdm.product_amount,pmdm.id as product_details_id,pmdm.id as productMaterialId,TO_BASE64(pmdm.image) as image
                    from product_material_mapping pmm 
                    join product_material_details_mapping pmdm 
                    on PMM.id = PMDM.product_material_id 
                    where case when ${productId} != 0 then pmm.id = ${productId} else true end
                    order by pmdm.id desc
                    limit 30;
                `
            )
            return data
        } catch (error) {
            throw error
        }
    }

    public async addProduct(payload : any,file : any){
        try{
            const base : string= Buffer.from(file.buffer).toString('base64');
            console.log(base);
            const productMaterialId = await this.getProductMaterialId(payload.product,payload.material);
            console.log("data",productMaterialId);
            const productDetails = new ProductMaterialDetailsMapping();
            productDetails.productMaterialId = productMaterialId
            productDetails.name = payload.descrption
            productDetails.descrption =  payload.descrption
            productDetails.anticColor = 0
            productDetails.stock = payload.stock 
            productDetails.productAmount = payload.grandTotal
            productDetails.size = payload.size
            productDetails.purity = payload.purity
            productDetails.stoneAmount = 250    
            productDetails.makingChangesAmount = 4000  
            productDetails.gstPercentage = 18
            productDetails.grandTotal = (parseInt(payload.grandTotal) + 250 + 4000 ) * 1.8
            productDetails.createdBy = 1;
            productDetails.createdOn = new Date();
            productDetails.image = file.buffer;
            console.log("res",productDetails)
            await AppDataSource.manager.save(productDetails);

            return productDetails;

        }catch(error){
            throw error;
        }
    }
    public async getProductMaterialId(product : number,material : number){
        try{
            const data = await AppDataSource.manager.query(`
                select pmm.id
                from product_material_mapping pmm 
                where pmm.product_id  = ${product} and pmm.material_id = ${material} and pmm.deleted_on is null;
                `)
                console.log(data)
                return data[0].id;
        }catch(error){
            throw error;
        }
    }

}