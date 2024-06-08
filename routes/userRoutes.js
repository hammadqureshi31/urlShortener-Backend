import express from "express"
import {handleCreateNewUser, handleGetUserByEmailAndPass, handleLogoutUser}  from '../controller/userControl.js'


const router = express.Router()

router.post('/', handleCreateNewUser)

router.post('/login', handleGetUserByEmailAndPass)

router.post('/logout', handleLogoutUser)

export default router