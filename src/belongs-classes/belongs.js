class Belongs{
    constructor(instances_of_domain){
        this.instances_of_domain = instances_of_domain
    }
    execute(){
        throw 'this method must be implemented: Belongs'
    }
    //this.[domain-class].some([domain-class] => [domain-class].[attribute] === [attribute]) 
}

module.exports = {
    Belongs:Belongs
}