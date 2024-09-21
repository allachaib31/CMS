const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const { userContestModel, validateUserContest } = require("../../models/user");
const JWTKEY = process.env.JWTKEY;
const SALTROUNDS = Number(process.env.SALTROUNDS);
const nodemailer = require('nodemailer');

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userContestModel.findOne({ email: email });
        if (!user) {
            return res.status(401).send({
                msg: "بريد إلكتروني أو كلمة المرور غير صحيحة"
            });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send({
                msg: "بريد إلكتروني أو كلمة المرور غير صحيحة"
            });
        }
        if(!user.active){
            return res.status(403).send({
                msg: "لم يتم تفعيل حسابك بعد"
            })
        }
        const token = jwt.sign({
            _id: user._id,
        }, JWTKEY);
        return res.status(200).send({
            msg: "تم تسجيل الدخول بنجاح",
            token
        });

    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.addUser = async (req, res) => {
    const { name, fakhidName, email, phoneNumber, password } = req.body;
    try {
        const { error } = validateUserContest({
            name, fakhidName, email, phoneNumber, password
        })
        if (error) {
            console.log(error)
            return res.status(422).send({
                msg: "يرجى ادخال جميع المدخلات والتأكد من صحتها",
            });
        }
        const genSalt = Number(await bcrypt.genSalt(SALTROUNDS));
        const hashPassword = await bcrypt.hash(password, genSalt);
        const user = userContestModel({
            name,fakhidName,email,phoneNumber,password: hashPassword
        })
        await user.save();
        return res.status(200).send({
            msg: "سوف يتم تفعيل حسابك بعد التاكد من بياناتك في غضون 48 ساعة",
        })
    } catch (error) {
        console.log(error)
        if (error.code === 11000) {
            if (error.keyPattern.email) {
                message = 'بريد إلكتروني موجود بالفعل';
            }
            return res.status(422).send({
                msg: message
            });
        }
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getUsers = async (req, res) => {
    try{
        const user = await userContestModel.find().select("_id id name fakhidName email phoneNumber active");
        return res.status(200).send({
            users: user.reverse()
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.deleteUser = async (req, res) => {
    const { id } = req.query;
    try{
        const user = await userContestModel.findByIdAndDelete(id);
        if(!user){
            return res.status(404).send({
                msg: "لم يتم العثور على العضو"
            })
        }
        return res.status(200).send({
            msg: "تم حذف العضو بنجاح"
        })
    }catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.validation = async (req, res) => {
    return res.status(200).send({
        msg: "تم تسجيل الدخول بنجاح",
        user: req.user
    });
}

exports.activeUser = async (req, res) => {
    const { id } = req.body;
    try{
        const user = await userContestModel.findByIdAndUpdate(id, {
            active: true
        });
        return res.status(200).send({
            msg: "تم تفعيل المستخدم بنجاح"
        })
    }catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
} 

exports.forgetPassword = async (req, res) => {
    console.log(req.body)
    let transporter = nodemailer.createTransport({
        host: 'mail.binhshah.com',
        port: 465, // Port pour SMTP sécurisé
        secure: true, // true pour 465, false pour les autres ports
        auth: {
            user: 'info@binhshah.com', // votre nom d'utilisateur
            pass: '@uIupV#Tt$2o' // votre mot de passe
        }
    });
    
    // Définissez les options d'envoi de l'email
    let mailOptions = {
        from: 'info@binhshah.com', // expéditeur
        to: 'allachaib54@gmail.com', // destinataire
        subject: 'Sujet de l\'email',
        text: 'Texte en clair de l\'email', // texte brut
        html: '<b>Texte en HTML de l\'email</b>' // texte en HTML
    };
    
    // Envoyez l'email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email envoyé: %s', info.messageId);
    });
    
}