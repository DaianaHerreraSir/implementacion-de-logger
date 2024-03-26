

import { CustomError } from "../errors/CustomError.js"
import { EErrorrs } from "../errors/enums.js"
import { generateUserErrorInfo } from "../errors/info.js"
import { UserDto } from "../dto/userDto.js"
import userService from "../repository/index.repository.js"

 


export class UserControllers{
        constructor(){
            this.service = userService
        }

//llama a todos los usuario
 getUsers= async(req, res) =>{
    try {
        const users = await this.service.getUsers()
    } catch (error) {
        res.send({status: "error", message: error})
        
    }
}

//llama a un usuario por id
 getUserBy= async(req,res)=>{
   try {
    const {uid} = req.params
    const user =await this.userService.getUserBy()
   res.send(user)

} catch (error) {
    res.send({status: "error", message: error})
        
   } 
}

//Crea un usuario
createUser = async (req, res, next)=>{
    try {
        const{first_name, last_name, email, password}= req.body
        
        if(!first_name || !last_name || !email){
            CustomError.createError({
                name: "User creation error",
                cause: generateUserErrorInfo({
                    first_name,
                    last_name,
                    email
                }),
                message: "Error creating a user",
                code: EErrorrs.INVALID_TYPE_ERROR
            })
        }
        const userNew = new UserDto({
            first_name,
            last_name,
            email,
            password
        })
        const result = await this.userService.createUser(userNew)
        
        res.status(200).send({
            status:"success",
            usersCreate: result
        })
    } catch (error) {
      next (error)
    }
}

//Actualiza el usuario
 updateUser = async(req, res)=>{
    try {
        const {uid}= req.params
        const userToUpdate= req.body
        const result = await this.service.updateUser(uid, userToUpdate)
    
        res.status(200).send({
            status:"success",
            message: result
        })
    } catch (error) {
        res.send({status: "error", message: error})
    }
}

//Elimina un usuario
 deleteUser= async (req,res) =>{
    try {
        const {uid}= req.params
        const result = await this.service.deleteUser(uid)
        res.send(result)
        
    } catch (error) {
        res.send({status: "error", message: error})
        
    }
}

}