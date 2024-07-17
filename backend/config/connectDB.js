const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
            .then((con) => {
                console.log("Database connected successfully ", con.connection.host)
            })


    } catch (err) {
        console.log(err.message)
    }
}

module.exports = connectDB;