class infoPerson
{
    constructor(id, fullname, age,  role)
    {
        this.id=id
        this.fullname=fullname
        this.age=age
        this.role=role
    }
}
class Coach extends infoPerson {
    constructor(id, fullname, age,  role)
    {
        super(id)
        super(fullname)
        super(age)
        super(role)
    }
}
class Player extends infoPerson {
    constructor(id, fullname, age, role, pos)
    {
        super(id)
        super(fullname)
        super(age)
        super(role)
        this.pos = pos
    }
}
class Referee extends infoPerson {
    constructor(id, fullname, age, role, Certificate)
    {
        super(id)
        super(fullname)
        super(age)
        super(role)
        this.Certificate = Certificate
    }
}