const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const User_Schema = Schema({
    favorites:{
        type: Array,
        require: true
    },
    privileges:{
        type: Array,
        require: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    last_login_date:{
        type: Date,
        required:false
    },
    position:{
        type: String,
        require: true
    },
    role:{
        type:String,
        required:true
    }
}, {
    timestamps: true
});

User_Schema.methods.toJSON = function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
};

User_Schema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


User_Schema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

User_Schema.statics.getFieldsInfo = function () {
    return Object.keys(this.schema.paths)
        .map(field => ({
            name: field,
            properties: this.schema.paths[field]
        }));
};

const User = model('users',User_Schema);

module.exports = User;
