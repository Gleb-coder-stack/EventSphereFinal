import {createContext, StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './app/App.jsx'
import UserStore from "./features/store/UserStore.js";
import EventStore from "./features/store/EventStore.js";
import FriendsStore from "./features/store/FriendsStore.js";
import InviteStore from "./features/store/InviteStore.js";
import OrganizerStore from "./features/store/OrganizerStore.js";
import ParticipantStore from "./features/store/ParticipantStore.js";
import RequestAccreditedStore from "./features/store/RequestAccreditedStore.js";
import TagStore from "./features/store/TagStore.js";
import {Context} from './app/context.js'
import RecallStore from "./features/store/RecallStore.js";
import ModeratorStore from "./features/store/ModeratorStore.js";
import FeedbackStore from "./features/store/FeedbackStore.js";
import FavouriteStore from "./features/store/FavouriteStore.js";
import StatsStore from "./features/store/StatsStore.js";
import ViewingHistoryPage from "./pages/ViewingHistoryPage.jsx";
import ViewHistoryStore from "./features/store/ViewHistoryStore.js";



createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Context.Provider value={{
            user: new UserStore(),
            event: new EventStore(),
            friends: new FriendsStore(),
            invite: new InviteStore(),
            organizer: new OrganizerStore(),
            participant: new ParticipantStore(),
            request: new RequestAccreditedStore(),
            tag: new TagStore(),
            recalls: new RecallStore(),
            moderator: new ModeratorStore(),
            feedback: new FeedbackStore(),
            favourite: new FavouriteStore(),
            stats: new StatsStore(),
            viewHistory: new ViewHistoryStore(),
        }}>
            <App />
        </Context.Provider>
    </StrictMode>
)
