const db = require('./db_conf.js');

module.exports.list = (coach) => {
    const stmt = db.prepare('SELECT u.* FROM users u WHERE u.status = ? ORDER BY u.firstname, u.surname');
    return stmt.all(coach);
};

module.exports.FindCoach = (id_coach) => {
    const stmt = db.prepare("SELECT u.* FROM users u WHERE u.user_id = ? AND u.status = 'coach'");
    return stmt.get(id_coach,);
};

module.exports.sendMessage = (sender,receiver,message) => {
    const stmt = db.prepare("INSERT INTO messages (sender_id,receiver_id,message_text,date_hour_message) VALUES (?,?,?,DATE('now'))");
    stmt.run(sender,receiver,message);
};


module.exports.editCoach = (id_coach,bio,image) => {
    const stmt = db.prepare('UPDATE users SET biography = CASE WHEN biography != ? THEN ? ELSE biography END, picture_path = CASE WHEN ? IS NOT NULL THEN ? ELSE picture_path END WHERE user_id = ?');
    stmt.run(bio,bio,image,image,id_coach);
};