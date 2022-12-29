import '../models/db.mjs';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const PORT = 4000;
const app = express();
const upload = multer({ dest: 'uploads' });
const File = mongoose.model('File');
const Contact = mongoose.model('Contact');
const User = mongoose.model('User');
var ssn;
console.log("URL", process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true });
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "XASDASDA" }));
app.use((req, res, next) => {
    next();
});

const endAuthenticatedSession = (req, cb) => {
    req.session.destroy(function (err) {
        if (!err) {
            cb(null);
        } else {
            cb({ message: "error" });
        }
    });
};

app.post("/register", (req, res) => {
    // hash the password
    bcrypt
        .hash(req.body.password, 10)
        .then((hashedPassword) => {
            // create a new user instance and collect the data
            const user = new User({
                email: req.body.email,
                password: hashedPassword,
            });

            // save the new user
            user
                .save()
                // return success if the new user is added to the database successfully
                .then((result) => {
                    res.status(201).send({
                        message: "User Created Successfully",
                        result,
                    });
                })
                // catch error if the new user wasn't added successfully to the database
                .catch((error) => {
                    res.status(500).send({
                        message: "Error creating user",
                        error,
                    });
                });
        })
        // catch error if the password hash isn't successful
        .catch((e) => {
            res.status(500).send({
                message: "Password was not hashed successfully",
                e,
            });
        });
});
app.get("/logout", (req, res) => {
    console.log("logout");
    ssn.user = null;
    endAuthenticatedSession(req, () => {
        res.send({ message: "logout" });
        //sres.redirect("/login");
    });

});
app.post("/login", (request, response) => {
    // check if email exists

    console.log("login", { email: request.body.email });
    User.findOne({ email: request.body.email })
        // if email exists
        .then((user) => {
            console.log("found", user);
            // compare the password entered and the hashed password found
            bcrypt
                .compare(request.body.password, user.password)
                // if the passwords match
                .then((passwordCheck) => {
                    // check if password matches
                    if (!passwordCheck) {
                        console.log("Passwords does not match");
                        return response.status(400).send({
                            status: -2,
                            message: "Passwords does not match",
                            //error,
                        });
                    }
                    //   create JWT token
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            userEmail: user.email,
                        },
                        "RANDOM-TOKEN",
                        { expiresIn: "24h" }
                    );
                    ssn = request.session;
                    console.log("TOKEN:", token, user);
                    ssn.user = user;
                    //   return success response
                    response.status(200).send({
                        status: 1,
                        message: "Login Successful",
                        email: user.email,
                        token,
                    });
                })
                // catch error if password does not match
                .catch((error) => {
                    console.log("ERROR:", error);
                    response.status(400).send({
                        status: -1,
                        message: "Passwords does not match",
                        error,
                    });
                });
        })
        // catch error if email does not exist
        .catch((e) => {
            response.status(404).send({
                message: "Email not found",
                e,
            });
        });
});
app.get("/currentUser", (request, response) => {
    try {
        console.log("currentUser", ssn.user);
        response.send({ user: ssn.user });
    } catch (e) {
        console.log("currentUser: null");
        response.send(null);
    }
});
// free endpoint
const RELEASE = "20221120";
app.get("/release", (request, response) => {
    response.json({ message: RELEASE });
});

// authentication endpoint
app.get("/auth-endpoint", (request, response) => {
    response.json({ message: "You are authorized to access me" });
});

app.post("/contact", async (req, res) => {
    const contactData = { lastName: req.body.lastName, firstName: req.body.firstName, email: req.body.email, message: req.body.message };
    const contact = await Contact.create(contactData);
    console.log("post contact", contact);
    res.send(contact);
});

app.post("/upload", upload.single("file"), async (req, res) => {
    console.log("upload");
    const fileData = {
        path: req.file.path, filename: req.file.originalname, type: req.file.mimetype,
    }
    console.log("fileData", fileData);

    const file = await File.create(fileData);
    res.send(fileData);
});

app.get("/file/:id", async (req, res) => {
    const id = req.params.id;
    console.log("file", id);
    const file = await File.findById(req.params.id);

    file.downloadCount++;
    await file.save();
    console.log(file.downloadCount);

    res.download(file.path, file.filename);
});
app.get("/search/:nm", async (req, res) => {
    const nm = req.params.nm;
    console.log("file", nm);
    const files = await File.find({ filename: { $regex: nm } });
    res.send(files);
});
app.get("/files/", async (req, res) => {
    const files = await File.find();;

    console.log("FILES", files);

    res.send(files);
});
console.log("PORT", process.env.PORT);
app.listen(PORT);
console.log(`listening on port ${PORT}`);

export default app;