DROP TABLE IF EXISTS registrations;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS tournaments;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tennis_courts;

CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    status VARCHAR(7) NOT NULL CHECK (status IN ('regular', 'coach')),
    biography TEXT,
    picture_path VARCHAR(255)
);

CREATE TABLE messages (
    message_id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_id INTEGER NOT NULL REFERENCES users(user_id),
    receiver_id INTEGER NOT NULL REFERENCES users(user_id),
    message_text TEXT NOT NULL,
    response_text TEXT,
    date_hour_message DATETIME
);

CREATE TABLE tournaments (
    tournament_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    creator INTEGER NOT NULL REFERENCES users(user_id),
    date_tournament DATE NOT NULL,
    nb_max_participants INTEGER NOT NULL,
    banner_image_path VARCHAR(255) NOT NULL
);

CREATE TABLE registrations (
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    tournament_id INTEGER NOT NULL REFERENCES tournaments(tournament_id),
    PRIMARY KEY (user_id, tournament_id)
);

CREATE TABLE tennis_courts (
    tennis_court_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    flooring_type VARCHAR(10) NOT NULL CHECK (flooring_type IN ('grass', 'clay', 'artificial')),
    location VARCHAR(100) NOT NULL UNIQUE,
    picture_path VARCHAR(255) NOT NULL
);

CREATE TABLE bookings (
    date_booking DATE NOT NULL,
    tennis_court_id INTEGER NOT NULL REFERENCES tennis_courts(tennis_court_id),
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    PRIMARY KEY (tennis_court_id, date_booking)
);


-- password valid when used with bcrypt version 5, 10 rounds 

-- email: s.st@vinci.be, password: Projetweb2, regular
INSERT INTO users(firstname, surname,email,password,status)VALUES ('Sébatien', 'Strebelle', 's.st@vinci.be', '$2a$10$Obakld3Gq3XKoSRcUhEOzeYzTx8AdrLHgEMNUV26Vjkl9KYa.RXFm', 'regular') ;
-- email: j.de@vinci.be, password: Tennis10, regular
INSERT INTO users(firstname, surname,email,password,status)VALUES ('Jules', 'Desmet', 'j.de@vinci.be', '$2a$10$jOr2KFz6dk3kHZS4vnFijuukov9FCB/rUtI71b2Rw08eup88TYOVK', 'regular') ;
-- email: loic.lecharlier, password: Javascript2, coach
INSERT INTO users(firstname, surname,email,password,status,biography,picture_path)VALUES ('Loic', 'Lecharlier', 'loic.lecharlier@vinci.be', '$2a$10$035Tx/BCPuDZ7FYAUbsReOy7abjOg8sk/YYbTS3fb5bZrhBl08MOe', 'coach', 'Doctor in mathematical science. I have been playing tennis for 30 years. I prefer the one-handed backhand.', 'images/Loic.png') ;
-- email: r.na@vinci.be, password: Roland14, coach
INSERT INTO users(firstname, surname,email,password,status,biography,picture_path)VALUES ('Rafael', 'Naroni', 'r.na@vinci.be', '$2a$10$bBni.4t7THvnzMFZfwKGJ.iIyD/NR5Y8KR1WFQIzEERr1VUkyA0NG', 'coach', 'Swiss-Spanish computer scientist. I prefer clay courts.', 'images/Rafael.png') ;
-- email: b.ga@vinci.be, password: Wimbled4, coach
INSERT INTO users(firstname, surname,email,password,status,biography,picture_path)VALUES ('Bjorn', 'Gazon', 'b.ga@vinci.be', '$2a$10$AsagnZ8Rg2BsjrCJQEY3Yus7gEd6ZzpqpEKRW0vG0YtD9THdiVHeG', 'coach', 'Always passionate about grass tennis, I am a fan of the serve-and-volley game.', 'images/Bjorn.png') ;

INSERT INTO tennis_courts(name,flooring_type,location,picture_path) VALUES ('TB10','clay','Third court on the left in the second aisle','images/Tennis_clay_court.jpg') ;
INSERT INTO tennis_courts(name,flooring_type,location,picture_path) VALUES ('GR10','grass','Last court','images/Grass_tennis_court.png') ;
INSERT INTO tennis_courts(name,flooring_type,location,picture_path) VALUES ('SY10','artificial','First court on the right','images/Artificial_tennis_court.jpg') ;

INSERT INTO tournaments(name,creator,date_tournament,nb_max_participants,banner_image_path) VALUES ('La Raquette d''or',3,DATE('now','+10 day'),64,'images/RaquetteDOr.png') ;
INSERT INTO tournaments(name,creator,date_tournament,nb_max_participants,banner_image_path) VALUES ('Summer Open',4,DATE('now','-6 day'),128,'images/Summer.png') ;
INSERT INTO tournaments(name,creator,date_tournament,nb_max_participants,banner_image_path) VALUES ('Funny Open',4,DATE('now','+14 day'),256,'images/Funny.png') ;

INSERT INTO bookings(date_booking,tennis_court_id,user_id) VALUES(DATE('now','+3 day'),3,1) ;
INSERT INTO bookings(date_booking,tennis_court_id,user_id) VALUES(DATE('now','+6 day'),1,1) ;
INSERT INTO bookings(date_booking,tennis_court_id,user_id) VALUES(DATE('now','+10 day'),2,1) ;
INSERT INTO bookings(date_booking,tennis_court_id,user_id) VALUES(DATE('now','+7 day'),3,3) ;
INSERT INTO bookings(date_booking,tennis_court_id,user_id) VALUES(DATE('now','+9 day'),3,2) ;
INSERT INTO bookings(date_booking,tennis_court_id,user_id) VALUES(DATE('now','-9 day'),3,2) ;
INSERT INTO bookings(date_booking,tennis_court_id,user_id) VALUES(DATE('now','+8 day'),2,2) ;


INSERT INTO registrations(user_id,tournament_id) VALUES(2,1) ;
INSERT INTO registrations(user_id,tournament_id) VALUES(4,1) ;
INSERT INTO registrations(user_id,tournament_id) VALUES(4,2) ;
INSERT INTO registrations(user_id,tournament_id) VALUES(3,1) ;

INSERT INTO messages(sender_id,receiver_id,message_text,response_text, date_hour_message) VALUES(1,3,'Is there a class tomorrow?',null,DATETIME('now','localtime','-4 day','+2 hour','-15 minute'));
INSERT INTO messages(sender_id,receiver_id,message_text,response_text, date_hour_message) VALUES(1,5,'I will not be able to come to the class on July 3rd.',null,DATETIME('now','localtime','-1 day','+1 hour','-20 minute'));
INSERT INTO messages(sender_id,receiver_id,message_text,response_text, date_hour_message) VALUES(1,5,'Could we move today’s class?','Yes, no problem.',DATETIME('now','localtime','-6 day','+4 hour','-30 minute'));
INSERT INTO messages(sender_id,receiver_id,message_text,response_text, date_hour_message) VALUES(2,3,'I am sick and will not be able to come tomorrow','OK',DATETIME('now','localtime','-5 day','+2 hour','-15 minute'));
INSERT INTO messages(sender_id,receiver_id,message_text,response_text, date_hour_message) VALUES(2,3,'I will be absent for the next class.',null,DATETIME('now','localtime','-8 day','+2 hour','-15 minute'));
INSERT INTO messages(sender_id,receiver_id,message_text,response_text, date_hour_message) VALUES(2,3,'On which court will the next class take place?','TB10',DATETIME('now','localtime','-2 day','+2 hour','-35 minute'));
