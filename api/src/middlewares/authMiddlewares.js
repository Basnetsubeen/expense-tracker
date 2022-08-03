import { getOneUser } from "../model/UserModel.js";

export const authMiddlewares = async (req, res, next) => {
  try {
    //do authorization headers avaiable
    const { authorization } = req.headers;
    if (authorization) {
      // do user exit in the db
      const user = await getOneUser({ _id: authorization });
      if (user?.id) {
        req.userInfo = user;
        return next();
      }
    }
    res.status(403).json({
      status: "error",
      message: "Unauthorization",
    });
  } catch (error) {
    next(error);
  }
};
