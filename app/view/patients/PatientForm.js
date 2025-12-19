Ext.define('Tutorial.view.PatientForm', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.patientform',

    title: 'Crear Paciente',

    // store: patients,

    store: {
        type: 'patients'
    },

    record: null,

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
                        beforeCollapse: function (panel) {

                            // var me = this;

                            // tiene que estar arriba aqui
                            // me.callParent();

                            // var contFichaPaciente = Ext.ComponentQuery.query('[name=containerFichaPaciente]')[0];

                            var values = Ext.ComponentQuery.query('[name=panelFichaPaciente]')[0].down('form').getForm().getValues();

                            console.log(values);

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
                                            fieldLabel: 'Nombre',
                                            value: values.nombre
                                        },
                                        {
                                            xtype: 'displayfield',
                                            fieldLabel: 'Primer apellido',
                                            value: values.apellido1
                                        },
                                        {
                                            xtype: 'displayfield',
                                            fieldLabel: 'Segundo apellido',
                                            value: values.apellido2
                                        },
                                        {
                                            xtype: 'displayfield',
                                            fieldLabel: 'DNI',
                                            value: values.dni
                                        }
                                    ]
                                }
                            )

                            // panel.up('container').add(
                            //     {
                            //         xtype: 'panel',
                            //         bodyPadding: 5,
                            //         layout: 'hbox',
                            //         margin: '-10 10 0 10',
                            //         bodyStyle: {

                            //             backgroundColor: '#F9F9F9'
                            //         },
                            //         border: true,

                            //         defaults: {
                            //             margin: '0 5 0 0',
                            //             // labelAlign: 'center'
                            //         },

                            //         name: 'summaryFichaPaciente',

                            //         items: [
                            //             {
                            //                 xtype: 'displayfield',
                            //                 fieldLabel: 'Dummy',
                            //                 value: 'Dummy'
                            //             },
                            //             {
                            //                 xtype: 'displayfield',
                            //                 fieldLabel: 'Dummy',
                            //                 value: 'Dummy'
                            //             },
                            //             {
                            //                 xtype: 'displayfield',
                            //                 fieldLabel: 'Dummy',
                            //                 value: 'Dummy'
                            //             }
                            //         ]
                            //     }
                            // )
                        }
                    },

                    layout: {
                        type: 'hbox'
                    },

                    items: [

                        {
                            title: 'Demográficos',
                            xtype: 'form',
                            name: 'formDemograficos',
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
                                        },
                                        {
                                            xtype: 'textfield',
                                            emptyText: 'Nombre',
                                            name: 'nombre'
                                        },
                                        {
                                            xtype: 'textfield',
                                            emptyText: 'Segundo apellido',
                                            name: 'apellido2'
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
                                            xtype: 'container',
                                            layout: 'hbox',
                                            margin: '0 0 10 0',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    emptyText: 'DNI',
                                                    flex: 1,
                                                    margin: '0 10 0 0',
                                                    name: 'dni'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    emptyText: 'Dummy',
                                                    flex: 2,
                                                    margin: '0 0 0 10'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'textfield',
                                            emptyText: 'Primer apellido',
                                            name: 'apellido1'
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            margin: '0 0 10 0',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    emptyText: 'Fecha de nacimiento',
                                                    flex: 1,
                                                    margin: '0 10 0 0',
                                                    name: 'fechaDeNacimiento'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    emptyText: 'Sexo',
                                                    flex: 1,
                                                    margin: '0 0 0 10',
                                                    name: 'sexo'
                                                }
                                            ]
                                        },
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
                                    title: 'Datos de contacto',
                                    xtype: 'form',
                                    name: 'formDatosDeContacto',
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
                                            emptyText: 'Número de teléfono',
                                            name: 'numeroTelefono'
                                        },
                                        {
                                            xtype: 'textfield',
                                            emptyText: 'Correo electrónico',
                                            name: 'email'
                                        },
                                        {
                                            xtype: 'textfield',
                                            emptyText: 'Dummy'
                                        }
                                    ]
                                },
                                {
                                    title: 'Otros datos de contacto',
                                    xtype: 'form',
                                    name: 'formOtrosDatosDeContacto',
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

                    // header: {
                    //     items: [

                    //         {
                    //             xtype: 'checkbox',
                    //             cls: 'title-checkbox',
                    //             width: 40,
                    //             // height: 10 
                    //         }
                    //     ]
                    // },

                    items: [
                        {
                            xtype: 'form',
                            title: 'Datos médicos',
                            name: 'formDatosMedicos',
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
                                    emptyText: 'Color de ficha',
                                    name: 'colorFichaMedica'
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
                                    name: 'formDiagnosticos',
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
                                    name: 'formComentarios',
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

    bbar: [

        {
            text: 'Cancelar',
            iconCls: 'fa fa-times',
            handler: function () {
                window.location = '/app';
            }
        },
        {
            text: 'Guardar',
            iconCls: 'fa fa-save',
            handler: function (button) {

                var me = button.up();

                console.log("toca guardar");

                // var formDemograficos = Ext.ComponentQuery.query('[name=panelFichaPaciente]')[0].down('form').getForm();
                // console.log(formDemograficos);

                // var formDatosDeContacto = Ext.ComponentQuery.query('[name=panelFichaPaciente]')[0].child('container').down('form')//.getForm();
                // console.log(formDatosDeContacto);

                // var formOtrosDatosDeContacto = formDatosDeContacto.getNextSibling();
                // console.log(formOtrosDatosDeContacto);

                // name: formOtrosDatosDeContacto,
                // name: formDatosDeContacto,
                // name: formDemograficos,
                // name: 'formComentarios',
                // name: 'formDiagnosticos',
                // name: 'formDatosMedicos',

                // pillar todos los forms
                var demograficos = Ext.ComponentQuery.query('[name=formDemograficos]')[0];
                var datosDeContacto = Ext.ComponentQuery.query('[name=formDatosDeContacto]')[0];
                var otrosDatosDeContacto = Ext.ComponentQuery.query('[name=formOtrosDatosDeContacto]')[0];
                var datosMedicos = Ext.ComponentQuery.query('[name=formDatosMedicos]')[0];
                var diagnosticos = Ext.ComponentQuery.query('[name=formDiagnosticos]')[0];
                var comentarios = Ext.ComponentQuery.query('[name=formComentarios]')[0];

                // juntar datos
                var allData = {
                    ...demograficos.getValues(), ...datosDeContacto.getValues(), ...otrosDatosDeContacto.getValues(),
                    ...datosMedicos.getValues(), ...diagnosticos.getValues(), ...comentarios.getValues()
                };

                console.log(allData);

                // quitar dummy data de relleno
                allData = {
                    apellido1: allData.apellido1,
                    apellido2: allData.apellido2,
                    colorFichaMedica: allData.colorFichaMedica,
                    dni: allData.dni,
                    email: allData.email,
                    fechaDeNacimiento: allData.fechaDeNacimiento,
                    nombre: allData.nombre,
                    numeroTelefono: allData.numeroTelefono,
                    sexo: allData.sexo
                };

                console.log(allData);

                // enviar a server en modo editar si hay record i si no en modo creaar
                console.log("debugar esto record desde button: ", button.up().record);

                if (me.record) {

                    // Hacer put con id del record

                } else {

                    // Hacer post
                    Ext.Ajax.request({
                        url: 'http://localhost:8080/api/patients',
                        method: 'POST',
                        jsonData: allData,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            console.log('✅ Paciente creado exitosamente:', result);

                            me.setLoading(false);
                            Ext.Msg.alert('Éxito', 'Paciente creado correctamente', function () {

                                // hacer "que vuelva" (modificar xtype para cargar el grid de pacientes) 
                                Ext.getCmp('panelGrids').removeAll(true, true);
                                Ext.getCmp('panelGrids').add(Ext.create({
                                    xtype: 'patientgrid'
                                }));
                            });
                        },
                        failure: function (response) {
                            console.error('❌ Error al crear paciente:', response);
                            me.setLoading(false);
                            Ext.Msg.alert('Error', 'No se pudo crear el paciente: ' + response.statusText);
                        }
                    });
                }
            }
        }
    ],

    initComponent: function () {

        var me = this;

        // tiene que estar arriba aqui
        me.callParent();

        var contFichaPaciente = Ext.ComponentQuery.query('[name=containerFichaPaciente]')[0];

        var form = Ext.ComponentQuery.query('[name=panelFichaPaciente]')[0].down('form').getForm();

        // Si estamos editando, cargar los datos en el formulario
        if (me.record) {

            // pillar todos los forms i cargar datos
            Ext.ComponentQuery.query('[name=formDemograficos]')[0].getForm().loadRecord(me.record);
            Ext.ComponentQuery.query('[name=formDatosDeContacto]')[0].getForm().loadRecord(me.record);
            Ext.ComponentQuery.query('[name=formOtrosDatosDeContacto]')[0].getForm().loadRecord(me.record);
            Ext.ComponentQuery.query('[name=formDatosMedicos]')[0].getForm().loadRecord(me.record);
            Ext.ComponentQuery.query('[name=formDiagnosticos]')[0].getForm().loadRecord(me.record);
            Ext.ComponentQuery.query('[name=formComentarios]')[0].getForm().loadRecord(me.record);
        }

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
                        fieldLabel: 'Nombre',
                        value: 'a'//form.findField('nombre').getValue() TODO: terminar
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Primer apellido',
                        value: 'a'//form.findField('apellido1').getValue() 
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Segundo apellido',
                        value: 'a'//form.findField('apellido2').getValue()
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'DNI',
                        value: 'a'//form.findField('dni').getValue()
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
