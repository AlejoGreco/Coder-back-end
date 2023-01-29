const formVariables = {
    Register: {
        action: '/register',
        href: '/login',
        linkMsg: 'Go to log in!'
    },
    Login: {
        action: 'login',
        href: '/register',
        linkMsg: 'Go to sign up!'
    }
}

export default class AuthDto{
    constructor(formName){
        this.title = formName,
        this.action = formVariables[formName].action,
        this.href = formVariables[formName].href,
        this.linkMsg = formVariables[formName].linkMsg
    }
}