import PouchDB from "pouchdb";
var db = new PouchDB("my_database_9");

export const addUser = (user) => {
  return new Promise((resolve, reject) => {
    db.put(user, function (err, response) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log("Document created Successfully");
        console.log(response);
        resolve(response);
      }
    });
  });
};

export const getUser = (address) => {
  return new Promise((resolve, reject) => {
    db.get(address, function (err, doc) {
      if (err) {
        console.log(err);
        resolve(err);
      } else {
        console.log(doc);
        resolve(doc);
      }
    });
  });
};

export const updateUser = (address, user) => {
  return new Promise((resolve, reject) => {
    db.get(address, function (err, doc) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        db.put({ ...doc, user }, function (err, response) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log("Document updated Successfully");
            console.log(response);
            resolve(response);
          }
        });
      }
    });
  });
};
