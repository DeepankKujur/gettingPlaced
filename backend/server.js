import app from "./app.js"
import cloudinary from "cloudinary"
//cloudinary allows users to manage, store, and deliver images and videos for websites and mobile apps
cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
    cloud_key:process.env.CLOUDINARY_CLIENT_API,
    cloud_secret:process.env.CLOUDINARY_CLIENT_SECRET
})

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})