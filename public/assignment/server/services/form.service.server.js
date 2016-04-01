module.exports = function(app, model, uuid) {

    app.get('/api/assignment/user/:userId/form', function(req, res) {
        var userId = req.params.userId;
        model.findFormsByUserId(userId).then(
            function(forms) {
                res.json(forms);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.get('/api/assignment/form/:formId', function(req, res) {
        var formId = req.params.formId;
        model.findById(formId).then(
            function(form) {
                res.json(form);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.delete('/api/assignment/form/:formId', function(req, res) {
        var formId = req.params.formId;
        model.deleteById(formId).then(
            function(status) {
                res.json(status);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.post('/api/assignment/user/:userId/form', function(req, res) {
        var newForm = req.body;
        newForm.userId = req.params.userId;
        model.create(newForm).then(
            function(form) {
                res.json(form);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.put('/api/assignment/form/:formId', function(req, res) {
        var formId = req.params.formId;
        var newForm = req.body;
        model.updateById(formId, newForm).then(
            function(form) {
                res.json(form);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

}