import { Service } from "typedi";

@Service()
export class OtpLogic {

    public async generatedOtpMail(emailId : string){
        console.log("mail");
        
        const otp = await this.generatedOtp();
        console.log("otp",otp);
        
        const mail  = await this.sendMail(emailId,otp)
        return otp;

    }


    public async sendMail(emailId: string,otp : any) {
        const nodemailer = require('nodemailer');

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'noreplyfridex@gmail.com',
                pass : "nmrl xski mbnm giar"
            }
        });


        const mailOptions = {
            from: 'noreplyfridex@gmail.com',
            to: emailId,
            subject: 'Otp For Forgot Password',
            text: `your otp is ${otp}`, 
            html: `<b>your otp is ${otp}</b>`
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred:', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    }

    public async generatedOtp() {
        const characters = '0123456789'; // Only numbers for OTP
        const length = 4
        let otp = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length); 
            otp += characters[randomIndex]; 
        }
        return otp
    }
}