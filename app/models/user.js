// Setting up the user to be able to login

let mongoose = require("mongoose");
// Is a cryptographic hashing function primarly used for securely storing password.
let bcrypt = require("bcrypt");

// Each schema maps to a mongoDB colleciton and defines the shape of the documents (the format)
let userShema = mongoose.Schema({
    local: {
        email: String,
        password: String
    },

    facebook: {
        id: String,
        token: String,
        name: String,
        email: String
    },
    twitter: {
        id: String,
        token: String,
        name: String,
        email: String
    },
    google:{
        id: String,
        token: String,
        name: String,
        email: String
    }
})

// Generating a hash

userShema.methods.generateHash = (password) =>{
    // HashSync generates a hjas for the given password
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

// Checking if the password is valid
userShema.methods.validPassword = (password) =>{
    // Syncronously tests a password against a hash.
    return bcrypt.compareSync(password, this.local.password);
}


// Exporting the model of the users to expose it to our apps
module.exports = mongoose.model("User", userShema);