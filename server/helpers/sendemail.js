const path = require('path')
const { 
    URL_HEROKU,
    OL_EMAIL,
    OL_PASS,
} = require('../../config/config');
const nodemailer = require('nodemailer');
////Nuevo Import
var hbs = require('nodemailer-express-handlebars');

const createTransporter = async () => {
    var transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
           ciphers:'SSLv3'
        },
        auth: {
            user: OL_EMAIL,
            pass: OL_PASS,
        }
        
    });
    return transporter;
};

/* Creamos Endpoint tipo post apunta a */
const sendEmail = async (emailToken, emailuser, subject) => {
    
    let emailTransporter = await createTransporter();

    const url = URL_HEROKU + "/auth/" + "verify-email/" + emailToken
    //const url =  + "/auth/" + "verify-email/" + emailToken

    ////Nuevas opciones
    const handlebarOptions = {
        viewEngine: {
            extName: ".handlebars",
            partialsDir: path.resolve('./views'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./views'),
        extName: ".handlebars",
    } 

    emailTransporter.use('compile', hbs(handlebarOptions));

    var mailOptions = {
        from: OL_EMAIL,
        to: emailuser,
        subject: subject,
        template: 'templateEmail',
        context: {
            botton: url
        },
        
    }

    emailTransporter.sendMail(mailOptions, (error) => {
        if (error) {
            throw new Error(error)
        }
    });
};

module.exports = {
    sendEmail,
};