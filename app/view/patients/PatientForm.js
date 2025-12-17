Ext.define('Tutorial.view.PatientForm', {
    extend: 'Ext.container.Container',

    alias: 'widget.patientform',

    title: 'Crear Paciente',

    scrollable: true,

    items: [

        {

            xtype: 'container',
            name: 'containerFichaPaciente',
            layout: {
                type: 'vbox',
                align: 'stretch',
            },
            items: [

                {
                    xtype: 'panel',
                    title: 'Ficha del Paciente',

                    name: 'panelFichaPaciente',

                    margin: 10,
                    bodyPadding: 10,
                    bodyStyle: {

                        backgroundColor: '#F9F9F9'
                    },
                    border: true,

                    collapsible: true,
                    collapsed: true,
                    listeners: {

                        // Quitar el resumen en expandir
                        expand: function (panel) {

                            var summary = Ext.ComponentQuery.query('[name=summaryFichaPaciente]')[0];

                            console.log(summary);

                            if (summary != undefined) {

                                var containerFichaPaciente = panel.up('container');

                                containerFichaPaciente.remove(summary);
                            }
                        },

                        // Añadir el resumen en colapsar
                        collapse: function (panel) {

                            panel.up('container').add(
                                {
                                    xtype: 'panel',
                                    bodyPadding: 5,
                                    layout: 'hbox',
                                    margin: '-10 10 0 10',
                                    bodyStyle: {

                                        backgroundColor: '#F9F9F9'
                                    },
                                    border: true,

                                    defaults: {
                                        margin: '0 5 0 0',
                                        // labelAlign: 'center'
                                    },

                                    name: 'summaryFichaPaciente',

                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            fieldLabel: 'Dummy',
                                            value: 'Dummy'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            fieldLabel: 'Dummy',
                                            value: 'Dummy'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            fieldLabel: 'Dummy',
                                            value: 'Dummy'
                                        }
                                    ]
                                }
                            )
                        }
                    },

                    layout: {
                        type: 'hbox'
                    },

                    items: [

                        {
                            title: 'Demográficos',
                            xtype: 'form',
                            collapsible: true,
                            collapsed: true,
                            bodyPadding: 10,
                            flex: 1,

                            margin: 2,

                            // header: {
                            //     style: {
                            //         backgroundColor: '#ebebebff',
                            //         color: 'blue'
                            //     },
                            // },

                            // bodyStyle: {
                            //     backgroundColor: '#ebebebff',
                            // },

                            style: {
                                border: '2px solid #cbcbcbff',
                                borderRadius: '2px',
                            },

                            // TODO: mirar que layout utilizar
                            // layout de dos columnas de hbox con vbox dentro con los fields

                            layout: 'hbox',

                            items: [

                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch',
                                    },
                                    margin: 10,
                                    flex: 1,

                                    items: [

                                        {
                                            xtype: 'textfield',
                                            emptyText: 'Dummy'
                                        },
                                        {
                                            xtype: 'textfield',
                                            emptyText: 'Dummy'
                                        },
                                        {
                                            xtype: 'textfield',
                                            emptyText: 'Dummy'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch',
                                    },
                                    margin: 10,
                                    flex: 1,

                                    items: [

                                        {
                                            xtype: 'textfield',
                                            emptyText: 'Dummy'
                                        },
                                        {
                                            xtype: 'textfield',
                                            emptyText: 'Dummy'
                                        },
                                        {
                                            xtype: 'textfield',
                                            emptyText: 'Dummy'
                                        }
                                    ]

                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'vbox',
                                align: 'stretch',
                            },

                            flex: 1,

                            items: [
                                {
                                    title: 'Otros datos de contacto',
                                    xtype: 'form',
                                    collapsible: true,
                                    collapsed: true,
                                    bodyPadding: 10,
                                    flex: 1,
                                    margin: 2,

                                    // header: {
                                    //     style: {
                                    //         backgroundColor: '#ebebebff',
                                    //         color: 'blue'
                                    //     },
                                    // },

                                    // bodyStyle: {
                                    //     backgroundColor: '#ebebebff',
                                    // },

                                    style: {
                                        border: '2px solid #cbcbcbff',
                                        borderRadius: '2px',
                                    },

                                    items: [

                                        {
                                            xtype: 'textfield',
                                            emptyText: 'Dummy'
                                        },
                                        {
                                            xtype: 'textfield',
                                            emptyText: 'Dummy'
                                        }
                                    ]
                                },
                                {
                                    title: 'Datos de contacto',
                                    xtype: 'form',
                                    collapsible: true,
                                    collapsed: true,
                                    bodyPadding: 10,
                                    flex: 1,
                                    margin: 2,

                                    // header: {
                                    //     style: {
                                    //         backgroundColor: '#ebebebff',
                                    //         color: 'blue'
                                    //     },
                                    // },

                                    // bodyStyle: {
                                    //     backgroundColor: '#ebebebff',
                                    // },

                                    style: {
                                        border: '2px solid #cbcbcbff',
                                        borderRadius: '2px',
                                    },

                                    items: [

                                        {
                                            xtype: 'textfield',
                                            emptyText: 'Dummy'
                                        },
                                        {
                                            xtype: 'textfield',
                                            emptyText: 'Dummy'
                                        }
                                    ]
                                }
                            ]
                        },

                    ]
                },
            ]
        },

        {
            xtype: 'container',
            name: 'containerFichaMedica',
            layout: {
                type: 'vbox',
                align: 'stretch',
            },
            items: [
                {
                    xtype: 'panel',
                    title: 'Ficha médica',

                    margin: 10,
                    bodyPadding: 10,

                    bodyStyle: {

                        backgroundColor: '#F9F9F9'
                    },

                    border: true,

                    collapsible: true,
                    collapsed: true,

                    layout: {
                        type: 'hbox'
                    },

                    items: [
                        {
                            xtype: 'form',
                            title: 'Datos médicos',
                            // collapsible: true,
                            // collapsed: false,
                            bodyPadding: 10,
                            flex: 1,
                            margin: 2,

                            // header: {
                            //     style: {
                            //         backgroundColor: '#ebebebff',
                            //         color: 'blue'
                            //     },
                            // },

                            // bodyStyle: {
                            //     backgroundColor: '#ebebebff',
                            // },

                            style: {
                                border: '2px solid #cbcbcbff',
                                borderRadius: '2px',
                            },

                            items: [

                                {
                                    xtype: 'textfield',
                                    emptyText: 'Dummy'
                                },
                                {
                                    xtype: 'textfield',
                                    emptyText: 'Dummy'
                                },
                                {
                                    xtype: 'textfield',
                                    emptyText: 'Dummy'
                                },
                                {
                                    xtype: 'textfield',
                                    emptyText: 'Dummy'
                                },

                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'vbox',
                                align: 'stretch',
                            },
                            flex: 1,

                            items: [
                                {
                                    xtype: 'form',
                                    title: 'Diagnósticos',
                                    collapsible: true,
                                    collapsed: true,
                                    bodyPadding: 10,
                                    felx: 1,
                                    margin: 2,

                                    // header: {
                                    //     style: {
                                    //         backgroundColor: '#ebebebff',
                                    //         color: 'blue'
                                    //     },
                                    // },

                                    // bodyStyle: {
                                    //     backgroundColor: '#ebebebff',
                                    // },

                                    style: {
                                        border: '2px solid #cbcbcbff',
                                        borderRadius: '2px',
                                    },

                                    items: [

                                        {
                                            xtype: 'textfield',
                                            emptyText: 'Dummy'
                                        },
                                        {
                                            xtype: 'textfield',
                                            emptyText: 'Dummy'
                                        },

                                    ]
                                },
                                {
                                    xtype: 'form',
                                    title: 'Comentarios del paciente',
                                    collapsible: true,
                                    collapsed: true,
                                    bodyPadding: 10,
                                    flex: 1,
                                    margin: 2,

                                    // header: {
                                    //     style: {
                                    //         backgroundColor: '#ebebebff',
                                    //         color: 'blue'
                                    //     },
                                    // },

                                    // bodyStyle: {
                                    //     backgroundColor: '#ebebebff',
                                    // },

                                    style: {
                                        border: '2px solid #cbcbcbff',
                                        borderRadius: '2px',
                                    },

                                    items: [

                                        {
                                            xtype: 'textfield',
                                            emptyText: 'Dummy'
                                        },
                                        {
                                            xtype: 'textfield',
                                            emptyText: 'Dummy'
                                        },

                                    ]
                                }
                            ]
                        },
                    ]
                }
            ]
        }
    ],

    initComponent: function () {

        var me = this;

        // tiene que estar arriba aqui
        me.callParent();

        var contFichaPaciente = Ext.ComponentQuery.query('[name=containerFichaPaciente]')[0];

        console.log(contFichaPaciente);

        contFichaPaciente.add(
            {
                xtype: 'panel',
                bodyPadding: 5,
                layout: 'hbox',
                margin: '-10 10 0 10',
                bodyStyle: {

                    backgroundColor: '#F9F9F9'
                },
                border: true,

                defaults: {
                    margin: '0 5 0 0',
                    // labelAlign: 'center'
                },

                name: 'summaryFichaPaciente',

                items: [
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Dummy',
                        value: 'Dummy'
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Dummy',
                        value: 'Dummy'
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Dummy',
                        value: 'Dummy'
                    }
                ]
            }
        )
    }

    // // Configuración de la ventana
    // 
    // modal: true,
    // width: 400,
    // layout: 'fit',

    // // Iconos
    // iconCls: 'fa fa-user',

    // // Variables para saber si estamos editando o creando
    // isEdit: false,
    // record: null,

    // /**
    //  * Inicialización del componente
    //  */
    // initComponent: function () {
    //     var me = this;

    //     // Si estamos editando, cambiar el título
    //     if (me.isEdit) {
    //         me.title = 'Editar Centro';
    //     }

    //     // Definir los items (el formulario)
    //     me.items = [{
    //         xtype: 'form',
    //         reference: 'centerForm',
    //         bodyPadding: 20,
    //         defaults: {
    //             xtype: 'textfield',
    //             anchor: '100%',
    //             labelWidth: 80,
    //             margin: '0 0 15 0'
    //         },
    //         items: [
    //             {
    //                 xtype: 'displayfield',
    //                 fieldLabel: 'ID',
    //                 name: 'id',
    //                 hidden: !me.isEdit,
    //                 value: me.record ? me.record.get('id') : ''
    //             },
    //             {
    //                 fieldLabel: 'Nombre',
    //                 name: 'nombre',
    //                 allowBlank: false,
    //                 blankText: 'El nombre es obligatorio',
    //                 emptyText: 'Ingrese el nombre completo'
    //             },
    //             {
    //                 fieldLabel: 'Descripción',
    //                 name: 'descripcion',
    //                 allowBlank: true,
    //             }
    //         ]
    //     }];

    //     // Botones de acción
    //     me.buttons = [
    //         {
    //             text: 'Cancelar',
    //             iconCls: 'fa fa-times',
    //             handler: function () {
    //                 me.close();
    //             }
    //         },
    //         {
    //             text: 'Guardar',
    //             iconCls: 'fa fa-save',
    //             formBind: true, // Solo se habilita si el formulario es válido
    //             handler: function () {
    //                 me.saveCenter();
    //             }
    //         }
    //     ];

    //     me.callParent(arguments);

    //     // Si estamos editando, cargar los datos en el formulario
    //     if (me.isEdit && me.record) {
    //         var form = me.down('form').getForm();
    //         form.loadRecord(me.record);
    //     }
    // },

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
