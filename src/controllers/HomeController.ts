import { Get, JsonController, QueryParam, Res } from "routing-controllers";
import { BaseController } from "./BaseController";
import { Service } from "typedi";


@Service()
@JsonController("/api/home")
export class HomeController extends BaseController{

@Get('/product-list')
public async productList(
    @Res() res : any
){
    try {
        const data = await this.homeLogic.productList();
        return res.status(200).json({data : data})
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error",error : error})
    }
}
@Get('/product-details')
public async productDetails(
    @QueryParam('productId') productId : number,
    @Res() res : any
){
    try {
        const data = await this.homeLogic.productDetails(productId);
        return res.status(200).json({data : data})
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error",error : error})
    }
}



}