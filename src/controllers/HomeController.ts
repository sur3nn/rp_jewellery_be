import { Body, Get, JsonController, Post, QueryParam, Res, UploadedFile  } from "routing-controllers";
import { BaseController } from "./BaseController";
import { Service } from "typedi";
import multer from "multer";
const storage = multer.memoryStorage();
const uploadOptions = {
  storage: storage
};

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
    @QueryParam('isPrice') isPrice : string,
    @Res() res : any
){
    try {
        const data = await this.homeLogic.productDetails(productId,isPrice);
        return res.status(200).json({data : data})
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error",error : error})
    }
}

@Get('/gold-price')
public async getGoldPrice(
    @Res() res : any
){
    try {
        var myHeaders = new Headers();
myHeaders.append("x-access-token", "goldapi-2uu4e4isma9tanc1-io");
myHeaders.append("Content-Type", "application/json");

var requestOptions : any= {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};
let response ;
const data:any = await fetch("https://www.goldapi.io/api/XAU/INR", requestOptions)
  .then(response => response.json())
  .then(result => {
    response = result;
  })
  .catch(error => console.log('error', error));
  return res.status(200).json({price : JSON.parse(response.price_gram_24k)})

    } catch (error) {
        return res.status(500).json({message : "Internal Server Error",error : error})
    }
}
@Get('/silver-price')
public async getSilverPrice(
    @Res() res : any
){
    try {
        var myHeaders = new Headers();
myHeaders.append("x-access-token", "goldapi-2uu4e4isma9tanc1-io");
myHeaders.append("Content-Type", "application/json");

var requestOptions : any= {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};
let response  : any;
const data:any = await fetch("https://www.goldapi.io/api/XAG/INR", requestOptions)
  .then(response => response.json())
  .then(result => {
    response = result;
  })
  .catch(error => console.log('error', error));
  return res.status(200).json({ price : JSON.parse(response.price_gram_24k)})

    } catch (error) {
        return res.status(500).json({message : "Internal Server Error",error : error})
    }
}

@Post('/add-product')
public async addproduct(
    @Res() res : any,
    @Body() req: any,
     @UploadedFile('image', { options: uploadOptions }) file: Express.Multer.File,
){
    try {
        const reqBody = JSON.parse(req.reqBodys);
         console.log("reqBody",reqBody,file);
         
        if(!reqBody.product || !reqBody.material || !file){
            return res.status(404).json({message: "Request body is missing or malformed."})
        }
        const data = await this.homeLogic.addProduct(reqBody,file)
        return res.status(200).json({message : "Product Added Successfully"})
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error",error : error})
    }
}



}