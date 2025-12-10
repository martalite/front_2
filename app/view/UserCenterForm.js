Ext.define('Tutorial.view.UserCenterForm', {
    extend: 'Ext.window.Window',

    alias: 'widget.usercenterform',

    // Configuración de la ventana
    title: 'Gestión de centros asignados',
    modal: true,
    width: 800,
    layout: 'column',

    // Iconos
    iconCls: 'fa fa-user',

    record: null,

    /**
     * Inicialización del componente
     */
    initComponent: function () {
        var me = this;

        // Obtener los centros del usuario (por su id) i obtener los centros disponibles

        me.record.get('id')

        // Eliminar de los centros disponibles los centros del usuario

        // Definir los items (el formulario)
        me.items = [

            {
                store: {
                    type: 'userscenters'
                },
                xtype: 'grid',
                // reference: 'centerForm',
                bodyPadding: 20,
                // defaults: {
                //     xtype: 'textfield',
                //     anchor: '100%',
                //     labelWidth: 80,
                //     margin: '0 0 15 0'
                // },
                columns: [
                    {
                        text: 'ID',
                        dataIndex: 'idUsuario',
                        width: 60,
                        align: 'center',
                        // // Renderizador personalizado para dar estilo
                        // renderer: function (value) {
                        //     return '<span style="font-weight: bold; color: #667eea;">#' + value + '</span>';
                        // }
                    },
                ]
            },
            {
                xtype: 'grid',
                // reference: 'centerForm',
                bodyPadding: 20,
                // defaults: {
                //     xtype: 'textfield',
                //     anchor: '100%',
                //     labelWidth: 80,
                //     margin: '0 0 15 0'
                // },
                items: [
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'ID Usuario',
                        name: 'id',
                        value: "aasasas"
                    }
                ]
            }
        ];

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
                    me.saveCenter();
                }
            }
        ];

        me.callParent(arguments);


        // var form = me.down('form').getForm();
        // form.loadRecord(me.record);
    },

    // /**
    //  * Método para guardar el centro
    //  * Hace una llamada POST (crear) o PUT (actualizar)
    //  */
    // saveCenter: function () {
    //     var me = this,
    //         form = me.down('form').getForm();

    //     // Validar el formulario
    //     if (!form.isValid()) {
    //         Ext.Msg.alert('Validación', 'Por favor complete todos los campos correctamente');
    //         return;
    //     }

    //     // Obtener los valores del formulario
    //     var values = form.getValues();

    //     // Mostrar loading
    //     me.setLoading('Guardando...');

    //     if (me.isEdit) {
    //         // ACTUALIZAR centro existente (PUT)
    //         me.updateCenter(values);
    //     } else {
    //         // CREAR nuevo centro (POST)
    //         me.createCenter(values);
    //     }
    // },

    // /**
    //  * CREAR - Método POST
    //  * Crea un nuevo centro en el servidor
    //  */
    // createCenter: function (values) {
    //     var me = this;

    //     console.log('📤 POST - Creando nuevo centro:', values);

    //     // Hacer la petición POST
    //     Ext.Ajax.request({
    //         url: 'http://localhost:8080/api/centers',
    //         method: 'POST',
    //         jsonData: values,
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         success: function (response) {
    //             var result = Ext.decode(response.responseText);
    //             console.log('✅ Centro creado exitosamente:', result);

    //             me.setLoading(false);
    //             Ext.Msg.alert('Éxito', 'Centro creado correctamente', function () {
    //                 // Recargar el grid
    //                 me.fireEvent('centersaved');
    //                 me.close();
    //             });
    //         },
    //         failure: function (response) {
    //             console.error('❌ Error al crear centro:', response);
    //             me.setLoading(false);
    //             Ext.Msg.alert('Error', 'No se pudo crear el centro: ' + response.statusText);
    //         }
    //     });
    // },

    // /**
    //  * ACTUALIZAR - Método PUT
    //  * Actualiza un centro existente en el servidor
    //  */
    // updateCenter: function (values) {
    //     var me = this,
    //         id = me.record.get('id');

    //     console.log('📤 PUT - Actualizando centro ID:', id, values);

    //     // Hacer la petición PUT
    //     Ext.Ajax.request({
    //         url: 'http://localhost:8080/api/centers/' + id,
    //         method: 'PUT',
    //         jsonData: values,
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         success: function (response) {
    //             var result = Ext.decode(response.responseText);
    //             console.log('✅ Centro actualizado exitosamente:', result);

    //             me.setLoading(false);
    //             Ext.Msg.alert('Éxito', 'Centro actualizado correctamente', function () {
    //                 // Recargar el grid
    //                 me.fireEvent('centersaved');
    //                 me.close();
    //             });
    //         },
    //         failure: function (response) {
    //             console.error('❌ Error al actualizar centro:', response);
    //             me.setLoading(false);
    //             Ext.Msg.alert('Error', 'No se pudo actualizar el centro: ' + response.statusText);
    //         }
    //     });
    // }
});
