import { pool } from "../config/database.js"; // Adjust the path if needed

export const findOrCreateUser = async (profile) => {
  try {
    // Check if user exists in the database
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [
      profile.emails[0].value,
    ]);

    if (existingUser.rows.length > 0) {
      return existingUser.rows[0]; // Return user
    }

    // Create new user
    const newUser = await pool.query(
      "INSERT INTO users (fname, lname, email, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [profile.name.givenName, profile.name.familyName, profile.emails[0].value, "user"]
    );

    return newUser.rows[0]; // Return new user
  } catch (error) {
    throw new Error(error);
  }
};
