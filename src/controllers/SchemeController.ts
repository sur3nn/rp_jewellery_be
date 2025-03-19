import { Body, Get, JsonController, Post, Res } from "routing-controllers";
import { BaseController } from "./BaseController";
import { Service } from "typedi";
import { response } from "express";

@Service()
@JsonController("/api/scheme")
export class SchemeController extends BaseController{

    @Get('/')
    public async schemeMeta(
        @Res() res : any
    ){
        try {
            const data = await this.schemeLogic.schemeMeta();
            return res.status(200).json({data : data})
        } catch (error) {
            return res.status(500).json({message : "Internal Server Error",error : error})
        }
    }
    @Post('/add-schem')
    public async addNewScheme(
        @Body() reqbody : any,
        @Res() res : any
    ){
        try {
            const data = await this.schemeLogic.addNewSchem(reqbody);
            return res.status(200).json({message : "Scheme Created Succesfully"})
        } catch (error) {
            return res.status(500).json({message : "Internal Server Error",error : error})
        }
    }

    @Post('/scheme-user')
    public async schemeUser(
        @Body() reqbody : any,
        @Res() res : any
    ){
        try {
            console.log("mnt",reqbody);
            
            const data = await this.schemeLogic.schemeUser(reqbody.yearId,reqbody.monthId);
            return data;
        } catch (error) {
            return res.status(500).json({message : "Internal Server Error",error : error})
        }
    }
}