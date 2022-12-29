import mongoose from 'mongoose';
import mongooseSlugPlugin from 'mongoose-slug-plugin';
const Schema = mongoose.Schema;
const ATLAS_URL = "mongodb+srv://<user>:<password>@cluster0.j9u3a6i.mongodb.net/?retryWrites=true&w=majority";



const fileSchema = new Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: false },
    password: { type: String, required: false },
    downloadCount: { type: Number, required: true, default: 0 },
    uuid: { type: String, required: false },
    type: { type: String, required: true },
    sender: { type: String, required: false },
    receiver: { type: String, required: false },
}, { timestamps: true });

const userSchema = new Schema({
    //username: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, unique: true, required: true }
});
const contactSchema = new Schema({
    lastName: { type: String, required: false },
    firstName: { type: String, required: false },
    email: { type: String, required: false },
    message: { type: String, required: false }
});

userSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=email%>' });
fileSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=filename%>' });

mongoose.model('User', userSchema);
mongoose.model('File', fileSchema);
mongoose.model('Contact', contactSchema);
mongoose.connect(ATLAS_URL);