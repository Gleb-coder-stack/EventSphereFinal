const ApiError = require("../../errors/ApiError");
const { InviteToEvent, Event, Participant } = require("../../models");

module.exports = async function(user) {
    const { id } = user;
    try {
        const invites = await InviteToEvent.findAll({
            where: { idReceiver: id },
            include: [
                {
                    model: Participant,
                    as: "requester",
                    attributes: ['nickname']
                },
                {
                    model: Event,
                    as: "event",
                    attributes: ['name']
                }
            ]
        });

        return invites;
    } catch (err) {
        throw ApiError.internal(err.message);
    }
}
