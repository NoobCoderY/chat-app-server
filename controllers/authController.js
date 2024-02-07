import User from "../models/user.js"
import jwt from "jsonwebtoken"
import { catchAsync } from "../utils/catchAsync.js";


// this function will return you jwt token
const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET);

export const login = catchAsync(
    async () => {
    
        const { email, password } = req.body;
      
        if (!email || !password) {
          res.status(400).json({
            status: "error",
            message: "Both email and password are required",
          });
          return;
        }
      
        const user = await User.findOne({ email: email }).select("+password");
      
        if (!user || !user.password) {
          res.status(400).json({
            status: "error",
            message: "Incorrect password",
          });
      
          return;
        }
      
        if (!user || !(await user.correctPassword(password, user.password))) {
          res.status(400).json({
            status: "error",
            message: "Email or password is incorrect",
          });
      
          return;
        }
      
        const token = signToken(user._id);
      
        res.status(200).json({
          status: "success",
          message: "Logged in successfully!",
          token,
          user_id: user._id,
        });
    
}
)