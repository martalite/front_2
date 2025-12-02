/**
 * FORMULARIO DE USUARIO
 * 
 * Este formulario permite crear y editar usuarios.
 * 
 * Aprenderás:
 * - Cómo crear formularios en ExtJS
 * - Validación de campos
 * - Cómo guardar datos en el servidor (POST/PUT)
 */

Ext.define('Tutorial.view.ProfileForm', {
    extend: 'Ext.window.Window',

    alias: 'widget.profileform',

    // Configuración de la ventana
    title: 'Nuevo Perfil',
    modal: true,
    width: 400,
    layout: 'fit',

    // Iconos
    iconCls: 'fa fa-user',

    // Variables para saber si estamos editando o creando
    isEdit: false,
    record: null,

    /**
     * Inicialización del componente
     */
    initComponent: function () {
        var me = this;

        // Si estamos editando, cambiar el título
        if (me.isEdit) {
            me.title = 'Editar Perfil';
        }

        // Definir los items (el formulario)
        me.items = [{
            xtype: 'form',
            reference: 'profileForm',
            bodyPadding: 20,
            defaults: {
                xtype: 'textfield',
                anchor: '100%',
                labelWidth: 80,
                margin: '0 0 15 0'
            },
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: 'ID',
                    name: 'id',
                    hidden: !me.isEdit,
                    value: me.record ? me.record.get('id') : ''
                },
                {
                    fieldLabel: 'Nombre',
                    name: 'nombre',
                    allowBlank: false,
                    blankText: 'El nombre es obligatorio',
                    emptyText: 'Ingrese el nombre completo'
                },
                {
                    fieldLabel: 'Descripción',
                    name: 'descripcion',
                    allowBlank: true,
                },
                {
                    fieldLabel: 'Email de contacto',
                    name: 'emailDeContacto',
                    vtype: 'email',
                    allowBlank: false,
                    blankText: 'El email es obligatorio',
                    emptyText: 'ejemplo@email.com'
                },
                {
                    fieldLabel: 'Id de Usuario',
                    name: 'idUsuario',
                    xtype: 'numberfield',
                    allowBlank: false,
                    blankText: 'El id de usuario es obligatorio',
                    emptyText: 'Ingrese id de usuario'
                }
            ]
        }];

        // Botones de acción
        me.buttons = [
            {
                text: 'Cancelar',
                iconCls: 'fa fa-times',
                handler: function () {
                    me.close();
                }
            },
            {
                text: 'Guardar',
                iconCls: 'fa fa-save',
                formBind: true, // Solo se habilita si el formulario es válido
                handler: function () {
                    me.saveProfile();
                }
            }
        ];

        me.callParent(arguments);

        // Si estamos editando, cargar los datos en el formulario
        if (me.isEdit && me.record) {
            var form = me.down('form').getForm();
            form.loadRecord(me.record);
        }
    },

    /**
     * Método para guardar el perfil
     * Hace una llamada POST (crear) o PUT (actualizar)
     */
    saveProfile: function () {
        var me = this,
            form = me.down('form').getForm();

        // Validar el formulario
        if (!form.isValid()) {
            Ext.Msg.alert('Validación', 'Por favor complete todos los campos correctamente');
            return;
        }

        // Obtener los valores del formulario
        var values = form.getValues();

        // Mostrar loading
        me.setLoading('Guardando...');

        if (me.isEdit) {
            // ACTUALIZAR perfil existente (PUT)
            me.updateProfile(values);
        } else {
            // CREAR nuevo perfil (POST)
            me.createProfile(values);
        }
    },

    /**
     * CREAR - Método POST
     * Crea un nuevo perfil en el servidor
     */
    createProfile: function (values) {
        var me = this;

        console.log('📤 POST - Creando nuevo perfil:', values);

        // Hacer la petición POST
        Ext.Ajax.request({
            url: 'http://localhost:8080/api/profiles',
            method: 'POST',
            jsonData: values,
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (response) {
                var result = Ext.decode(response.responseText);
                console.log('✅ Perfil creado exitosamente:', result);

                me.setLoading(false);
                Ext.Msg.alert('Éxito', 'Perfil creado correctamente', function () {
                    // Recargar el grid
                    me.fireEvent('profilesaved');
                    me.close();
                });
            },
            failure: function (response) {
                console.error('❌ Error al crear perfil:', response);
                me.setLoading(false);
                Ext.Msg.alert('Error', 'No se pudo crear el perfil: ' + response.statusText);
            }
        });
    },

    /**
     * ACTUALIZAR - Método PUT
     * Actualiza un perfil existente en el servidor
     */
    updateProfile: function (values) {
        var me = this,
            id = me.record.get('id');

        console.log('📤 PUT - Actualizando perfil ID:', id, values);

        // Hacer la petición PUT
        Ext.Ajax.request({
            url: 'http://localhost:8080/api/profiles/' + id,
            method: 'PUT',
            jsonData: values,
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (response) {
                var result = Ext.decode(response.responseText);
                console.log('✅ Perfil actualizado exitosamente:', result);

                me.setLoading(false);
                Ext.Msg.alert('Éxito', 'Perfil actualizado correctamente', function () {
                    // Recargar el grid
                    me.fireEvent('profilesaved');
                    me.close();
                });
            },
            failure: function (response) {
                console.error('❌ Error al actualizar perfil:', response);
                me.setLoading(false);
                Ext.Msg.alert('Error', 'No se pudo actualizar el perfil: ' + response.statusText);
            }
        });
    }
});
