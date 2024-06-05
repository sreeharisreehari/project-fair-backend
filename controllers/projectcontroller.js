// import model
const projects=require('../MODEL/projectschema')






exports.addproject=async(req,res)=>{
    console.log('inside project add controller');
    const userid=req.payload
    console.log(userid);

 const  proimage=req.file.filename
 console.log(proimage);

 const {title,language,github,website,overview}=req.body
console.log(`${title},${language},${github},${website},${overview},${userid}`);

try{
    const existingproject= await projects.findOne({github})
    if(existingproject){
        res.status(406).json('project already exists....please upload a new project')
    }
    else{
        const newproject=new projects({
            title,language,github,website,overview,proimage,userid
        })
        await newproject.save()
        res.status(200).json(newproject)

        
    }

}catch(err){
    res.status(401).json(`resquest failer due to ${err}`)

}





 

}

// exports home project

exports.gethomeproject=async(req,res)=>{
 

    try{
        const homeproject=await projects.find().limit(3)
        res.status(200).json(homeproject)
    }
    catch(err){
        res.status(401).json(`request failed due to ${err}`)
    }
}

// all project

exports.getallproject=async(req,res)=>{
    const search=req.query.search
    console.log(search);
    const query={
        language:{
            // regular  expression,options:'i'-it removes the case sensitivity
            $regex:search,$options:'i'
        }
    }
    try{
        const allproject=await projects.find(query)
        res.status(200).json(allproject)
    }
    catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }
}

// userproject
exports.getuserprojects=async(req,res)=>{
    const userid=req.payload
    try{
        const userproject=await projects.find({userid})
       res.status(200).json(userproject)
    }
    catch(err){
        res.status(401).json(`Request failed due to ${err}`)

    }
    }

    // edit project
    exports.edituserproject=async(req,res)=>{
        const {id}=req.params
        const userid=req.payload
        const {title,language,github,website,overview,proimage}=req.body
        const uploadedprojectimage=req.file?req.file.filename:proimage

        try{
            const updateproject=await projects.findByIdAndUpdate({_id:id},{title,language,github,website,overview,proimage:uploadedprojectimage,userid},{new:true})

            await updateproject.save()
            res.status(200).json(updateproject)

        }catch(err){
            res.status(401).json(err)
        }

    }

    // delele project

    exports.deleteproject=async(req,res)=>{
        const {id}=req.params

        try{
            const removeproject=await projects.findByIdAndDelete({_id:id})
            res.status(200).json(removeproject)


        }catch(err){
            res.status(401).json(err)

        }


    }


