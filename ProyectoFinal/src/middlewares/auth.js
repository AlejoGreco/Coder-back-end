export const checkAuth = (req, res, next) => {
    if(req.isAuthenticated())
    {
        next()
    }
    else{
        res.status(401).send({message: 'User unknow. You must be logged for this request'})
    }
}

export const checkAuthAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.user.admin)
    {
        next()
    }
    else{
        res.status(401).send({error: -1, descripcion: `Ruta ${req.baseUrl}${req.url} metodo ${req.method} no autorizada`})
    }
}