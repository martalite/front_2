Ext.define('Tutorial.model.Center', {
    extend: 'Ext.data.Model',

    // El campo que sirve como identificador único
    idProperty: 'id',

    // Definición de los campos del modelo
    fields: [
        {
            name: 'id',
            type: 'int',
            // El ID no se puede editar, lo genera el servidor
            persist: false
        },
        {
            name: 'nombre',
            type: 'string',
            // Campo obligatorio
            allowNull: false
        },
        {
            name: 'descripcion',
            type: 'string',
            allowNull: true
        }
    ],

    // Validaciones (opcional pero recomendado)
    validators: {
        nombre: { type: 'presence', message: 'El nombre es obligatorio' },
    }
});
