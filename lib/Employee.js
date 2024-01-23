// TODO: Write code to define and export the Employee class
class Employee{
    constructor(name, id, email){
        if(arguments.length === 3){
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = "Employee";
    } else if (arguments.length === 2){
        this.name = name;
        this.email = id;
        this.id = 100;
    } else if (arguments.length === 1){
        this.name = name;
        this.id = 100;
    } 
    }

    getName(){
        return this.name;
    }

    getEmail(){
        return this.email;
    }

    getRole(){
        return this.role;
    }

    getId(){
        return this.id;
    }
}


module.exports = Employee;