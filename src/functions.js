/**
 * A module exporting functions to access the myvaccin database.
 */

module.exports = {
    showVaccine: showVaccine,
    showOne: showOne,
    editVaccine: editVaccine,
    deleteVaccine: deleteVaccine,
    addVaccine: addVaccine,
    showUsers: showUsers,
    deleteUser: deleteUser,
    showOneUser: showOneUser,
    showFamilyMembers: showFamilyMembers,
    addFamilyMember: addFamilyMember,
    showOneMember: showOneMember,
    editMember: editMember,
    deleteMember: deleteMember,
    createUserVaccine: createUserVaccine,
    showVaccinatedLog: showVaccinatedLog,
    editUser: editUser,
    showOneVaccinated: showOneVaccinated,
    deleteLogVaccinated: deleteLogVaccinated,
    editLogVaccinated: editLogVaccinated
};

const mysql1 = require("promise-mysql");
var config1 = require('../config/db/test.json');
let db;

(async function() {
    db = await mysql1.createConnection(config1);

    process.on('exit', () => {
        db.end();
    });
})();

async function showVaccine() {
    let sql = `CALL show_vaccine();`;
    let res;

    res = await db.query(sql);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res[0];
}

async function showOne(id) {
    let sql = `CALL show_one(?);`;
    let res;

    res = await db.query(sql, [id]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res[0];
}


async function editVaccine(id, vaccine, description, recommendation, duration) {
    let sql = `CALL edit_vaccine(?, ?, ?, ?, ?);`;
    let res;

    res = await db.query(sql, [id, vaccine, description, recommendation, duration]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res[0];
}

async function deleteVaccine(id) {
    let sql = `CALL delete_vaccine(?);`;
    let res;

    res = await db.query(sql, [id]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res[0];
}

async function addVaccine(vaccine, description, recommendation, duration) {
    let sql = `CALL add_vaccine(?, ?, ?, ?);`;
    let res;

    res = await db.query(sql, [vaccine, description, recommendation, duration]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res[0];
}

async function showUsers() {
    let sql = `CALL show_users();`;
    let res;

    res = await db.query(sql);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res[0];
}

async function deleteUser(id) {
    let sql = `CALL delete_user(?);`;
    let res;

    res = await db.query(sql, [id]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res[0];
}

async function showOneUser(id) {
    let sql = `CALL show_one_user(?);`;
    let res;

    res = await db.query(sql, [id]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res[0];
}

async function showFamilyMembers(id) {
    let sql = `CALL show_family_members(?);`;
    let res;

    res = await db.query(sql, [id]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res[0];
}

async function addFamilyMember(id, name, dateofbirth, gender) {
    let sql = `CALL add_family_member(?, ?, ?, ?);`;
    let res;

    res = await db.query(sql, [id, name, dateofbirth, gender]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res[0];
}

async function showOneMember(idf, idu) {
    let sql = `CALL show_one_member(?, ?);`;
    let res;

    res = await db.query(sql, [idf, idu]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res[0];
}

async function editMember(idu, id, name, dateofbirth, gender) {
    let sql = `CALL edit_member(?, ?, ?, ?, ?);`;
    let res;

    res = await db.query(sql, [idu, id, name, dateofbirth, gender]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res[0];
}

async function deleteMember(idf, idu, name) {
    let sql = `CALL delete_member(?, ?, ?);`;
    let res;

    res = await db.query(sql, [idf, idu, name]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res[0];
}

async function createUserVaccine(id, name, vaccine, date) {
    let sql = `CALL create_user_vaccine(?, ?, ?, ?);`;
    let res;

    res = await db.query(sql, [id, name, vaccine, date]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res[0];
}

async function showVaccinatedLog(id) {
    let sql = `CALL show_vaccinated_info(?);`;
    let res;

    res = await db.query(sql, [id]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res[0];
}

async function editUser(id, mail, first, second, dateOfBirth, gender, mobile, address, post) {
    let sql = `CALL edit_user(?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    let res;

    res = await db.query(sql, [id, mail, first, second, dateOfBirth, gender, mobile, address, post]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res[0];
}

async function showOneVaccinated(id, name, vaccine, date) {
    let sql = `CALL show_one_vaccinated(?, ?, ?, ?);`;
    let res;

    res = await db.query(sql, [id, name, vaccine, date]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res[0];
}

async function deleteLogVaccinated(id, name, vaccine, date) {
    let sql = `CALL delete_log_vaccinated(?, ?, ?, ?);`;
    let res;

    res = await db.query(sql, [id, name, vaccine, date]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res[0];
}

async function editLogVaccinated(id, name, vaccine, date, newdate) {
    let sql = `CALL edit_log_vaccinated(?, ?, ?, ?, ?);`;
    let res;

    res = await db.query(sql, [id, name, vaccine, date, newdate]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res[0];
}