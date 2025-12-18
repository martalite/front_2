Ext.define('Tutorial.model.Patient', {
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
            allowNull: false // Campo obligatorio
        },
        {
            name: 'apellido1',
            type: 'string',
            allowNull: false // Campo obligatorio
        },
        {
            name: 'apellido2',
            type: 'string',
            allowNull: false // Campo obligatorio
        },
        {
            name: 'fechaDenacimiento',
            type: 'string',
            allowNull: false // Campo obligatorio
        },
        {
            name: 'sexo',
            type: 'string',
            allowNull: false // Campo obligatorio
        },
        {
            name: 'dni',
            type: 'string',
            allowNull: false // Campo obligatorio
        },
        {
            name: 'numeroTelefono',
            type: 'int',
            allowNull: false // Campo obligatorio
        },
        {
            name: 'email',
            type: 'string',
            allowNull: false // Campo obligatorio
        },
        {
            name: 'colorFichaMedica',
            type: 'string',
            allowNull: true
        },
        {
            name: 'diagnosticos',
            type: 'auto',
            allowNull: true
        },
        {
            name: 'comentariosDePaciente',
            type: 'auto',
            allowNull: true
        }
    ],

    // Validaciones (opcional pero recomendado)
    validators: {
        nombre: { type: 'presence', message: 'El nombre es obligatorio' },
        // numeroCorto: { type: 'presence', message: 'El número corto es obligatorio' },
        // numeroLargo: { type: 'presence', message: 'El número largo es obligatorio' },
    }
});
