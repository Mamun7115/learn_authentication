// use for IMPORTING and MIDDLEWARES

const express = require("express")
const app  = express();
const bcrypt = require("bcrypt")


// middleware
app.use(express.json())


//------------------use space for DATA ONLY -------------------
const posts = [
    {
        name:"mamun",
        post:"Post 1"
    },
    {
        name:"Rakah",
        post:"Post 2"
    }
]


const usersdatabase = [

]

// -----------space below ONLY FOR ROUTES------------------

app.get("/posts",function(req,res){
    res.json(posts)
})


app.get("/users",(req,res)=>{
    res.json(usersdatabase)
})

app.post("/users",async (req,res)=>{
    try {

        // generate salt for better encryption
        const salt = await bcrypt.genSalt() // this is optional u can do it in hash

        // generate hashed password 
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        
        console.log(`salt:${salt}, hashed:${hashedPassword}`)

        // create an user object to store this data for database
        const userinfo = {
            name:req.body.name,
            password:hashedPassword
        }
        
        // now insert it to database <userdatabase>
        usersdatabase.push(userinfo)

        // send response to frontend for result of success
        res.status(201).send("successfully registered")


    } catch (error) {
        // just incase if theres error 
        res.status(500).send("error with the server or login")
    }
})

app.post("/users/login",async function(req,res){
    // find the user in database
    const user = usersdatabase.find(user=> user.name = req.body.name)

    // incase no result send it to frontend
    if(user == null){
        res.status(400).send("cannot find user")
    }

    //success
    try {
        //compare bcrypt hashedpass with incoming password
        if( await bcrypt.compare(req.body.password, user.password)){
            res.send("user logged in")

            //incase it shows error in comparison or results failed
        }else{
            res.send("Not Allowed")
        }


        
    } catch (error) {
        //error
        res.status(500).send("error with the server or login")
    }
})


// ----------------RESERVED FOR THE PORTS ------------

app.listen(3000)


// What youve learned?

/* 
    used express.json() to parse the incoming json
    data into javascript object

    made an URI stored the user information using bcrypt
    and used bcrypt.genSalt() to generate random hash just
    incase if theres similarity between information stored in
    database

    made an endpoint to verify the information they inserted
    and then using bcrypt.compare() we compared
    the information user sent and the one we have in our database
    and allow user to be logged into our web or not if failed


*/