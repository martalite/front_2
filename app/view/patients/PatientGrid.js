Ext.define('Tutorial.view.PatientGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.patientgrid',

    // Título del panel
    title: 'Gestión de Pacientes',

    // Configuración del grid
    frame: true,

    // Asociar el store
    store: {
        type: 'patients'
    },

    // plugins: ['gridfilters'],
    // filterable: true,
    // features: [filters],
    autoScroll: true,

    // docked items para los filtros del grid
    dockedItems: [{
        xtype: 'form',
        dock: 'top',
        bodyPadding: 5,
        collapsible: true,
        title: 'Filtros',
        layout: 'hbox',
        margin: 10,

        defaults: {
            margin: '0 15 0 0',
            labelAlign: 'left'
        },

        name: 'filtersGrid',

        items: [
            {
                xtype: 'textfield',
                name: 'nombre',
                fieldLabel: 'Nombre',
                flex: 0.5
            },
            {
                xtype: 'textfield',
                name: 'descripcion',
                fieldLabel: 'Descripción',
                flex: 1
            },
            {
                xtype: 'numberfield',
                name: 'numeroCorto',
                fieldLabel: 'Número corto',
                flex: 0.5
            }

        ]
    }],

    // Barra de herramientas superior
    tbar: [
        {
            xtype: 'button',
            text: 'Buscar',
            iconCls: 'fa fa-search',
            handler: function () {

                // pillar values
                var values = Ext.ComponentQuery.query('[name=filtersGrid]')[0].getValues();

                console.log(values);
                
                var store = Ext.ComponentQuery.query('patientgrid')[0].getStore();

                // añadir filtros (mantener otras cosas)
                Ext.apply(store.getProxy().extraParams, values);

                // cargar la pmirera página del store
                store.loadPage(1);
            }
        },
        {
            xtype: 'button',
            text: 'Limpiar',
            iconCls: 'fa fa-eraser',
            handler: function (btn) {

                var grid = btn.up('patientgrid');
                var store = grid.getStore();

                btn.up('form').reset();

                // machacar los filtros i demás
                store.getProxy().extraParams = {};
                store.loadPage(1);
            }
        }
    ],

    // Columnas del grid
    columns: [
        {
            text: 'ID',
            dataIndex: 'id',
            width: 60,
            align: 'patient',
            // Renderizador personalizado para dar estilo
            renderer: function (value) {
                return '<span style="font-weight: bold; color: #667eea;">#' + value + '</span>';
            }
        },
        {
            text: 'Nombre',
            dataIndex: 'nombre',
            flex: 0.5,
            // Ordenable
            sortable: true,
            // Renderizador con icono
            // renderer: function (value) {
            //     return '<i class="fa fa-user"></i> ' + value;
            // },
            filter: {
                type: 'string'
            }
        },
        {
            text: 'Descripción',
            dataIndex: 'descripcion',
            flex: 1,
            // Ordenable
            sortable: true,
            // Renderizador con icono
            // renderer: function (value) {
            //     return '<i class="fa fa-user"></i> ' + value;
            // },
            filter: {
                type: 'string'
            }
        },
        {
            text: 'Número corto',
            dataIndex: 'numeroCorto',
            flex: 0.5
        },
        {
            text: 'Acciones',
            xtype: 'actioncolumn',
            width: 100,
            align: 'center',
            items: [
                {
                    iconCls: 'fa fa-edit',
                    tooltip: 'Editar paciente',
                    handler: 'onEditPatient'
                },
                {
                    iconCls: 'fa fa-trash',
                    tooltip: 'Eliminar paciente',
                    handler: 'onDeletePatient',
                    // Estilo para el icono de eliminar
                    getClass: function () {
                        return 'fa fa-trash delete-icon';
                    }
                }
            ]
        }
    ],


    // Barra de paginación inferior
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Mostrando pacientes {0} - {1} de {2}',
        emptyMsg: 'No hay pacientes para mostrar'
    },

    // Listeners
    listeners: {
        // Se ejecuta cuando se hace doble clic en una fila
        itemdblclick: 'onEditPatient'
    },

    // Controller con los métodos de acción
    controller: {

        // /**
        //  * CREAR - Abrir formulario para nuevo paciente
        //  */
        // onNewPatient: function () {
        //     console.log('➕ Abriendo formulario para nuevo paciente');

        //     var form = Ext.create('Tutorial.view.PatientForm', {
        //         isEdit: false
        //     });

        //     // Escuchar el evento de guardado
        //     form.on('patientsaved', this.onReload, this);

        //     form.show();
        // },

        /**
         * ACTUALIZAR - Abrir formulario para editar paciente
         */
        onEditPatient: function (grid, record) {
            console.log('📝 Editando paciente:', record.data);

            var form = Ext.create('Tutorial.view.PatientForm', {
                isEdit: true,
                record: record
            });

            // Escuchar el evento de guardado
            form.on('patientsaved', this.onReload, this);

            form.show();
        },

        /**
         * ELIMINAR - Método DELETE
         * Elimina un paciente del servidor
         */
        onDeletePatient: function (grid, rowIndex, colIndex, item, e, record) {
            var me = this;

            console.log('🗑️ Solicitando eliminar paciente:', record.data);

            // Confirmar eliminación
            Ext.Msg.confirm(
                'Confirmar eliminación',
                '¿Está seguro que desea eliminar a <b>' + record.get('nombre') + '</b>?',
                function (button) {
                    if (button === 'yes') {
                        me.deletePatient(record);
                    }
                }
            );
        },

        /**
         * Ejecuta la petición DELETE
         */
        deletePatient: function (record) {
            var me = this,
                grid = me.getView(),
                id = record.get('id');

            console.log('📤 DELETE - Eliminando paciente ID:', id);

            // Mostrar loading
            grid.setLoading('Eliminando...');

            // Hacer la petición DELETE
            Ext.Ajax.request({
                url: 'http://localhost:8080/api/patients/' + id,
                method: 'DELETE',
                success: function (response) {
                    console.log('✅ Paciente eliminado exitosamente');

                    grid.setLoading(false);
                    Ext.Msg.alert('Éxito', 'Paciente eliminado correctamente');

                    // Recargar el grid
                    me.onReload();
                },
                failure: function (response) {
                    console.error('❌ Error al eliminar paciente:', response);
                    grid.setLoading(false);
                    Ext.Msg.alert('Error', 'No se pudo eliminar el paciente: ' + response.statusText);
                }
            });
        },

        /**
         * LEER - Método GET
         * Recarga los datos del servidor
         */
        onReload: function () {
            var grid = this.getView(),
                store = grid.getStore();

            console.log('📥 GET - Recargando datos desde el servidor');

            // Limpiar filtros de búsqueda
            store.clearFilter();

            // Recargar el store (hace una petición GET)
            store.load({
                callback: function (records, operation, success) {
                    if (success) {
                        console.log('✅ Datos recargados correctamente:', records.length, 'registros');
                    } else {
                        console.error('❌ Error al recargar datos');
                    }
                }
            });
        },

        /**
         * BUSCAR - Filtrado local
         * Filtra los datos que ya están en el grid
         */
        onSearch: function (field) {
            var grid = this.getView(),
                store = grid.getStore(),
                searchValue = field.getValue();

            console.log('🔍 Buscando:', searchValue);

            // Limpiar filtros anteriores
            store.clearFilter();

            if (searchValue) {
                // Filtrar por nombre
                store.filter([
                    {
                        filterFn: function (record) {
                            var nombre = record.get('nombre').toLowerCase(),
                                search = searchValue.toLowerCase();

                            return nombre.indexOf(search) > -1;
                        }
                    }
                ]);
            }
        }
    }
});
