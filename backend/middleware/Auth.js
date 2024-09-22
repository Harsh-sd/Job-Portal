const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
    try {
        console.log("Middleware Attached");

        // Log the incoming headers to see if Authorization is present
        console.log("Request Headers:", req.headers);

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: " !! Authorization header not found !!",
                success: false
            });
        }

        // Log the value of authHeader to see what you're getting
        console.log("Authorization Header:", authHeader);

        // Split the Authorization header and get the token part
        const token =   authHeader
        console.log("Extracted Token:", token); // Log the extracted token
        if (!token) {
            return res.status(401).json({
                message: " !! Token not found !!",
                success: false
            });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        if (!decodedToken) {
            return res.status(401).json({
                message: " !! Invalid token, please try again !!",
                success: false
            });
        }

        req.id = decodedToken.userId;
        console.log('Decoded Token:', decodedToken);

        next();

    } catch (error) {
        console.log("Error in authentication middleware:", error);
        return res.status(401).json({
            message: " !! Invalid or expired token !!",
            success: false
        });
    }
};

module.exports = isAuthenticated;
