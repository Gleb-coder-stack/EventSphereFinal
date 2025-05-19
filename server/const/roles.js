const {Participant, Organizer, Moderator} = require("../models");
 const roleModelMap = {
    'participant': Participant,
    'organizer': Organizer,
    'admin': Moderator,
    'moderator': Moderator,
};
module.exports = roleModelMap;