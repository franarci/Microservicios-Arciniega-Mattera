const { Belongs } = require('./belongs')

class UserBelongs extends Belongs{
    execute(userData){
        const username = userData[0]
        return this.instances_of_domain.some(user => user.username === username) 
    }
}

module.exports = {
    UserBelongs:UserBelongs
}