const fs = require('fs');
const path = require('path');


const uploadImage = async (file, namePath) => {
    // to declare some path to store your converted image
    try {
        console.log("Entro a uploadImage");

        let  matches = file.match(/^data:(.+);base64,(.+)$/);
        let response = {};
         
        if (matches.length !== 3) return new Error("Invalid input string");
        
        response.type = matches[1];
        response.data =  Buffer.from(matches[2], "base64");
        let extension = response.type.split("/");
        //extension = extension[1].split("+");
        extension = extension[1];
       
    
        
        if(
            !fs.existsSync(
                `${path.dirname(require.main.filename)}/server/public${namePath}`
            )
        ) {
            fs.mkdirSync(
                `${path.dirname(require.main.filename)}/server/public${namePath}`,
                true
                );
        }

        let fileRoute = `${namePath}/${new Date().getTime()}.${extension}`;
        console.log(fileRoute);
        const froute=`${path.dirname(require.main.filename)}/server/public${fileRoute}`;
        console.log(froute);
        fs.writeFileSync(
            froute,
            response.data,
            {
                encoding: "utf8",
            }
        );
       
        return froute;
    } catch (error) {
      console.log(error);  
      return new Error('internal server error');
    }
};
   
   
    module.exports = { uploadImage };