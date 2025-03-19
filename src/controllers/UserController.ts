import { Body, Get, JsonController, Post, Put, QueryParam, Req, Res } from "routing-controllers";
import { BaseController } from "./BaseController";
import { Service } from "typedi";
import jwt from "jsonwebtoken";
import e from "express";
import { log } from "console";

@Service()
@JsonController("/api/user")

export class UserController extends BaseController{ 


    @Post('/log-in')
    public async generatedToken(
        @Body() reqbody :any,
        @Res() res : any

    ){
       try {
        if(!reqbody.emailId || !reqbody.password || !reqbody.fcmToken){
            return res.status(404).json({message : "username or password is missing"})
        }
        
        const validateUserData : any = await this.userLogic.validateUser(reqbody.emailId,reqbody.password);
        console.log(validateUserData);
        console.log("val",validateUserData);
        const body = "You’ve successfully logged in.👏 Start exploring your account now!";
        const title = "Welcome Back!";
        
        if(validateUserData != null){
        
        const otp = await this.otpLogic.generatedOtpMail(reqbody.emailId);
        await this.userLogic.saveOtp(otp,reqbody.emailId);
        await this.userLogic.notifacttion(reqbody.fcmToken,title,body);
        return res.status(200).json({message : "otp sent Sucessfully"})
        }else{
            return res.status(404).json({message : "Invalid email or password"}) 
        }
        
       } catch (error) {
            return res.status(500).json({message : "Internal Server Error",error : error})
       }

    }
    @Get('/user-verifyOtp')
    public async userVerifyOtp (
        @QueryParam('otp') otp : string,
        @QueryParam('emailId') emailId : string,
        @Res() res : any
    ) {
        try {
            if(!emailId || !otp){
                return res.status(404).json({message : "emaild and otp is required"})
            }
            console.log(otp,emailId);
            const data = await this.userLogic.validateUserOtp(emailId,otp);
            await this.userLogic.saveOtp(null,emailId);
            
            
            if(data != null){
            return res.status(200).json({message : "Otp Verifed Successfully",userId : data.id})
            }else{
                return res.status(404).json({message : "Invalid Otp"})
            }

        } catch (error) {
            return res.status(500).json({message : "Internal Server Error",error : error})
        }
    }
    @Post('/sign-up')
    public async createUser(
        @Body() reqbody :any,
        @Res() res : any

    ){
        try {
            if(!reqbody.firstName || !reqbody.password || !reqbody.emailId){
                return res.status(404).json({message: "Request body is missing or malformed."})
            }
            const existingUser = await this.userLogic.existingUser(reqbody.emailId)
            if(existingUser){
                return res.status(404).json({message: "User Already Exist"})
            }
            const user = await this.userLogic.createUser(reqbody);
            return res.status(200).json({message : "User Created Successfully",userUniqueKey : user})
        } catch (error) {
            return res.status(500).json({message : "Internal Server Error",error : error})
        }
    }
   
    @Post('/forget-password')
    public async forgetPassword(
        @Body() reqbody :any,
        @Res() res : any
    ){
        try {
            if(!reqbody.password || !reqbody.emailId){
                return res.status(404).json({message: "Request body is missing or malformed."})
            }
            const updatePassword = await this.userLogic.updatePassword(reqbody);
            return res.status(200).json({message : "User Password Updated Successfully"})
        } catch (error) {
            return res.status(500).json({message : "Internal Server Error",error : error})
        }
    }

    @Get('/send-otp')
    public async sendOtp(
        @QueryParam('emailId') emailId : string,
        @Res() res : any
    ){
        try {
            const existingUser = await this.userLogic.existingUser(emailId)
            console.log("exee",existingUser);
            
            if(!existingUser){
                return res.status(404).json({message: "emaild Invalid"})
            }
            const otp = await this.otpLogic.generatedOtpMail(emailId);
            await this.userLogic.saveOtp(otp,emailId);
            return res.status(200).json({message : "otp sent Sucessfully"})
        } catch (error) {
            return res.status(500).json({message : "Internal Server Error",error : error})
        }
    }

    @Get('/generatedOtp')
    public async generatedOtp(
        @QueryParam("emailId") emailId : string,
        @Res() res : any
    ){
      try {
        console.log("email",emailId);  
        const otp = await this.otpLogic.generatedOtpMail(emailId);
      return res.status(200).json({message : "otp sent in mail Successfully"})
      } catch (error) {
        return res.status(500).json({message : "Internal Server Error",error : error})
      }
    }
}