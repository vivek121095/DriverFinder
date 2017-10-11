/*This file handles requests made on website
chalmerebhai
*/

//requires express and express router
const express = require('express');
//insted of calling app we setup router object
const router = express.Router();
//require driver model from
const DriverModel = require('../models/driver');


/*define requests here........*/

//FOR GETTING UBER RIDES
router.get('/drivers',
  //handle /drivers request
  function(req , res , next) {
    DriverModel.geoNear(
              {
                type : 'Point',
                coordinates : [parseFloat(req.query.lng),parseFloat(req.query.lat)]
              },
              {
                maxDistance : 100000,
                spherical : true
              }
            ).then(
              function(drivers) {
                  res.send(drivers);
              }
          );
  }
);
//FOR ADDING NEW DRIVER
router.post('/drivers',
  //handle /drivers request
  function(req , res , next) {
    //create is mongoose method which defines new mongodb
    //object and stores it into database
    DriverModel.create(req.body)
                .then(function(driver){// this functions executes after create method returns
                  //setting response to driver just created
                  res.send(driver);
                }).catch(next);
  }
);
//FOR UPDATING DRIVER INFO passed as ID
router.put('/drivers/:id',
  //handle /drivers/:id request
  function(req , res , next) {
    DriverModel.findByIdAndUpdate({"_id" : req.params.id},req.body).then(
      function() {
        DriverModel.findOne({"_id" : req.params.id}).then(function(driver) {
            res.send(driver);
        }).catch(next);
      }
    ).catch(next);
  }
);
//FOR DELETING DRIVER INFO passed as ID
router.delete('/drivers/:id',
  //handle /drivers/:id request
  function(req , res , next) {
    DriverModel.findOne({id:parseFloat(req.params.id)}).then(function (driver) {
    //  console.log(driver._id);
                DriverModel.findByIdAndRemove({_id: driver._id}).then(
                  function(driver){
                    //setting response to driver just deleted to notify front end
                    res.send(driver);
                  }
                );
     }).catch(next);
    //console.log(req.params.id);
  }
);

router.get('/drivers/:id',
    function (req,res,next) {
          DriverModel.findOne({id:parseFloat(req.params.id)}).then(function (driver) {
            res.send(driver);
          }).catch(next);
    }
);
/*export router to use it as middleware in our index file*/
module.exports = router;
