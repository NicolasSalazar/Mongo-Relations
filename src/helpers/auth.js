const helpers ={};

helpers.isAuthenticated =(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg', 'No Autorizado');
    res.redirect('/user/singin');
};

module.exports = helpers;