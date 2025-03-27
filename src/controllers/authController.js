import passport from "passport";
import jwt from "jsonwebtoken";

export const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleCallback = (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error", error: err });
    }
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Check if session exists before assigning
    if (req.session) {
      req.session.user = user;
    } else {
      console.warn("Session is not initialized!");
    }

    return res.json({ token, user });
  })(req, res, next);
};

export const logout = (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out successfully" });
    });
  } else {
    res.json({ message: "No active session found" });
  }
};
