Ext.define('Tutorial.view.UserCenterForm', {
    extend: 'Ext.window.Window',

    alias: 'widget.usercenterform',

    // Configuración de la ventana
    title: 'Gestión de centros asignados',
    modal: true,
    width: 1200,
    height: 600,
    layout: 'fit',

    record: null,

    /**
     * Inicialización del componente
     */
    initComponent: function () {
        var me = this;

        console.log(me.record);

        // var userCentersStore = Ext.getStore('UsersCenters');

        var centersStore = Ext.create('Tutorial.store.Centers')

        var userCentersStore = Ext.create('Tutorial.store.UsersCenters');

        console.log("store: ", userCentersStore);

        // Filtrar el grid de centros en modificar el grid 2 para quitar los centros que ya tiene el usuario.
        // Solo cuando se hayan cargado los centros
        centersStore.on('load', function () {

            userCentersStore.on('datachanged', function () {

                // Obtener ids de los centros que tiene el usuario
                var selectedIds = userCentersStore.collect('idCentro');

                console.log(selectedIds);


                centersStore.clearFilter();

                // Filtrar de centros disponibles
                centersStore.filterBy(function (record) {

                    console.log("record: ", record.get('id'));

                    // console.log(centersStore.get("id"));


                    var filtered = selectedIds.indexOf(record.get('id')) === -1;

                    console.log("filtrar: ", filtered);
                    return filtered
                });

                console.log("count: ", centersStore.getCount());

                // Resfrescar el grid 1 (NO HACE FALTA?)
                // var grid = Ext.getCmp('centersGrid');
                // console.log("grid: ", grid);
                // grid.getView().refresh();
            });
        });

        // Cargar todos los centros del usuario seleccionado
        userCentersStore.load({
            params: {
                idUsuario: me.record.get('id')
            },
        });

        // Definir los items
        me.items = [

            {
                xtype: 'container',
                // layout: 'hbox',
                // width: 900,
                // height: 400,

                items: [

                    {
                        store: centersStore,

                        xtype: 'grid',
                        id: 'centersGrid',
                        title: 'Centros disponibles',
                        height: 200,
                        selModel: null, // de momento que no se seeleccione

                        columns: [
                            {
                                text: 'ID Centro',
                                dataIndex: 'id',
                                flex: 1,
                                align: 'center',

                            },
                            {
                                text: 'Nombre',
                                dataIndex: 'nombre',
                                flex: 1,
                                align: 'center',

                            }
                        ],


                        listeners: {
                            itemdblclick: function (grid, record) {

                                // creamos un nuevo record para el grid 2 (como que son tablas difrentes se tiene que mapear un poco)
                                var newRecord = Ext.create(userCentersStore.getModel(), {
                                    idCentro: record.get('id'),
                                    userId: me.record.get('id') // el id del usuario actual
                                });

                                console.log("nuevo record a poner en grid 2: ", newRecord);

                                userCentersStore.add(newRecord);
                            }
                        }


                    },
                    {
                        store: userCentersStore,
                        xtype: 'grid',
                        title: 'Centros assignados',
                        height: 200,
                        selModel: null, // de momento que no se seeleccione

                        columns: [
                            {
                                text: 'ID Centro',
                                dataIndex: 'idCentro',
                                flex: 1,
                                align: 'center',
                            },
                            {
                                text: 'Nombre',
                                dataIndex: 'idCentro',
                                flex: 1,
                                align: 'center',

                                // render custom para mostrar el nombre del centro de la otra tabla
                                renderer: function (value) {
                                    var center = centersStore.getById(value);
                                    return center ? center.get('nombre') : '';
                                }
                            }

                        ],

                        listeners: {

                            itemdblclick: function(grid, record) {

                                // Simplemente eliminar del segundo grid i el filter de antes se encarga de que vuelva  a salir arriba
                                userCentersStore.remove(record);
                            }
                        }
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
