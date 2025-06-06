import { Inject, Service } from "typedi";
import { UserLogic } from "../businessLogic/UserLogic";
import { OtpLogic } from "../businessLogic/OtpLogic";
import { HomeLogic } from "../businessLogic/HomeLogic";
import { SchemeLogic } from "../businessLogic/SchemeLogic";
import { ViewCartLogic } from "../businessLogic/ViewCartLogic";

@Service()
export class BaseController{
    @Inject()
    protected userLogic :UserLogic

    @Inject()
    protected otpLogic :OtpLogic

    @Inject()
    protected homeLogic :HomeLogic

    @Inject()
    protected schemeLogic :SchemeLogic

    @Inject()
    protected cartLogic :ViewCartLogic
}