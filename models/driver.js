//require mongoose to use mongodb in our application
const mongoose = require('mongoose');
//getting Schema class from mongoose
const Schema = mongoose.Schema;
//create GeoSchema & model
const GeoSchema = new Schema({
  type : {
    type: String,
    default : "Point"
  },
  coordinates : {
    type : [Number],
    index : "2dsphere"
  }
});
//create drivers Schema & model
//create object of schema for defining schema
const DriverSchema = new Schema({ //
        id : {
          type : Number,
          required: [true,"id field required"]
        },
        name : {
          type : String,
          required: [true,"Name field required"]
        },
        exp : {
          type : Number,
          default : 0
        },
        avail : {
            type : Boolean,
            default : false
        },
        geolocation : GeoSchema
});
//create model to use in our application  Here model is kind on database
const Driver = mongoose.model('driver',DriverSchema);
//export model so that other application parts can use it
module.exports = Driver;
