const { Readable } = require('stream');
const { bucket } = require('../../app'); // Import the bucket from app.js
const { advertisingModel, File } = require("../../models/advertising/advertising")

exports.addAdvertising = async (req, res) => {
    const { file } = req;
    const { text, endDate } = req.body;

    try {
        // Create a writable stream to GridFS
        if(file){
            const { originalname, mimetype, buffer } = file;
            let uploadStream = bucket.openUploadStream(originalname, {
                contentType: mimetype
            });
    
            // Create a readable stream from the buffer
            let readBuffer = new Readable();
            readBuffer.push(buffer);
            readBuffer.push(null);
    
            // Pipe the buffer to GridFS
            await new Promise((resolve, reject) => {
                readBuffer.pipe(uploadStream)
                    .on('finish', resolve)
                    .on('error', reject);
            });
    
            // Save file metadata in MongoDB
            let newFile = new File({
                filename: originalname,
                contentType: mimetype,
                length: buffer.length,
                id: uploadStream.id
            });
    
            let savedFile = await newFile.save();
            if (!savedFile) {
                return res.status(404).send("حدث خطأ أثناء حفظ البيانات التعريفية للملف");
            }
            const advertising = new advertisingModel({
                text,endDate,imageId: newFile._id
            })
            await advertising.save();
        }else{
            const advertising = new advertisingModel({
                text,endDate
            })
            await advertising.save();
        }
        return res.send({ msg: "لقد تم اضافته بجاح" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
};
exports.getAdvertising = async (req, res) => {
    try{
        const advertising = await advertisingModel.find().sort({
            createdAt: -1
        });
        return res.status(200).send({
            advertising
        })
    }catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.deleteAdvertising = async (req, res) => {
    const { id }  = req.query;
    try{
        const advertising = await advertisingModel.findByIdAndDelete(id);
        return res.status(200).send({
            msg: "تم حذف العنصر بنجاح"
        })
    }catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getAdvertisingImage = async (req, res) => {
    const { id } = req.params;

    try {
        // Retrieve file metadata from your database
        const file = await File.findById(id);

        if (!file) {
            return res.status(404).send("File not found.");
        }

        // Use file metadata to get content type
        const contentType = file.contentType || 'application/octet-stream'; // Default content type if not found

        // Open a download stream using the file's ObjectId
        const downloadStream = bucket.openDownloadStream(file.id);

        downloadStream.on('error', (error) => {
            console.log(error);
            return res.status(500).send("Error occurred while retrieving the file.");
        });

        // Set the content type from the metadata
        res.setHeader('Content-Type', contentType);

        // Pipe the download stream to the response
        downloadStream.pipe(res);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error occurred while retrieving the file.");
    }
};