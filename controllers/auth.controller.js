const bcrypt = require("bcryptjs");

const User = require("../models/users.model");

exports.signup = async (req,res,next) => {
    try{
        const {username, password} = req.body;
        const hashPassword = await bcrypt.hash(password,12);
        const newUser = await User.create({
            username: username,
            password: hashPassword
        });
        req.session.user = newUser;
        res.status(201).json({
            status: 'success',
            data: newUser
        })
    }
    catch(e){
        console.log("Error ",e);
        res.status(400).json({
            status: 'failed'
        })
    }
}

exports.login = async(req,res,next) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({
            username: username
        });

        if(!user){
            return res.status(404).json({
                status: 'failed',
                message: 'Invalid user'
            })
        }

        const isPasswordsMatch = await bcrypt.compare(password, user.password);

        if(isPasswordsMatch){
            req.session.user = user;
            res.status(200).json({
                status: 'success'
            })
        }
        else{
            res.status(403).json({
                status: 'failed',
                message: 'Incorrect username/password'
            })
        }
    }
    catch(e){
        console.log("Error ",e);
        res.status(400).json({
            status: 'failed'
        })
    }
}

exports.getUsers = async(req,res,next) => {
    try{
        const userDetails = await User.find();
        res.status(200).json({
            status: 'success',
            data: userDetails
        })
    }
    catch(e){
        res.status(400).json({
            status: 'failed'
        })
    }
}

exports.getIndividualUser = async(req,res,next) => {
    try{
        const userDetail = await User.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: userDetail
        })
    }
    catch(e){
        res.status(400).json({
            status: 'failed'
        })
    }
}

exports.deleteUser = async(req,res,next) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success',
            deletedUser: deletedUser
        })
    }
    catch(e){
        res.status(400).json({
            status: 'failed'
        })
    }
}

exports.updateUser = async(req,res,next) => {
    try{
        await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({
            status: 'updated'
        })
    }
    catch(e){
        res.status(400).json({
            status: 'failed'
        })
    }
}