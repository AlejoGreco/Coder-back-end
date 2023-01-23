export const getDashboardController = (req, res) => {
    if(req.isAuthenticated()){
        res.render('dashboard', {
            user: req.user.username
        })
    }
    else{
        res.redirect('/login')
    }
}