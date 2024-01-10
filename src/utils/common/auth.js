const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {ServerConfig}=require('../../config');
const AppError = require('../errors/app-error');
const { StatusCodes } = require('http-status-codes');

function checkPassword(plainPassword, encryptedPassword){
    try {
        return bcrypt.compareSync(plainPassword,encryptedPassword);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function createToken(input){
    try {
        return jwt.sign(input,ServerConfig.JWT_SECRET,{expiresIn:ServerConfig.JWT_EXPIRY});
    } catch (error) {
        console.log(error);
        throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    checkPassword,
    createToken
}