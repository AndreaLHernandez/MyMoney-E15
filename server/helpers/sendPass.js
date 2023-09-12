const path = require('path')
const { 
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
const sendPass = async (password,emailuser, subject) => {
    
    let emailTransporter = await createTransporter();

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
        from: OL_EMAIL, // sender address (who sends)
        to: emailuser, // list of receivers (who receives)
        subject: subject,
        template: 'templatePass',
        context: {
            text: password
        },
        
    }

    emailTransporter.sendMail(mailOptions, (error) => {
        if (error) {
            throw new Error(error)
        }
    });
};

module.exports = {
    sendPass,
};