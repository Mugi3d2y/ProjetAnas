const bcrypt = require('bcrypt');

const db = require('../models/db_conf');

module.exports.list = () => {
    const stmt = db.prepare('SELECT c.* FROM tennis_courts c  ORDER BY c.name')
 return stmt.all();
}
module.exports.FindCoach = (id_coach) => {
    const stmt = db.prepare('SELECT u.* FROM users u WHERE u.user_id = ?');
    return stmt.get(id_coach);
};

//details
module.exports.findById = (tennis_court_id) => {
    return db.prepare("SELECT * FROM tennis_courts  WHERE tennis_court_id = ?").get(tennis_court_id);
};
module.exports.FindCoach = (id_coach) => {
    const stmt = db.prepare('SELECT u.* FROM users u WHERE u.user_id = ? AND u.status = ?');
    return stmt.get(id_coach,"coach");
};


module.exports.editCourt = (data) => {
    const stmt = db.prepare('UPDATE tennis_courts SET name = CASE WHEN ? IS NOT NULL THEN ? ELSE name END, flooring_type = CASE WHEN ? IS NOT NULL THEN ? ELSE flooring_type END, location = CASE WHEN ? IS NOT NULL THEN ? ELSE location END, picture_path = CASE WHEN ? IS NOT NULL THEN ? ELSE picture_path END WHERE tennis_court_id = ?');
    stmt.run(data.name, data.name, data.flooring_type, data.flooring_type, data.location, data.location, data.picture_path, data.picture_path, data.id);
};


module.exports.numberBookings = () => {
    const stmt = db.prepare("SELECT COUNT(*) AS 'nbBookings' FROM bookings WHERE date_booking > DATE('now')");
    return stmt.get();
};

module.exports.search = (date,id) => {
   
  return db.prepare('SELECT * FROM bookings WHERE date_booking = ? and tennis_court_id=?').get(date,id);
};

module.exports.list_booking = (user_id) => {
    const stmt = db.prepare("SELECT t.* , b.date_booking FROM tennis_courts t,bookings b WHERE b.tennis_court_id=t.tennis_court_id and b.user_id=? and b.date_booking>DATE('now') ORDER BY b.date_booking ")
 return stmt.all(user_id);
}

module.exports.save = (data) => {
    const stmt = db.prepare('INSERT INTO bookings(date_booking, tennis_court_id, user_id) VALUES (?, ?, ?)');
    const info = stmt.run(data.date_booking, data.tennis_court_id, data.user_id);
    console.log("court model save" + info.changes);
};

module.exports.delete = (data) => {
    const info = db.prepare('DELETE FROM bookings WHERE date_booking= ? and tennis_court_id = ? and user_id=?').run(data.date_booking,data.tennis_court_id,data.user_id);
    
    console.log("court delete" + info.changes);
};
