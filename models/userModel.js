const connection = require('../configer/database');

const User = {
    create: (data, callback) => {
        const query = 'INSERT INTO admin (email, password, mobile, fname, lname, role) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(query, [data.email, data.password, data.mobile, data.fname, data.lname, data.role], callback);
    },
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM admin WHERE email = ?';
        connection.query(query, [email], callback);
    },
    findById: (id, callback) => {
        const query = 'SELECT * FROM admin WHERE id = ?';
        connection.query(query, [id], callback);
    },
    updateById: (id, data, callback) => {
        const query = 'UPDATE admin SET email = ?, password=?, mobile=?, fname=?, lname=? WHERE id = ?';
        connection.query(query, [data.email, data.password, data.mobile, data.fname, data.lname, data.role, id], callback);
    },
    deleteById: (id, callback) => {
        const query = 'DELETE FROM admin WHERE id = ?';
        connection.query(query, [id], callback);
    },
    getAllUsers: (callback) => {
        const query = 'SELECT * FROM admin';
        connection.query(query, callback);
    }
};

module.exports = User;