/**
 * MODELO DE Perfil
 * 
 * En ExtJS, un Model define la estructura de los datos.
 * Es como un "esquema" que describe qué campos tiene cada usuario.
 * 
 * Aprenderás:
 * - Cómo definir campos (fields) y sus tipos
 * - Cómo configurar el identificador único (idProperty)
 */

Ext.define('Tutorial.model.Profile', {
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
            // Campo opcional
            allowNull: true
        },
        {
            name: 'emailDeContacto',
            type: 'string',
            allowNull: false
        },
        {
            name: 'idUsuario',
            type: 'int',
            allowNull: false
        }
    ],

    // Validaciones (opcional pero recomendado)
    validators: {
        nombre: { type: 'presence', message: 'El nombre es obligatorio' },
        email: [
            { type: 'presence', message: 'El email es obligatorio' },
            { type: 'email', message: 'Email inválido' }
        ],
        idUsuario: [
            { type: 'presence', message: 'El id de usuario es obligatorio' }
        ]
    }
});
