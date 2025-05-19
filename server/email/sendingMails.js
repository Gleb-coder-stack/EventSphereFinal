const {sendMail} = require("./sendEmail");
class SendMail {
    static async sendNoticeToEntry(email) { //useless
        try {
            await sendMail({
                to: email,
                subject: 'Уведомление о входе',
                html: `<h2>Вы вошли в систему</h2>`,
            });
        } catch (e) {
            console.error('Ошибка при отправке письма:', e);
        }
    }

    static async send2FACode(email, code){//useless
        try {
            await sendMail({
                to: email,
                subject: `Ваш одноразовый код`,
                html: `<h2>Ваш одноразовый код для входа в аккаунт: ${code}</h2>`,
            });
        } catch (e) {
            console.error('Ошибка при отправке письма:', e);
        }
    }

    static async sendInviteToFriend(email, nickname) {
        try {
            await sendMail({
                to: email,
                subject: `Новый запрос в доузья`,
                html: `<h2>${nickname} хочет добавить вас в лрузья</h2>`,
            });
        } catch (e) {
            console.error('Ошибка при отправке письма:', e);
        }
    }

    static async inviteToFriendHasBeenApproved(email, nickname) {
        try {
            await sendMail({
                to: email,
                subject: `Изменение статуса заявки в друзья`,
                html: `<h2>${nickname} одобрил вашу заявку в друзья</h2>`,
            });
        } catch (e) {
            console.error('Ошибка при отправке письма:', e);
        }
    }

    static async inviteToFriendHasBeenRejected(email, nickname) {
        try {
            await sendMail({
                to: email,
                subject: `Изменение статуса заявки в друзья`,
                html: `<h2>${nickname} отклонил вашу заявку в друзья</h2>`,
            });
        } catch (e) {
            console.error('Ошибка при отправке письма:', e);
        }
    }

    static async sendInviteToEvent(email, nickname, nameEvent) { //useless
        try {
            await sendMail({
                to: email,
                subject: `Приглашение на мероприятие`,
                html: `<h2>${nickname} приглашает вас на мероприятие: ${nameEvent}</h2>`,
            });
        } catch (e) {
            console.error('Ошибка при отправке письма:', e);
        }
    }

    static async inviteToEventHasBeenApproved(email, nickname, nameEvent) { //useless
        try {
            await sendMail({
                to: email,
                subject: `Изменение статуса пришлашения на мероприятие`,
                html: `<h2>${nickname} принял ваше приглашение на мероприятие: ${nameEvent}</h2>`,
            });
        } catch (e) {
            console.error('Ошибка при отправке письма:', e);
        }
    }

    static async inviteToEventHasBeenRejected(email, nickname, nameEvent) { //useless
        try {
            await sendMail({
                to: email,
                subject: `Изменение статуса пришлашения на мероприятие`,
                html: `<h2>${nickname} отклонил ваше приглашение на мероприятие: ${nameEvent}</h2>`,
            });
        } catch (e) {
            console.error('Ошибка при отправке письма:', e);
        }
    }

    static async eventHasBeenApproved(email, nameEvent) {//useless
        try {
            await sendMail({
                to: email,
                subject: 'Изменение статуса мероприятия',
                html: `<h2>Ваше мероприятие ${nameEvent} прошло модерацию и было размещено на площадке.</h2>`,
            });
        } catch (e) {
            console.error('Ошибка при отправке письма:', e);
        }
    }

    static async eventHasBeenRejected(email, nameEvent) {//useless
        try {
            await sendMail({
                to: email,
                subject: 'Изменение статуса мероприятия',
                html: `<h2>Ваше мероприятие ${nameEvent} было отклонено модерацией из за нарушений <a>правил сообщества</a>.</h2>`,
            });
        } catch (e) {
            console.error('Ошибка при отправке письма:', e);
        }
    }

    static async requestToAccreditationHasBeenApprove(email) {//useless
        try {
            await sendMail({
                to: email,
                subject: 'Изменение статуса заявки на аккредитацию',
                html: `<h2>Ваша заявка на аккредитацию была одобрена. Теперь вы можете размещать мероприятия на площадке</h2>`,
            });
        } catch (e) {
            console.error('Ошибка при отправке письма:', e);
        }
    }

    static async requestToAccreditationHasBeenRejected(email) {//useless
        try {
            await sendMail({
                to: email,
                subject: 'Изменение статуса заявки на аккредитацию',
                html: `<h2>Ваша заявка на аккредитацию была отклонена. Пересмотрите ее и отправьте заново.</h2>`,
            });
        } catch (e) {
            console.error('Ошибка при отправке письма:', e);
        }
    }

    static async sendNoticeOfStartEvent(recallsWithEmails, nameEvent) {
        for(let recall of recallsWithEmails) {
            const emailParticipant = recall?.participant?.email
            try {
                await sendMail({
                    to: emailParticipant,
                    subject: 'Мероприятие началось!',
                    html: `<h2>Мероприятие ${nameEvent}, в котором вы участвуете, началось!</h2>`,
                });
            } catch (e) {
                console.error('Ошибка при отправке письма:', e);
            }
        }
    }

    static async sendNoticeOfFinishEvent(recallsWithEmails, nameEvent) {
        for(let recall of recallsWithEmails) {
            const emailParticipant = recall?.participant?.email
            try {
                await sendMail({
                    to: emailParticipant,
                    subject: 'Мероприятие закончилось!',
                    html: `<h2>Мероприятие ${nameEvent}, в котором вы участвовали, закончилось!</h2>`,
                });
            } catch (e) {
                console.error('Ошибка при отправке письма:', e);
            }
        }
    }

    static async sendMessageOfChangePassword(email) {
        try {
            await sendMail({
                to: email,
                subject: 'Уведомление о смене пароля',
                html: `<h2>Вы успешно сменили пароль</h2>`,
            });
        } catch (e) {
            console.error('Ошибка при отправке письма:', e);
        }
    }

    static async send2FACodeForResetPassword(email, code){//useless
        try {
            await sendMail({
                to: email,
                subject: `Ваш одноразовый код`,
                html: `<h2>Ваш одноразовый код для смены пароля: ${code}. Никому не сообщайте этот код!</h2>`,
            });
        } catch (e) {
            console.error('Ошибка при отправке письма:', e);
        }
    }
}

module.exports = SendMail;