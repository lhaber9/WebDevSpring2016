module.exports = function(app, model, uuid) {

    app.get('/api/assignment/user/:userId/form', function(req, res) {
        var userId = req.params.userId;
        var userForms = model.findFormsByUserId(userId);
        res.json(userForms);
    });

    app.get('/api/assignment/form/:formId', function(req, res) {
        var formId = req.params.formId;
        var form = model.findById(formId);
        res.json(form);
    });

    app.delete('/api/assignment/form/:formId', function(req, res) {
        var formId = req.params.formId;
        var forms = model.deleteById(formId);
        res.json(forms);
    });

    app.post('/api/assignment/user/:userId/form', function(req, res) {
        var newForm = req.body;
        newForm.userId = req.params.userId;
        newForm._id = uuid.v1();
        var form = model.create(newForm);
        res.json(form);
    });

    app.put('/api/assignment/form/:formId', function(req, res) {
        var formId = req.params.formId;
        var newForm = req.body;
        var forms = model.updateById(formId, newForm);
        res.json(forms);
    });

}