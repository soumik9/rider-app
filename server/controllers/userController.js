const User = require('../models/userSchema');

const getUsers = async (req, res) => {
    try {
        const user = await User.find({ role: ['rider', 'learner'] });
        res.send({ data: user, message: 'Successfully get user data!', success: true });
    } catch (error) {
        res.status(500).send({ error: error.message, message: 'Server side error', success: false });
    }
}

const blockUsers = async (req, res) => {
    try {

        await User.updateMany({ _id: { $in: req.body.selectedUser } },
            {
                $set: {
                    status: "block"
                }
            },
            { multi: true, new: true });

        res.send({ message: 'Successfully Updated Users!', success: true });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ error: error.message, message: 'Server side error', success: false });
    }
}

module.exports = { getUsers, blockUsers }