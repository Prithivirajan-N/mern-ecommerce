const User = require('../modules/userModule');
const bcrypt = require("bcryptjs");
const { createToken, verifyToken } = require("../token/jwt");
const stripe = require('stripe')('sk_test_51Q3VbGF7TszP8Ns53xIm2i9Bh3IiRmQmuHctb6bx1F0jiF42lzXuBItTX0PhvXANfYT3oyzqAGwT6pYI0OJ6J0qP00cY78egpm'); // Replace with your actual Stripe secret key


const login = async (req,res)=>{
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found');
        }

        const comparedPassword = await bcrypt.compare(password, user.password);
        if (!comparedPassword) {
            return res.status(400).send('Invalid password');
        }

        // Generate a JWT token including user ID and email
        const token = await createToken({id: user._id, email: user.email});

        // Include user information in the response
        res.json({
            message: "User login successful",
            token,
            userName: user.userName,
        });
    } catch (err) {
        res.status(500).send("Server error");
    }
};

const signup = async (req,res)=>{
    const { userName, email, password, confirmPassword } = req.body;

    const trimmedUserName = userName ? userName.trim() : '';
    if (!trimmedUserName) {
        return res.status(400).send("User name is required");
    }

    if (password !== confirmPassword) {
        return res.status(400).send("Passwords do not match");
    }

    try {
        const existingUser = await WebUser.findOne({ email });
        if (existingUser) {
            return res.status(400).send("Email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new WebUser({ userName: trimmedUserName, email, password: hashedPassword });
        await user.save();
        res.status(201).send("User signed up successfully");
    } catch (err) {
        res.status(500).send("Error saving user");
    }
};

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: Token missing or malformed" });
        }

        const token = authHeader.split(" ")[1];
        const verified = await verifyToken(token);

        if (!verified) {
            return res.status(401).json({ message: "Unauthorized: Token verification failed" });
        }

        // Assign the verified user data to req.user
        req.user = verified; // Store the user information in the request object
        next(); // Continue to the next middleware or route handler
    } catch (err) {
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

//payment
const payment = async (req, res) => {
    const { token, product } = req.body;

    try {
        // Calculate the amount in the smallest currency unit (e.g., paisa for INR)
        const amountInCents = product.price;

        // Create the charge using Stripe
        const charge = await stripe.charges.create({
            amount: amountInCents,
            currency: 'INR',
            source: token.id, // Token from the frontend
            description: `Purchased ${product.name}`,
        });

        res.status(200).json({ message: 'Payment successful', charge });
    } catch (error) {
        console.error('Payment Error:', error);
        res.status(500).json({ message: 'Payment failed', error: error.message });
    }
};
 

  module.exports = {protect,login,signup,payment}