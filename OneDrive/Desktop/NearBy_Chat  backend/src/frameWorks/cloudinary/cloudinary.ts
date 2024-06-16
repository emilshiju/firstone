




import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';


import {v2 as cloudinary} from 'cloudinary';



cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log("ehre")

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
     // @ts-ignore
      folder: '/CloudinaryDemo',
      allowedFormats: ['jpeg', 'png', 'jpg'],
  }                                                              
}); 
  // const upload = multer({storage:storage})

export default storage







//   interface CustomParams {
//     folder: string;
//     format?: string; // Add other properties as needed
//   }
  

//   console.log("uploasddddddddddddddddddddddddddddd")

// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//       folder:'uploads',
    
//     }as CustomParams,
   
//   });

// export  const parser = multer({ storage });






  
