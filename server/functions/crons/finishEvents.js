const cron = require('node-cron');
const { Event, RecallToEvent, Participant} = require('../../models');
const { Op } = require('sequelize');
const sendMails = require("../../email/sendingMails");
const getEmails = require('../../services/RecallToEvent/getParticipantsEmails');

cron.schedule('0 * * * *', async () => {
    const now = new Date();
    const expired = await Event.findAll({
        where: {
            dateEnd: { [Op.lt]: now },
            status: 'active',
        }
    });

    for (const event of expired) {
        event.status = 'finished';
        const recallsWithEmails = await getEmails(event.id)
        await sendMails.sendNoticeOfFinishEvent(recallsWithEmails, event.name);
        await event.save();
    }

    if (expired.length > 0) {
        console.log(`Завершено событий: ${expired.length}`);
    }
});