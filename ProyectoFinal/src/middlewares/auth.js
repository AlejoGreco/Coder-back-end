export const checkAuth = (req, res, next) => {
    if(req.isAuthenticated())
    {
        next()
    }
    else{
        res.status(401).send({message: 'User unknow. You must be logged for this request'})
    }
}