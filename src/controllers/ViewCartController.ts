import { Body, Get, JsonController, Post, QueryParam, Res,Req, UseBefore } from "routing-controllers";
import { Service } from "typedi";
import { BaseController } from "./BaseController";


@Service()
@JsonController("/api/cart")

export class ViewCartController extends BaseController {
    
      @Post('/add-cart')
    public async addItemToCart(@Req() req: any, @Res() res: any, @Body() reqbody: any,)  {
        try {
            if (!reqbody.productMaterialId || !reqbody.quantity || !reqbody.userId) {
                return res.status(400).json({ message: "Request body is missing or malformed." });
            }
            const existingProduct = await this.cartLogic.existingProduct(reqbody.productMaterialId);
            if (!existingProduct) {
                return res.status(404).json({ message: "Product not found in database." });
              }
            const data = await this.cartLogic.existingCart(reqbody);

            return res.status(200).json({ data : data,message : "Product Added in Cart Successfully"});
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error });
        }
      };
       @Get('/view-cart')
    public async viewCart(@Req() req: any, @Res() res: any,@QueryParam('userId') userId : number,) {
        try {
            console.log(userId);
           var data = await this.cartLogic.viewCart(userId);
            return res.status(200).json({ data : data});
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error });
        }
    }
}