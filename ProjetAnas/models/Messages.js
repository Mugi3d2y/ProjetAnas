const db = require('./db_conf.js');

module.exports.listUser = (id) =>{
    const stmt = db.prepare('SELECT m.*, u1.firstname AS "sender_firstname", u1.surname AS "sender_surname", u1.picture_path AS "sender_picturepath", u2.firstname AS "receiver_firstname", u2.surname AS "receiver_surname", u2.picture_path AS "receiver_picturepath" FROM messages m, users u1, users u2 WHERE m.sender_id = ? AND m.sender_id = u1.user_id AND m.receiver_id = u2.user_id ORDER BY date_hour_message');
    return stmt.all(id);
};

module.exports.listCoach = (id) =>{
    const stmt = db.prepare('SELECT m.*, u1.firstname AS "receiver_firstname", u1.surname AS "receiver_surname", u2.firstname AS "sender_firstname", u2.surname AS "sender_surname" FROM messages m, users u1, users u2 WHERE m.receiver_id = ? AND m.receiver_id = u1.user_id AND m.sender_id = u2.user_id AND m.response_text IS NULL ORDER BY date_hour_message');
    return stmt.all(id);
};

module.exports.answer = (message_id,answer) => {
    const stmt = db.prepare('UPDATE messages SET response_text = CASE WHEN ? IS NOT NULL THEN ? ELSE response_text END WHERE message_id = ?')
    return stmt.run(answer,answer,message_id)
};


module.exports.numberMessages = () => {
    const stmt = db.prepare("SELECT COUNT(m.message_id) AS 'nbMessages' FROM messages m WHERE date_hour_message >= DATE('now','-7 days')");
    return stmt.get();
};
