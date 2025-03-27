import { pool } from "../config/database.js";

class userRepositery {
  async createUser(body) {
    // const fields = Object.keys(body);
    // const values = Object.values(body);
    // const placeholders = fields.map((_, i) => `$${i + 1}`).join(', ');
    const query = `INSERT INTO users (${Object.keys(body).join(', ')}) VALUES (${Object.keys(body).map((_, i) => `$${i + 1}`).join(', ')}) RETURNING *;`;
    return (await pool.query(query, Object.values(body))).rows[0];
  }

  async getUsers() {
    return (await pool.query("SELECT * FROM users")).rows;
  }

  async getUserById(id) {
    return (await pool.query("SELECT * FROM users WHERE id = $1", [id])).rows[0];
  }

  async getUserEmail(email) {
    return (await pool.query("SELECT * FROM users WHERE email = $1", [email])).rows[0];
  }

  async updateUser(id, body) {
    console.log(body);
    
    const fields = Object.keys(body);
    const set = fields.map((field, i) => `${field} = $${i + 1}`).join(', ');
    const query = `UPDATE users SET ${set} WHERE id = ${id} RETURNING *`;

    return (await pool.query(query, Object.values(body))).rows[0];
  }

  async deleteUser(id) {
    return (await pool.query(`DELETE FROM users WHERE id = ${id} RETURNING *`))
  }

  async findOrCreateUser(userData) {
    const existingUser = await this.getUserByEmail(userData.email);
    if (existingUser) {
      return existingUser;
    }

    return await this.createUser({
      fname: userData.fname || "",
      lname: userData.lname || "",
      email: userData.email,
      role: userData.role || "user",
      provider: userData.provider || "google",
    });
  }
  
}

export default new userRepositery();
