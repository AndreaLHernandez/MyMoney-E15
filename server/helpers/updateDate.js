var CronJob = require('cron').CronJob;
const models = require("../../database/models");
const {Op} = require("sequelize");

var job = new CronJob(
	'0 0 0 * * *',
	async function() {
        const now = new Date();
       
        await models.accounts.update({ 
            cutoffDate: now.setUTCDate(now.getUTCDate() -1) && now.setUTCMonth(now.getUTCMonth() +1)}, 
            {
            where: {
                cutoffDate: {
                    [Op.lt]: new Date()
                }},
            });   
	},
	null,
	true,
    'America/Mexico_City',
);
module.exports = { job };
  