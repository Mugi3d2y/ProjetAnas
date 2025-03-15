const bcrypt = require('bcrypt');

const db = require('../models/db_conf.js');

const saltRounds = 10;

module.exports.register = (firstname, surname, email, password, status) => {
    const hash = bcrypt.hashSync(password, saltRounds);

    const stmt = db.prepare('INSERT INTO users(firstname, surname, email, password,status) VALUES (?, ?, ?, ?, ?)');
    stmt.run(firstname, surname, email, hash, status);
};

module.exports.login = (email, password) => {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    const user = stmt.get(email);
    if (!user) return null;

    if (!bcrypt.compareSync(password, user.password)) return null;
    return user;
};

module.exports.findByMail = (email) => {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    const user = stmt.get(email);
    return user;
    
};