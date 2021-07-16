class Subject {
    constructor(){
        this.observers = [];
    }

	addObserver(o){
		this.observers.push(o);
	}

	removeObserver(o){
		this.observers =this.observers.filter(observer => observer == o);
	}

	notify(event, object){
		this.observers.forEach(observer => observer.update(event, object))
	}
}
module.exports = Subject;