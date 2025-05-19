const Participant = require("./Participant");
const RecallToEvent = require("./RecallToEvent");
const Event = require("./Event");
const Tag = require("./Tag");
const TagForEvent = require("./TagForEvent");
const FriendShip = require("./FriendShip");
const Organizer = require("./Organizer");
const EventsMedia = require("./EventsMedia");
const InviteToEvent = require("./InviteToEvent");
const Moderator = require("./Moderator");
const RequestToAccredited = require("./RequestToAccredited");
const Favourites = require('./Favourites')
const Feedback = require("./Feedback");
const ViewingHistory = require('./VIewingHistory')


//Участники и события
Participant.belongsToMany(Event, {through: RecallToEvent, foreignKey: "idParticipant", otherKey: "idEvent", as: 'events', onDelete: 'CASCADE', hooks: true});
Event.belongsToMany(Participant, { through: RecallToEvent, foreignKey: "idEvent", otherKey: "idParticipant", as: 'participants'});

RecallToEvent.belongsTo(Participant, { foreignKey: "idParticipant", as: "participant" });
RecallToEvent.belongsTo(Event, { foreignKey: "idEvent", as: "event" });

//Теги и события
Tag.belongsToMany(Event, {through: TagForEvent, foreignKey: "idTag", otherKey: "idEvent", as: 'events'});
Event.belongsToMany(Tag, { through: TagForEvent, foreignKey: "idEvent", otherKey: "idTag", as: 'tags'});

TagForEvent.belongsTo(Tag, { foreignKey: "idTag", as: "tag", onDelete: 'CASCADE' });
TagForEvent.belongsTo(Event, { foreignKey: "idEvent", as: "event", onDelete: 'CASCADE' });

//Друзья
Participant.hasMany(FriendShip, {foreignKey: 'idRequester' , as: "requesters"});
Participant.hasMany(FriendShip, {foreignKey: 'idReceiver' , as: "receivers"});

FriendShip.belongsTo(Participant, {foreignKey: 'idRequester' , as: "requester", onDelete: 'CASCADE'});
FriendShip.belongsTo(Participant, {foreignKey: 'idReceiver' , as: "receiver", onDelete: 'CASCADE'});

//События и организатор
Organizer.hasMany(Event, {foreignKey: 'idOrganizer' , as: "events", onDelete: 'CASCADE', hooks: true});
Event.belongsTo(Organizer, {foreignKey: 'idOrganizer' , as: "organizer"});

//Событие и медиа
Event.hasMany(EventsMedia, {foreignKey: 'idEvent' , as: "medias"});
EventsMedia.belongsTo(Event, {foreignKey: 'idEvent' , as: "event"});

//Приглошения от друзей на события
Participant.hasMany(InviteToEvent, {foreignKey: 'idRequester' , as: "eventRequesters", onDelete: 'CASCADE', hooks: true});
Participant.hasMany(InviteToEvent, {foreignKey: 'idReceiver' , as: "eventReceivers", onDelete: 'CASCADE', hooks: true});
Event.hasMany(InviteToEvent, {foreignKey: 'idEvent' , as: "events", onDelete: 'CASCADE', hooks: true});

InviteToEvent.belongsTo(Participant, {foreignKey: 'idRequester' , as: "requester"});
InviteToEvent.belongsTo(Participant, {foreignKey: 'idReceiver' , as: "receiver"});
InviteToEvent.belongsTo(Event, {foreignKey: 'idEvent' , as: "event"});

Organizer.hasMany(RequestToAccredited, {foreignKey: 'idOrganizer', as: 'accreditations', onDelete: 'CASCADE', hooks: true});
RequestToAccredited.belongsTo(Organizer, {foreignKey: 'idOrganizer' , as: "accreditations"});

Participant.hasOne(Favourites,{foreignKey:'idParticipant', as: 'Favourite', onDelete:'CASCADE'})
Favourites.belongsTo(Participant,{foreignKey:'idParticipant', as: 'Participant'})

Event.hasMany(Favourites, {foreignKey: 'idEvent', as: 'favourites', onDelete: 'CASCADE'});
Favourites.belongsTo(Event, {foreignKey: 'idEvent', as: 'event'})

Organizer.hasMany(Feedback, {foreignKey: 'idOrganizer', as: 'feedback'});
Participant.hasMany(Feedback, {foreignKey: 'idParticipant', as: 'feedback'});

Feedback.belongsTo(Organizer, {foreignKey: 'idOrganizer', as: 'organizer'});
Feedback.belongsTo(Participant, {foreignKey: 'idParticipant', as: 'participant'});

Participant.hasMany(ViewingHistory,  {foreignKey: 'idParticipant', as:'history', onDelete:'CASCADE'})
Event.hasMany(ViewingHistory,  {foreignKey: 'idEvent', as: 'history', onDelete:'CASCADE'})

ViewingHistory.belongsTo(Participant, {foreignKey: 'idParticipant', as:'participant'})
ViewingHistory.belongsTo(Event, {foreignKey: 'idEvent', as:'event'})

module.exports = {
    Organizer,
    Event,
    Tag,
    Participant,
    TagForEvent,
    InviteToEvent,
    FriendShip,
    RecallToEvent,
    Moderator,
    EventsMedia,
    RequestToAccredited,
    Favourites,
    Feedback,
    ViewingHistory
}
