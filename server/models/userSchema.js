const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name filed is required']
    },
    email: {
        type: String,
        required: [true, 'Email filed is required']
    },  
    age: {
        type: String,
        required: [true, 'Age filed is required']
    },  
    address: {
        type: String,
        required: [true, 'Address filed is required']
    }, 
    phone: {
        type: String,
        required: [true, 'Phone filed is required']
    },  
    image: {
        type: String,
        required: [true, 'Profile image is required']
    }, 
    nid: {
        type: String,
        required: [true, 'Nid image is required']
    },  
    drivingLicence: String, 
    carName: String,
    carModel: String,
    namePlate: String,
    vehicleType: {
        type: String,
        default: '',
        enum: {
            values: ['car', 'bike'],
            message: "role value can not be {VALUE}, must be car/bike"
        }
    },
    password: {
        type: String,
        required: [true, 'Password filed is required'],
    },
    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
    },
    role: {
        type: String,
        default: 'rider',
        enum: {
            values: ['admin', 'rider', 'learner'],
            message: "role value can not be {VALUE}, must be admin/rider/learner"
        }

    },  
    status: {
        type: String,
        default: 'active',
        enum: {
            values: ['active', 'banned'],
            message: "role value can not be {VALUE}, must be active/banned"
        }

    },
}, { timestamps: true });


const User = new mongoose.model("User", userSchema);
module.exports = User