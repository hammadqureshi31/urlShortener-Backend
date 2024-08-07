import { user } from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "testing"; // Use environment variable for the secret

// Create a new user
export async function handleCreateNewUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).send("All fields are required");

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await user.create({
      name,
      email,
      password: hash,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating new user:", error); // Enable error logging for debugging
    res.status(500).send("Something went wrong");
  }
}

// Authenticate user and issue a JWT
export async function handleGetUserByEmailAndPass(req, res) {
  const { email, password } = req.body;

  try {
    const LoginUser = await user.findOne({ email });
    if (!LoginUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, LoginUser.password);
    if (isMatch) {
      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' }); // Set token expiration
      res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

      return res.json({ token, currentUser: LoginUser });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Something went wrong", error); // Enable error logging for debugging
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Log out user by clearing the cookie
export async function handleLogoutUser(req, res) {
  try {
    res.cookie("token", "", { expires: new Date(0), httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    return res.status(200).send("Successfully logged out.");
  } catch (error) {
    console.error("Error logging out:", error); // Enable error logging for debugging
    return res.status(500).send("An error occurred while logging out.");
  }
}
