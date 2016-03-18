module.exports = function(app, model, uuid) {

    app.get('/api/assignment/form/:formId/field', function(req, res) {
        var formId = req.params.formId;
        var fields = model.findAllForForm(formId);
        res.json(fields);
    });

    app.get('/api/assignment/form/:formId/field/:fieldId', function(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = model.findByIdForForm(formId, fieldId);
        res.json(field);
    });

    app.delete('/api/assignment/form/:formId/field/:fieldId', function(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = model.deleteByIdForForm(formId, fieldId);
        res.json(fields);
    });

    app.post('/api/assignment/form/:formId/field', function(req, res) {
        var formId = req.params.formId;
        var newField = req.body;
        newField._id = uuid.v1();
        var fields = model.createForForm(formId, newField);
        res.json(fields);
    });

    app.put('/api/assignment/form/:formId/field/:fieldId', function(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;
        var fields = model.updateByIdForForm(formId, fieldId, newField);
        res.json(fields);
    });

    app.put('/api/assignment/form/:formId/fields', function(req, res) {
        var formId = req.params.formId;
        var fieldIds = req.body;
        var fields = model.updateOrderForForm(formId, fieldIds);
        res.json(fields);
    });
}