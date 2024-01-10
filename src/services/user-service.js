const {UserRepository}=require('../repositories');
const AppError=require('../utils/errors/app-error')
const {StatusCodes}=require('http-status-codes');
const userRepository=new UserRepository();
const bcrypt=require('bcrypt');
const {Auth}=require('../utils/common');

async function create(data){
    try {
        const user=await userRepository.create(data);
        return user;
    } catch (error) {
        if(error.name=='SequelizeValidationError' || error.name=='SequelizeUniqueConstraintError'){
            let explanation=[];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new user object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function signin(data){
    try {
        const user=await userRepository.getUserByEmail(data.email);
        if(!user){
            throw new AppError("No user found for the given email",StatusCodes.NOT_FOUND);
        }
        const passwordMatch=Auth.checkPassword(data.password,user.password);
        if(!passwordMatch){
            throw new AppError("Invalid Password",StatusCodes.BAD_REQUEST);
        }
        const jwt=Auth.createToken({id:user.id,email:user.email});
        return jwt;

    } catch (error) {
        console.log(error);
        throw error;
    }
}



module.exports={
    create,
    signin
}