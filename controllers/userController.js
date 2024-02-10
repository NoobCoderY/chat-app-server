import User from "../models/user.js"
import { catchAsync } from "../utils/catchAsync.js";


export const updateMe=catchAsync(async(req,res,next)=>{

    const filteredBody = filterObj(
        req.body,
        "firstName",
        "lastName",
        "about",
        "avatar"
      );
    
      const userDoc = await User.findByIdAndUpdate(req.user._id, filteredBody);
    
      res.status(200).json({
        status: "success",
        data: userDoc,
        message: "User Updated successfully",
      });

})