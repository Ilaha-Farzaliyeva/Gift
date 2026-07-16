import { userModel } from "../models/userModel.js";

export const getAllUser = async (req, res) => {
    try {
        const user = await userModel.find({})
        res.send(user)
    } catch (error) {
        res.send(error.message)
    }
}

export const getByIdUser = async (req, res) => {
    try {
        const { id } = req.params
        const decoded = req.decoded
        const user = await userModel.findById(id)
        if (decoded.username !== user.username && decoded.role === "user") {
            return res.send("You don't have access")
        }
        res.send(user)
    } catch (error) {
        res.send(error.message)
    }
}
export const createUser = async (req, res) => {
    try {
        const newUser = new userModel(req.body)
        await newUser.save()
        res.send(newUser)
    } catch (error) {
        res.send(error.message)
    }
}

export const updateByIdUser = async (req,res)=>{
    try {
     const {id} = req.params
     const user = await userModel.findByIdAndUpdate(id, req.body)
        res.send(user)   
    } catch (error) {
        res.send(error.message)
    }
}

export const deleteByIdUser = async (req,res)=>{
    try {
        const {id} =req.params
        await userModel.findByIdAndDelete(id)
        res.send("Deleted")
    } catch (error) {
        res.send(error.message)
    }
}