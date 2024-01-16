const jwt=require('jsonwebtoken')


const jwtmiddlewatre=(req,res,next)=>{
    console.log('inside jwt middleware');
  

const token=req.headers['authorization'].split(' ')[1]
console.log(token);

try{
    const jwtresponse=jwt.verify(token,"secretkey123")
    console.log(jwtresponse);
    req.payload=jwtresponse.userid


next()
}catch(err){
    res.status(401).json('Authorization failed........please login')
}
}

module.exports=jwtmiddlewatre
