module.exports = function(app, model, uuid) {

    app.get('/api/assignment/form/:formId/field', function(req, res) {
        var formId = req.params.formId;
        model.findAllForForm(formId).then(
            function(fields) {
                res.json(fields);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.get('/api/assignment/form/:formId/field/:fieldId', function(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model.findByIdForForm(formId, fieldId).then(
            function(field) {
                res.json(field);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.delete('/api/assignment/form/:formId/field/:fieldId', function(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model.deleteByIdForForm(formId, fieldId).then(
            function(feild) {
                res.json(feild);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.post('/api/assignment/form/:formId/field', function(req, res) {
        var formId = req.params.formId;
        var newField = req.body;
        newField._id = uuid.v1();
        model.createForForm(formId, newField).then(
            function(feild) {
                res.json(feild);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.put('/api/assignment/form/:formId/field/:fieldId', function(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;
        model.updateByIdForForm(formId, fieldId, newField).then(
            function(feild) {
                res.json(feild);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });

    app.put('/api/assignment/form/:formId/fields', function(req, res) {
        var formId = req.params.formId;
        var fieldIds = req.body;
        model.updateOrderForForm(formId, fieldIds).then(
            function(feilds) {
                res.json(feilds);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    });
}