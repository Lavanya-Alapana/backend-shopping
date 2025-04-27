const mongoose=require('mongoose');

const UserSchema= new mongoose.Schema(
    {
        firstname:
        {   type:String,
            required:true
        },
        lastname:
        {
            type:String,
            required:true

        },

        email:{
            type:String,
            required:true,
            unique:true

        },
        password:{
            type:String,
            required:true
        },
        
        address:{
            type:String,
           
        },
        state:{
            type:String,
            
        },
        city:{
            type:String,
          
        },
        zip:{
            type:String,
          
        }
    

    },
    { timestamps: true }
)

module.exports=mongoose.model("User",UserSchema);