const bcrypt = require('bcrypt');

const db = require('../models/db_conf.js');

const saltRounds = 10;

module.exports.all = () => {
    return db.prepare("SELECT * FROM tournaments").all();
};
module.exports.list = () => {
    return db.prepare("SELECT * FROM tournaments WHERE date_tournament > CURRENT_DATE ORDER BY date_tournament").all();
};

module.exports.dateSort = () => {
    return db.prepare("SELECT * FROM tournaments ORDER BY date_tournament").all();
};

module.exports.findById = (tournament_id) => {
    return db.prepare("SELECT * FROM tournaments WHERE tournament_id = ?").get(tournament_id);
};

module.exports.nbParticipants = (tournament_id) => {
    return db.prepare("SELECT COUNT(r.tournament_id) AS nb_participants FROM tournaments t, registrations r WHERE t.tournament_id = r.tournament_id AND t.tournament_id = ? ").get(tournament_id);
};


module.exports.registredUsers = (tournament_id) => {
    return db.prepare("SELECT user_id FROM registrations WHERE tournament_id = ?").get(tournament_id);
};
module.exports.isRegistred = (user_id,tournament_id) => {
    return db.prepare("SELECT * FROM registrations WHERE user_id = ? AND tournament_id = ?").get(user_id,tournament_id);
}

module.exports.create = (name, date, max_participants, creator, img_path) => {
    const stmt = db.prepare('INSERT INTO tournaments(name, date_tournament, nb_max_participants, creator, banner_image_path) VALUES (?, ?, ?, ?, ?)');
    stmt.run(name, date, max_participants, creator, img_path);
};

module.exports.findByName = (name) => {
    return db.prepare("SELECT * FROM tournaments WHERE name = ?").get(name);
};
module.exports.register = (user_id,tournament_id) => {
    const stmt = db.prepare("INSERT INTO registrations(user_id,tournament_id) VALUES (?, ?)");
    stmt.run(user_id,tournament_id);
};
module.exports.unregister = (user_id,tournament_id) => {
    const stmt = db.prepare("DELETE FROM registrations WHERE user_id = ? AND tournament_id = ?");
    stmt.run(user_id,tournament_id);
};

module.exports.numberTournaments = () => {
    const stmt = db.prepare("SELECT COUNT(t.tournament_id) AS 'nbTournois' FROM tournaments t WHERE DATE('now') < t.date_tournament");
    return stmt.get();
};

module.exports.includesTournament = (name) => {
    const stmt = db.prepare("SELECT LOWER(t.name) AS name FROM tournaments t WHERE LOWER(t.name) = ?");
    return stmt.get(name);
};


