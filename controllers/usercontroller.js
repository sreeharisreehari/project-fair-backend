// logic to resolve the request
// import model
const users=require('../MODEL/userschema')
// import jwt
const jwt=require('jsonwebtoken')


exports.register=async(req,res)=>{
    console.log('inside the controller-register function');
// extract data from request body - json format is converted into javascript object by json() so that we can directly destructure the key from the req body
const {username,email,password}=req.body

 try{const exituser= await users.findOne({email})
 if(exituser){

    res.status(406).json('Account already exist....please login')
    // client error is  in 400series. 406 is called unproccesible entity
 }
 else{
    // need to register
   //  1)create a object for the model
   const newuser=new users({
      username,
      email,
      password,
      github:"",
      linkedin:"",
      profile:""





   })
   // add to mongodb-use save method in mongoose
   await newuser.save()

    // response
    res.status(200).json(newuser)
 }
}
catch(err){
   res.status(401).json(`Register request Failed due to ${err}`)
}
}

// login exports
exports.login=async(req,res)=>{
   const {email,password}=req.body
  try{ const existinguser= await users.findOne({email,password})
   console.log(existinguser);

   if(existinguser){
      // jwt
      // payload-payload is the information that is secretly transmitted
      // secretorprivate -key based on which the token is generated
      // sign method is used to create token-it expects two arguements
      // 1)payload-information that is secretely transmitted
      const token=jwt.sign({userid:existinguser._id},"secretkey123")
      // sending as object because we are sending more than one data


     
   res.status(200).json({
      existinguser,
      token
   })
   }
   else{
      res.status(404).json('invalid emailid or password')
   }

}catch(err){
   req.status(401).json(`login request failed due to :${err}`);
}
}




// edit profile

exports.edituser=async(req,res)=>{
   const userid=req.payload
   const{username,email,password,github,linkedin, profile}=req.body
  const profileimage=req.file.filename


   try{
      const updateuser=await users.findByIdAndUpdate({_id:userid},{username,email,password,github,linkedin,profile:profileimage},
         {new:true})
         await updateuser.save()
         res.status(200).json(updateuser)
   }catch(err){
      res.status(401).json(err)
   }
}




