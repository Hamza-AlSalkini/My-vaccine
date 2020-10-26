/**
 * A module exporting functions of user and admin login, signup
 */


var LocalStrategy = require("passport-local").Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var config = require('../config/db/myvaccin');

const connection = mysql.createConnection(config.connection);

connection.query('USE  ' + config.database);


module.exports = function(passport) {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        connection.query("SELECT * FROM users WHERE id = ?", [id],
            function(err, rows) {
                done(err, rows[0]);
            });
    });

    passport.use(
        'local-signup',
        new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password',
                firstName: 'firstName',
                secondName: 'secondName',
                dateOfBirth: 'dateOfBirth',
                gender: 'gender',
                mobile: 'mobile',
                address: 'address',
                post: 'post',
                confirmPass: 'confirmPass',
                passReqToCallback: true
            },
            function(req, email, password, done) {
                connection.query("SELECT username, password FROM users WHERE username = ?", [email], function(err, rows) {
                    if (err)
                        return done(err);
                    if (rows.length) {
                        return done(null, false, req.flash('signupMessage', 'That is already taken'));
                    }
                    if (password != req.body.confirmPass) {
                        return done(null, false, req.flash('signupMessage', 'Password does not match'));
                    } else {
                        var newUserMysql = {
                            username: email,
                            password: bcrypt.hashSync(password, null, null),
                            firstName: req.body.firstName,
                            secondName: req.body.secondName,
                            dateOfBirth: req.body.dateOfBirth,
                            gender: req.body.gender,
                            mobile: req.body.mobile,
                            address: req.body.address,
                            post: req.body.post
                        };
                        var insertQuery = "INSERT INTO users (username, password, firstName, secondName, dateOfBirth, gender, mobile, address, post) values (?, ?, ?, ?, ?, ?, ?, ?, ?)";

                        connection.query(insertQuery, [newUserMysql.username, newUserMysql.password, newUserMysql.firstName, newUserMysql.secondName, newUserMysql.dateOfBirth, newUserMysql.gender, newUserMysql.mobile, newUserMysql.address, newUserMysql.post],
                            function(err, rows) {
                                newUserMysql.id = rows.insertId;
                                return done(null, newUserMysql);

                            });
                    }
                });
            })
    );

    passport.use(
        'local-login',
        new LocalStrategy({
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true
            },
            function(req, username, password, done) {
                connection.query("SELECT * FROM users WHERE username = ?", [username],
                    function(err, rows) {
                        if (err) {
                            return done(err);
                        }
                        if (!rows.length) {
                            return done(null, false, req.flash('loginMessage', 'No user Found'));

                        }
                        if (!bcrypt.compareSync(password, rows[0].password)) {
                            return done(null, false, req.flash('loginMessage', 'Wrong Password'));
                        }
                        if (rows[0].role != 'user') {
                            console.log(rows[0].role);

                            return done(null, false, req.flash('loginMessage', 'No user role'));
                        }
                        return done(null, rows[0]);
                    });
            })
    );

    passport.use(
        'admin-login',
        new LocalStrategy({
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true
            },
            function(req, username, password, done) {
                connection.query("SELECT * FROM users WHERE username = ?", [username],
                    function(err, rows) {
                        if (err) {
                            return done(err);
                        }
                        if (!rows.length) {
                            return done(null, false, req.flash('loginMessage', 'No admin Found'));

                        }
                        if (!bcrypt.compareSync(password, rows[0].password)) {

                            return done(null, false, req.flash('loginMessage', 'Wrong Password'));
                        }
                        if (rows[0].role != 'admin') {
                            console.log(rows[0].role);

                            return done(null, false, req.flash('loginMessage', 'No admin role'));
                        }
                        return done(null, rows[0]);
                    });
            })
    );


};