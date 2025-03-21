import { Body, Get, JsonController, Post, QueryParam, Res } from "routing-controllers";
import { BaseController } from "./BaseController";
import { Service } from "typedi";
import { response } from "express";
import { AppDataSource } from "../typeorm";

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
    public async saveSchemeUser(
        @Body() reqbody : any,
        @Res() res : any
    ){
        try {
            if (!reqbody.userId) {
                return res.status(404).json({ message: "Request body is missing or malformed." })
            }
            const validateSchemeUser = await this.schemeLogic.validateSchemeUser(reqbody.userId);
            if(validateSchemeUser){
                return res.status(404).json({ message: "User Scheme Already Exist" })
            }
            const data = await this.schemeLogic.schemeUser(reqbody);
            return data;
        } catch (error) {
            return res.status(500).json({message : "Internal Server Error",error : error})
        }
    }
    @Post('/scheme-paid')
    public async schemePaid(
        @Body() reqbody : any,
        @Res() res : any
    ){
        try {
            if (!reqbody.userId) {
                return res.status(404).json({ message: "Request body is missing or malformed." })
            }
           const update = await this.schemeLogic.schemePaid(reqbody);
           if(update == "User Not Found" ){
            return res.status(404).json({message : update})
           }
           return res.status(200).json({message : update})
        } catch (error) {
            return res.status(500).json({message : "Internal Server Error",error : error})
        }
    }

    @Get('/user')
    public async schemeUserDetails(
        @QueryParam('userId') userId : number,
        @Res() res : any
    ){
        try {
            const data = await this.schemeLogic.userSchemeData(userId);
            return res.status(200).json({data : data})
        } catch (error) {
            return res.status(500).json({message : "Internal Server Error",error : error})
        }
    }
}