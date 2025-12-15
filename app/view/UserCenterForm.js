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

                    // Si no encuentra el index, da -1 i entonces filtered = true i no filtra
                    var filtered = selectedIds.indexOf(record.get('id')) === -1;

                    console.log("filtrar: ", filtered);
                    return filtered
                });

                console.log("count: ", centersStore.getCount());

                // Resfrescar el grid 1 (NO HACE FALTA?) // TODO: revisar
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
                layout: 'hbox',
                align: 'stretch',
                // width: 900,
                // height: 400,
                defaults: {
                    margin: 20
                },

                items: [

                    {
                        store: centersStore,

                        xtype: 'grid',
                        id: 'centersGrid',
                        title: 'Centros disponibles',
                        flex: 1,

                        selModel: {
                            type: 'checkboxmodel'
                        },

                        columns: [
                            {
                                text: 'ID Centro',
                                dataIndex: 'id',
                                width: 100,
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

                                // deseleccionar primero
                                var centersGrid = Ext.getCmp('centersGrid');
                                centersGrid.getSelectionModel().deselect(record);

                                // creamos un nuevo record para el grid 2 (como que son tablas difrentes se tiene que mapear un poco)
                                var newRecord = Ext.create(userCentersStore.getModel(), {
                                    idCentro: record.get('id'),
                                    idUsuario: me.record.get('id') // el id del usuario actual
                                });

                                console.log("nuevo record a poner en grid 2: ", newRecord);

                                userCentersStore.add(newRecord);
                            }
                        }


                    },
                    {
                        xtype: 'container',
                        width: 50,
                        layout: {
                            type: 'vbox',
                            pack: 'center',
                            align: 'center'
                        },

                        defaults: {
                            margin: '20 0 0 0'
                        },

                        items: [

                            {
                                xtype: 'button',
                                flex: 1,
                                // text: 'ALL →',
                                iconCls: 'fa fa-forward',
                                margin: '40 0 0 0',
                                handler: function () {

                                    var centersGrid = Ext.getCmp('centersGrid');
                                    centersGrid.getSelectionModel().deselectAll();

                                    var arrayFilteredRecords = centersStore.getData().items

                                    console.log("todos los filtrados a pasar: ", arrayFilteredRecords);

                                    arrayFilteredRecords.forEach(filteredRecord => {

                                        var newRecord = Ext.create(userCentersStore.getModel(), {
                                            idCentro: filteredRecord.get('id'),
                                            idUsuario: me.record.get('id') // el id del usuario actual
                                        });

                                        console.log("nuevo record a poner en grid 2: ", newRecord);

                                        userCentersStore.add(newRecord);
                                    });
                                }
                            },
                            {
                                xtype: 'button',
                                flex: 1,
                                iconCls: 'fa fa-play',
                                // text: '→',

                                handler: function () {

                                    var centersGrid = Ext.getCmp('centersGrid');
                                    // var usersCentersGrid = Ext.getCmp('usersCentersGrid');

                                    var arraySelected = centersGrid.getSelectionModel().getSelection();

                                    // Añadimos todos los seleccionados
                                    arraySelected.forEach(selectedRecord => {

                                        var newRecord = Ext.create(userCentersStore.getModel(), {
                                            idCentro: selectedRecord.get('id'),
                                            idUsuario: me.record.get('id') // el id del usuario actual
                                        });

                                        console.log("nuevo record a poner en grid 2: ", newRecord);

                                        userCentersStore.add(newRecord);

                                    });

                                    centersGrid.getSelectionModel().deselectAll();
                                    // usersCentersGrid.getSelectionModel().deselectAll(); // No hace falta?
                                }
                            },
                            {
                                xtype: 'button',
                                flex: 1,
                                // text: '←',
                                iconCls: 'fa fa-play fa-flip-horizontal',
                                handler: function () {

                                    var usersCentersGrid = Ext.getCmp('usersCentersGrid');

                                    var arraySelected = usersCentersGrid.getSelectionModel().getSelection();

                                    // Eliminamos todos los seleccionados
                                    arraySelected.forEach(selectedRecord => {

                                        // Simplemente eliminar del segundo grid i el filter de antes se encarga de que vuelva a salir arriba
                                        userCentersStore.remove(selectedRecord);
                                    });

                                    usersCentersGrid.getSelectionModel().deselectAll();
                                }

                            },
                            {
                                xtype: 'button',
                                flex: 1,
                                iconCls: 'fa fa-backward',
                                // text: 'ALL ←',
                                handler: function () {

                                    // Simplemente quitar todos
                                    var usersCentersGrid = Ext.getCmp('usersCentersGrid');
                                    usersCentersGrid.getSelectionModel().deselectAll();
                                    userCentersStore.removeAll();
                                }

                            }
                        ]
                    },
                    {
                        store: userCentersStore,
                        xtype: 'grid',
                        id: 'usersCentersGrid',
                        title: 'Centros asignados',
                        flex: 1,

                        selModel: {
                            type: 'checkboxmodel'
                        },

                        columns: [
                            {
                                text: 'ID Centro',
                                dataIndex: 'idCentro',
                                width: 100,
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

                            itemdblclick: function (grid, record) {

                                // deseleccionar primero
                                var usersCentersGrid = Ext.getCmp('usersCentersGrid');
                                usersCentersGrid.getSelectionModel().deselect(record);

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
                handler: function () {

                    console.log("toca guardar");


                    // Eliminamos manualmente todos los centros del usuario actual
                    Ext.Ajax.request({
                        url: 'http://localhost:8080/api/usersCenters/' + me.record.get('id'),
                        method: 'DELETE',

                        success: function (response) {

                            // Añadimos todos los centros que tenemos asignados al usuario
                            if (userCentersStore.getCount() != 0) {

                                var items = [];

                                userCentersStore.each(function (record) {
                                    items.push(record.getData());
                                });

                                Ext.Ajax.request({
                                    url: 'http://localhost:8080/api/usersCenters/createAll',
                                    method: 'POST',
                                    jsonData: items,
                                    
                                    success: function (response) {
                                        Ext.Msg.alert('Éxito', 'Se han actualizado los centros del usuario.');
                                        me.close();
                                    },
                                    failure: function (response) {
                                        Ext.Msg.alert('Error', 'No se ha podido actualizar los centros del usuario.');
                                    }
                                });

                            } else {
                                Ext.Msg.alert('Éxito', 'Se han eliminado los centros del usuario.');
                                me.close();
                            }
                        },
                        failure: function (response) {
                            Ext.Msg.alert('Error', 'No se ha podido actualizar los centros del usuario.');
                        }
                    });

                    // userCentersStore.sync({
                    //     success: function (batch, options) {

                    //         console.log('sync correcto');
                    //     },
                    //     failure: function (batch, options) {
                    //         console.log('sync incorrecto');
                    //     }
                    // });
                }
            }
        ];

        me.callParent(arguments);


        // var form = me.down('form').getForm();
        // form.loadRecord(me.record);
    },
});
