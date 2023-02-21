module.exports= (roles=[])=>{
  if (typeof roles==='string'){
    roles= [roles]
  }
  return (req, res, next) => {
    try {
      if (roles.length && !roles.includes(req.account.role)) {
        res.json({
          statusCode: 405,
          valid:false,
          mess: "Account not allowed"
        })
      }else{
          next()
      }
    } catch (error) {
      res.json({
        statusCode: 404,
        valid:false,
        mess: "Role Not Found"
      })
    }
  };
}