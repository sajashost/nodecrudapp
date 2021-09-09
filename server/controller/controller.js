const Userdb = require('../model/model');

//create and save user
exports.create = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({ message: "Content ca't be empty" });
        return;
    }
    //new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    //save user in database
    user
        .save(user)
        .then(data => {
            res.send("Save User Success");
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured while creating"
            });
        });
}

//retrive and return all user/ retrive and return single user
exports.find = (req, res) => {

    if (req.query.id) { 
        const id=req.query.id;
        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message: "not found user with id"+id})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message: "Error retrive user with "+id})
        })
    } else {
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occured while retriving data" })
            })
    }
}

//update user by id
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Update can't be empty" })
    }
    const id = req.params.id;

    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: 'Canot be update user with ${id} my be user not found' });
            } else {
                res.send("User Updated");
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error Update userinfo" })
        })
}

//delete user
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "cannot be delete ${id} not found" });
            } else {
                res.send("User Deleted Success");
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "user id not found" });
        })
}
