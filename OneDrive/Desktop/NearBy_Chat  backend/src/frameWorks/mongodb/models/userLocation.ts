import { required } from "joi";
import mongoose,{Schema,model, Types} from "mongoose";


const locationSchema=new Schema(
    {
        userId:{
            type:Types.ObjectId,
            required:true,
            // ref:"users"
            ref:"Profiles"
        },
        location: {
            type: {
              type: String,
              enum: ['Point'], // GeoJSON type
              required: true,
            },
            coordinates: {
              type: [Number], // Array of numbers [longitude, latitude]
              required: true,
            },
          },
        // radius:{
        //     type:Number,
        //     required:true
        // }
        
    },
    {
        timestamps: true 
    }
)
locationSchema.index({ location: "2dsphere" });

const locationModel=model("locations",locationSchema)




export default locationModel



locationModel.on('index', error => {
  if (error) {
    console.error('Index creation failed:', error);
  } else {

    console.log('Indexes created successfullyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
  }
});



