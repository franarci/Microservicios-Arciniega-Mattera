const { Belongs } = require('./belongs')

class UserBelongs extends Belongs{
    execute(userName){
        return this.instances_of_domain.some(user => user.username === userName) 
    }
}

module.exports = {
    UserBelongs:UserBelongs
}