const { Readable } = require('stream');
const { bucket } = require('../../app'); // Import the bucket from app.js
const { advertisingModel, File } = require("../../models/advertising/advertising");
const { adsModel } = require("../../models/advertising/ads")

exports.addAdvertising = async (req, res) => {
    const { file } = req;
    const { title, text, endDate } = req.body;

    try {
        if (
            req.user.admin.userPermission.indexOf(
                "إدارة الإعلانات"
            ) == -1
        ) {
            return res.status(403).send({
                msg: "لا تستطيع ادارة الاعلانات",
            });
        }
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
                title,text,endDate,imageId: newFile._id
            })
            await advertising.save();
        }else{
            const advertising = new advertisingModel({
                title,text,endDate
            })
            await advertising.save();
        }
        return res.status(200).send({ msg: "لقد تم اضافته بجاح" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
};
exports.repostAds = async (req, res) => {
    console.log(req.body)
    const { id, date, type} = req.body;
    try{
        if(type == "advertisings"){
            const ads = await advertisingModel.findByIdAndUpdate(id, {
                endDate: date
            });
        }else {
            const ads = await adsModel.findByIdAndUpdate(id, {
                endDate: date
            });
        }
        return res.status(200).send({
            msg: "تم اعادة النشر بنجاح"
        })
    }catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
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


exports.addAds = async (req, res) => {
    const { text, endDate } = req.body;
    try {
        const ads = new adsModel({
            text,endDate
        })
        await ads.save();
        return res.status(200).send({ msg: "لقد تم اضافته بجاح" , ads});
    }catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.getAds = async (req, res) => {
    console.log("h")
    try{
        const ads = await adsModel.find().sort({
            createdAt: -1
        });
        return res.status(200).send({
            ads
        })
    }catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.deleteAds = async (req, res) => {
    const { id }  = req.query;
    try{
        const ads = await adsModel.findByIdAndDelete(id);
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