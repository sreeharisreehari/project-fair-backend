// setup path to resolve request
// 1)import express module
const express=require('express')

// import controller
const usercontroller=require('../controllers/usercontroller')

// import
const projectcontroller=require('../controllers/projectcontroller')

// import jwt middleware
const jwtmiddlewatre = require('../Middlewares/jwtmiddlewares')


const multerconfig = require('../Middlewares/multermiddleware')




// 2)create an object for router class inside express module

const router=new express.Router()

// 3)setup path to resolve request:
// syntax-router.httprequest
// a)register
router.post('/user/register',usercontroller.register)

// b)login
router.post('/user/login',usercontroller.login)

// c)add project
router.post('/projects/add',jwtmiddlewatre,multerconfig.single('proimage'),projectcontroller.addproject)

// d)homeproject
router.get('/project/home-project',projectcontroller.gethomeproject)

// d) all project
router.get('/project/all-project',jwtmiddlewatre,projectcontroller.getallproject)

// d) userproject
router.get('/user/all-project',jwtmiddlewatre,projectcontroller.getuserprojects)

// F)editproject
router.put('/project/edit/:id',jwtmiddlewatre,multerconfig.single('proimage'),projectcontroller.edituserproject)

// g)delete project
router.delete('/project/remove/:id',jwtmiddlewatre,projectcontroller.deleteproject)

// h)editprofile
router.put('/profile/update/:id',jwtmiddlewatre,multerconfig.single('profile'),usercontroller.edituser)


// 4)export router

module.exports=router

