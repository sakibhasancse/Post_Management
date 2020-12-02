
import mongoose from 'mongoose'
export const  DBCON  = (mongourl)=>{

    mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('database connected') )
    .catch((err) => console.log(err.message));
    
    mongoose.set('useFindAndModify', false)
}

