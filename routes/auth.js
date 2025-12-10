import { Router } from "express";
import User from "../models/user.js"
import bcrypt from "bcrypt";
const router = Router();

// sign up (register)

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body; 
        const hashPassword = bcrypt.hashSync(password,10);
        const user = new User({ username: username, email: email, password: hashPassword })
        await user.save().then(() =>
            res.status(200).json({ message:"Sign up successfully, do sign in now" })
        );
    } catch (error) {
        res.status(200).json({message:"User already exist, you can do sign in"})
    }
})

// sign in (verifying)

router.post("/signin", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
          res.status(200).json({message:"Invalid email"})  
        }
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) {
            res.status(200).json({ message: "Password is not correct" });
        }

        const { password, ...others } = user._doc;
        res.status(200).json({ others });
    } catch (error) {
        res.status(400).json({message:error})
    }
})
export default router;