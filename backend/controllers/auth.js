var User = require("../dbmodels/User");

module.exports = {
    register: function (req, res) {
        console.log(req.body);

        User.findOne({
            email: req.body.email
        }, function (err, existingUser) {
            if (existingUser)
                return res.status(409).send({message: 'Email conflict observed.'});

                var user = new User(req.body);

                user.save(function (err, oput) {
                    if (err) {
                        res.status(500).send({
                            message: err.message
                        });
                    }
                    res.status(200);
                })
        });
    }
}


