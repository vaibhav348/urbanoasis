import connectDB from "@/db";
import User from "@/models/user-model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export default async function heandler(req, res) {
    if (req.method === "POST") {
        connectDB();
        const { name, email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ mag: "All field are mandetory" })
        }

        const emailExists = await User.findOne({ email });

        if (!emailExists) {
            return res.status(400).json({ mag: "please register firlst" })
        }
        const username = emailExists.name;
        const passwordMatched = await bcrypt.compare(password, emailExists.password);

        if (!passwordMatched) {
            return res.status(400).json({ mag: "Invalid cradantials" })
        }

        const token = jwt.sign({
            token: emailExists._id
        },
            process.env.JWT_SECRATE,
            { expiresIn: "20d" }
        )

        res.status(200).json({ msg: "Logged in successfully", token, username, email })

    }
}