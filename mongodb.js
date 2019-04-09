//CRUD create read update delete
const mongodb = require("mongodb");
/* ;
const MongoClient = mongodb.MongoClient;//give access to the functions necessary to connect to perform crud operation on DB.
const ObjectID = mongodb.ObjectID; */

//using destructuring.
const { MongoClient } = mongodb;

//
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";
//define connection url in the db being connected to.

//connect to the server.
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    //called when db is connected to the server.
    //connect is an async call.
    if (error) {
      return console.log("Unable to connect to databse.");
    }
    const db = client.db(databaseName); //return a db reference.
    /*    db.collection('users').insertOne({
       _id: id,
       name: 'mahadev',
       age: 100000
   },(error, result)=>{
       //called when insertOne is executed.
       if(error) {
           return console.log('Unble to insert user');
       }
       console.log(result.ops);
   }); */
/*  db.collection('users').insertMany([
       {
           name:'Arjun',
           age: 27
       },{
           name:'Durgesh',
           age:26
       }],(error,result)=>{
           if(error){
               return console.log('unable to insert documents.');
           }
           console.log(result.ops);
       });  */

    /*        db.collection('tasks').insertMany([
           {
               description: 'Clean the house',
               completed: true
           },{
               description: 'Renew inspection',
               completed: false
           },
           {
               description: 'call samit',
               completed: false
           }
       ],(error,result)=>{
           if(error) {
               return console.log('Could not insert users.');
           }
           console.log(result.ops);
       }) */
    /*        db.collection('users').findOne({name:'Arjun'}, (error, user)=>{
        if(error){
            return console.log('Unable to fetch');
        }    
        console.log(user);
       }); */

    /*        db.collection('users').find({age:26}).toArray((error, user)=>{
            console.log(user);
       });

       db.collection('users').find({age:26}).count((error, count)=>{
           console.log(count);
       });

       //Challenges.
       db.collection('tasks').find({completed: false}).toArray((error, users)=>{
           console.log(users);
       }); */
/*     db.collection("users")
      .updateOne(
        { name: "Rajan" },
        {
          $inc: { age: 3 }
        }
      )
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      }); */

/*       db.collection('tasks').updateMany(
          {
              completed: false
          },{
              $set:{
                  completed: false
              }
          }
      ).then((result)=>{
          console.log(result.matchedCount)
      }).catch((error)=>{
        console.log(error);
      }); */

/*       db.collection('users').deleteMany(
          {
              age: 26
          }
      ).then((result)=>{
        console.log(result.deletedCount);
      }).catch((error)=>{
          console.log(error);
      }) */

      db.collection('users').deleteOne(
          {
              age: 27
          }
      ).then((result)=>{
          console.log(result.deletedCount);
      }).catch((error)=>{
          console.log(error);
      });


  }
);
