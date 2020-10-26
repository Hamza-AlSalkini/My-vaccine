/**
 * Route for myvaccin.
 */

module.exports = function(app, passport) {

    const bodyParser = require("body-parser");
    const urlencodedParser = bodyParser.urlencoded({ extended: false });


    var myvaccin = require('../src/functions.js');

    app.get('/', (req, res) => {
        res.render('myvaccin/index.ejs');
    });

    app.get('/login', notAuthenticatedToEnter, (req, res) => {
        res.render('myvaccin/login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', notAuthenticatedToEnter, passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/signup', notAuthenticatedToEnter, (req, res) => {
        res.render('myvaccin/signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', notAuthenticatedToEnter, passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/profile', authUser, async(req, res) => {
        let id = req.user.id;
        res1 = await myvaccin.showVaccinatedLog(id);
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        var nowDate = year + "-" + month + "-" + date;
        res.render('myvaccin/profile.ejs', {
            user: req.user,
            res1,
            nowDate
        });

    });

    app.get('/logout', authenticatedToEnter, (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/admin-login', notAuthenticatedToEnter, (req, res) => {
        res.render('myvaccin/admin-login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/admin-login', notAuthenticatedToEnter, passport.authenticate('admin-login', {
        successRedirect: '/admin-dashboard',
        failureRedirect: '/admin-login',
        failureFlash: true
    }));

    app.get('/admin-dashboard', authAdmin, (req, res) => {
        res.render('myvaccin/admin-dashboard.ejs', {
            user: req.user
        });
    });

    app.get('/vaccine', authAdmin, async(req, res) => {

        res1 = await myvaccin.showVaccine();
        res.render('myvaccin/vaccine', {
            user: req.user,
            res1
        });
    });

    app.get('/vaccine-user', authUser, async(req, res) => {

        res1 = await myvaccin.showVaccine();
        res.render('myvaccin/vaccine-user', {
            user: req.user,
            res1
        });
    });

    app.get('/vaccine-edit/:id', authAdmin, async(req, res) => {
        let id = req.params.id;

        res1 = await myvaccin.showOne(id);
        res.render('myvaccin/vaccine-edit', {
            user: req.user,
            res1
        });
    });

    app.post('/vaccine-edit', urlencodedParser, authAdmin, async(req, res) => {

        await myvaccin.editVaccine(req.body.id, req.body.vaccine, req.body.description, req.body.recommendation, req.body.duration);
        res.redirect('/vaccine');
    });

    app.get('/vaccine-delete/:id', authAdmin, async(req, res) => {
        let id = req.params.id;

        res1 = await myvaccin.showOne(id);
        res.render('myvaccin/vaccine-delete', {
            user: req.user,
            res1
        });
    });

    app.post('/vaccine-delete', urlencodedParser, authAdmin, async(req, res) => {

        await myvaccin.deleteVaccine(req.body.id);
        res.redirect('/vaccine');
    });

    app.get('/vaccine-add', authAdmin, async(req, res) => {
        res.render('myvaccin/vaccine-add');
    });

    app.post('/vaccine-add', urlencodedParser, authAdmin, async(req, res) => {

        await myvaccin.addVaccine(req.body.vaccine, req.body.description, req.body.recommendation, req.body.duration);
        res.redirect('/vaccine');
    });

    app.get('/users', authAdmin, async(req, res) => {

        res1 = await myvaccin.showUsers();
        res.render('myvaccin/users', {
            user: req.user,
            res1
        });
    });

    app.get('/user-delete/:id', authAdmin, async(req, res) => {
        let id = req.params.id;

        res1 = await myvaccin.showOneUser(id);
        res.render('myvaccin/user-delete', {
            user: req.user,
            res1
        });
    });

    app.post('/user-delete', urlencodedParser, authAdmin, async(req, res) => {

        await myvaccin.deleteUser(req.body.id);
        res.redirect('/users');
    });

    app.get('/family-members', authUser, async(req, res) => {
        let id = req.user.id;
        res1 = await myvaccin.showFamilyMembers(id);
        res.render('myvaccin/family-members', {
            user: req.user,
            res1
        });
    });

    app.get('/family-add', authUser, async(req, res) => {
        res.render('myvaccin/family-add', {
            user: req.user
        });
    });

    app.post('/family-add', urlencodedParser, authUser, async(req, res) => {
        let id = req.user.id;

        await myvaccin.addFamilyMember(id, req.body.name, req.body.dateofbirth, req.body.gender);
        res.redirect('/family-members');
    });

    app.get('/family-edit/:idf', authUser, async(req, res) => {
        let idf = req.params.idf;
        let idu = req.user.id;
        res1 = await myvaccin.showOneMember(idf, idu);
        res.render('myvaccin/family-edit', {
            user: req.user,
            res1
        });
    });

    app.post('/family-edit', urlencodedParser, authUser, async(req, res) => {
        let idu = req.user.id
        await myvaccin.editMember(idu, req.body.idf, req.body.name, req.body.dateofbirth, req.body.gender);
        res.redirect('/family-members');
    });

    app.get('/family-delete/:idf', authUser, async(req, res) => {
        let idf = req.params.idf;
        let idu = req.user.id;
        res1 = await myvaccin.showOneMember(idf, idu);
        res.render('myvaccin/family-delete', {
            user: req.user,
            res1
        });
    });

    app.post('/family-delete', urlencodedParser, authUser, async(req, res) => {
        let idu = req.user.id
        let idf = req.body.idf;
        let name = req.body.name;
        await myvaccin.deleteMember(idf, idu, name);
        res.redirect('/family-members');
    });

    app.get('/add-vaccine-user', authUser, async(req, res) => {
        let id = req.user.id
        res1 = await myvaccin.showFamilyMembers(id);
        res2 = await myvaccin.showOneUser(id);
        res3 = await myvaccin.showVaccine();
        res.render('myvaccin/add-vaccine-user', {
            user: req.user,
            res1,
            res2,
            res3
        });
    });

    app.post('/add-vaccine-user', authUser, urlencodedParser, async(req, res) => {
        let id = req.user.id;
        let name = req.body.name;

        await myvaccin.createUserVaccine(id, name, req.body.vaccine, req.body.date);

        res.redirect("/show-vaccine-log");
    });


    app.get('/show-vaccine-log', authUser, async(req, res) => {
        let id = req.user.id;
        res1 = await myvaccin.showVaccinatedLog(id);
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        var nowDate = year + "-" + month + "-" + date;
        res.render('myvaccin/show-vaccine-log', {
            user: req.user,
            res1,
            nowDate
        });

    });

    app.get('/user-settings', authUser, async(req, res) => {
        res.render('myvaccin/user-settings', {
            user: req.user
        });
    });

    app.get('/user-edit', authUser, async(req, res) => {
        let id = req.user.id;
        res1 = await myvaccin.showOneUser(id);
        res.render('myvaccin/user-edit', {
            user: req.user,
            res1
        });
    });

    app.post('/user-edit', urlencodedParser, authUser, async(req, res) => {
        let id = req.user.id
        await myvaccin.editUser(id, req.body.username, req.body.firstName, req.body.secondName, req.body.dateOfBirth, req.body.gender, req.body.mobile, req.body.address, req.body.post);
        res.redirect('/user-settings');
    });
    ///////
    app.get('/vaccine-log-edit/:name/:vaccine/:date', authUser, async(req, res) => {
        let id = req.user.id;
        let name = req.params.name;
        let vaccine = req.params.vaccine;
        let date = req.params.date;
        res1 = await myvaccin.showOneVaccinated(id, name, vaccine, date);
        res.render('myvaccin/vaccine-log-edit', {
            user: req.user,
            res1
        });
    });

    app.post('/vaccine-log-edit', urlencodedParser, authUser, async(req, res) => {
        let id = req.user.id
        let name = req.body.name;
        let vaccine = req.body.vaccine;
        let date = req.body.date;
        let newdate = req.body.newdate;
        await myvaccin.editLogVaccinated(id, name, vaccine, date, newdate);
        res.redirect('/show-vaccine-log');
    });

    app.get('/vaccine-log-delete/:name/:vaccine/:date', authUser, async(req, res) => {
        let id = req.user.id;
        let name = req.params.name;
        let vaccine = req.params.vaccine;
        let date = req.params.date;
        res1 = await myvaccin.showOneVaccinated(id, name, vaccine, date);
        res.render('myvaccin/vaccine-log-delete', {
            user: req.user,
            res1
        });
    });

    app.post('/vaccine-log-delete', urlencodedParser, authUser, async(req, res) => {
        let id = req.user.id
        let name = req.body.name;
        let vaccine = req.body.vaccine;
        let date = req.body.date;
        await myvaccin.deleteLogVaccinated(id, name, vaccine, date);
        res.redirect('/show-vaccine-log');
    });

};
// log out
function authenticatedToEnter(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
// To use for user authrization
function authUser(req, res, next) {
    if (req.isAuthenticated() && req.user.role == 'user') {
        return next();
    }
    res.redirect('/');
}

// To use for sign up, log in, admin log in
function notAuthenticatedToEnter(req, res, next) {
    if (req.isAuthenticated() && req.user.role == 'user') {
        return res.redirect('/profile');
    }
    if (req.isAuthenticated() && req.user.role == 'admin') {
        return res.redirect('/admin-dashboard');
    }
    next();
}

// To use for the admin authrization.
// To prevent unathurized logning to vaccine and Dashborad
function authAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.role == 'user') {
        return res.redirect('/profile');
    }
    if (req.isAuthenticated() && req.user.role == 'admin') {
        next();
    } else
        return res.redirect('/admin-login');
}