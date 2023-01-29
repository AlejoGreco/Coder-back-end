import UserDto from "../dtos/userDto.js"

export const getDashboardController = (req, res) => {
    if(req.isAuthenticated()){
        res.render('dashboard', new UserDto(req.user).getUser())
    }
    else{
        res.redirect('/login')
    }
}