import userSchema from "./UserSchema.js";

// Help to insert user
export const insertUser = (obj) => {
  // This code basically returns promise whch goes to the database and insert the given data for us
  return userSchema(obj).save();
};

// Help to get one user // filter should be one
export const getOneUser = (filter) => {
  return userSchema.findOne(filter);
};

// fetch data returns the query not promise but when we do await to thros data in array of object
export const deleteManyTask = (ids) => {
  return userSchema.deleteMany({
    _id: {
      $in: ids,
    },
  });
};
