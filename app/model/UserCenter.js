Ext.define('Tutorial.model.UserCenter', {
    extend: 'Ext.data.Model',

    // // El campo que sirve como identificador único
    // idProperty: 'id',

    // Definición de los campos del modelo
    fields: [
        {
            name: 'idUsuario',
            type: 'int',
            // El ID no se puede editar, lo genera el servidor
            persist: false
        },
        {
            name: 'idCentro',
            type: 'int',
            // El ID no se puede editar, lo genera el servidor
            persist: false
        }
    ],

    // Validaciones (opcional pero recomendado)
    // validators: {
    //     nombre: { type: 'presence', message: 'El nombre es obligatorio' },
    // }
});
