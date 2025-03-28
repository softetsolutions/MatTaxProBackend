import jsonwebtoken from "jsonwebtoken";
import userRepositery from "../repositery/userRepositery.js";
import EctDct from '../config/managePassword.js';

 class userAuth {
  // User Login
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userRepositery.getUserEmail(email);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      console.log(user, "req user");

      const isPasswordValid = await EctDct.decrypt(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate new token
      const authToken = jsonwebtoken.sign(
        { email: user.email, role: user.userRole },
        process.env.JWT_KEY,
        {
          expiresIn: process.env.JWT_TIME,
        }
      );

      // Update token in database
    //   user.authToken = authToken;
    //   await user.save();
    //   req.user = user;

      // Set token in cookies
      res.cookie("authToken", authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1000, // 1 hour
        sameSite: "Strict",
      });

      return res.status(200).json({ authToken });
    } 
    catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  }

  // User Logou
}

export default new userAuth();
