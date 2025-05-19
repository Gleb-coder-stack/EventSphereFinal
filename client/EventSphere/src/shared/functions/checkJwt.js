import { jwtDecode } from "jwt-decode";
import {checkVersionJwtParticipant} from "../../features/API/ParticipantAPI.js";
import {checkVersionJwtOrganizer} from "../../features/API/OrganizerAPI.js";
import {checkVersionJwtModerator} from "../../features/API/ModeratorAPI.js";

const rolesAndFunction = {
    'participant' : checkVersionJwtParticipant,
    'organizer' : checkVersionJwtOrganizer,
    'moderator' : checkVersionJwtModerator,
    'admin' : checkVersionJwtModerator,
}


export default async function (token) {
    if (!token) return false;

    try {
        const { id, role, versionJwt } = jwtDecode(token);

        const checkFunction = rolesAndFunction[role];
        if (!checkFunction) {
            console.warn(`Нет функции проверки для роли: ${role}`);
            return false;
        }

        const resultCheck = await checkFunction({ id, versionJwt });
        return resultCheck;
    } catch (err) {
        console.error("Ошибка проверки JWT:", err.message);
        return false;
    }
}