import { ImageKit } from "@imagekit/nodejs";
import fs from "fs";
import dotenv from "dotenv"

dotenv.config();


const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,

});

const uploadImage = async (filePath, fileName) => {
    const result = await imagekit.files.upload({
        file: fs.createReadStream(filePath),
        fileName: fileName,
        folder: "/profile-pictures"
    })

    return result;
}

export default uploadImage;