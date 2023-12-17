const pool = require("./db/db");

const getUsers = (req: any, res: any) => {
  pool.query("SELECT * FROM students", (error: any, results: any) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getUsers,
};
