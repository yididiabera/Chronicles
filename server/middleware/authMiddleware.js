import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token) {
        const error = new Error("Unauthorized.")
        error.status = 401;
        return next(error);
    }

    jwt.verify(token, process.env.JWT_SECRET, ( err, user
    ) =>{ if(err) {
        const error = new Error("Invalid token.");
        error.status = 403;
        return next(error);
    }
    req.user = user;
    next();});

}