import React from 'react';
import FriendCard from "../../cards/friends/friendCard.jsx";
import {toast} from "react-toastify";
import {sendInvite} from "../../../../features/API/FriendsAPI.js";
import classes from './friendsModal.module.css'
import {sendInviteToEvent} from "../../../../features/API/InviteToEventAPI.js";

const ModalWithMyFriends = ({ friends, onClose, idEvent}) => {
    const sendInviteFunc = async (id) => {
        try {
            const result = await sendInviteToEvent(id, idEvent);
            toast.success(result.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <div className={classes.modalOverlay}>
            <div className={classes.container}>
                <button onClick={onClose} className={classes.closeBtn}>×</button>
                <h2>Друзья</h2>
                <div className={classes.friendContainer}>
                    {friends.length > 0 ? (
                        friends.map((friend) => (
                            <FriendCard key={friend.id} friend={friend} sendInvite={sendInviteFunc} />
                        ))
                    ) : (
                        <p>Друзья не найдены</p>
                    )}
                </div>
            </div>
        </div>
    );
};
export default ModalWithMyFriends;