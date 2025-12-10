/**
 * GRID DE USUARIOS
 * 
 * El grid es una tabla que muestra los datos y permite interactuar con ellos.
 * 
 * Aprenderás:
 * - Cómo crear un grid en ExtJS
 * - Cómo conectar el grid con el store
 * - Cómo implementar las operaciones CRUD
 */

Ext.define('Tutorial.view.ProfileGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.profilegrid',

    // Título del panel
    title: 'Gestión de Perfiles',

    // Configuración del grid
    frame: true,

    // Asociar el store
    store: {
        type: 'profiles'
    },

    // Columnas del grid
    columns: [
        {
            text: 'ID',
            dataIndex: 'id',
            width: 60,
            align: 'center',
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
            renderer: function (value) {
                return '<i class="fa fa-user"></i> ' + value;
            }
        },
        {
            text: 'Descripción',
            dataIndex: 'descripcion',
            flex: 1
        },
        {
            text: 'Email de Contacto',
            dataIndex: 'emailDeContacto',
            flex: 1,
            sortable: true,
            // Renderizador con icono
            renderer: function (value) {
                return '<i class="fa fa-envelope"></i> ' + value;
            }
        },
        {
            text: 'Id Usuario',
            dataIndex: 'idUsuario',
            width: 100,
            align: 'center',
            sortable: true,
            // Renderizador con icono
            renderer: function (value) {
                return '<i class="fa fa-user"></i> ' + value;
            }
        },
        {
            text: 'Acciones',
            xtype: 'actioncolumn',
            width: 100,
            align: 'center',
            items: [
                {
                    iconCls: 'fa fa-edit',
                    tooltip: 'Editar perfil',
                    handler: 'onEditProfile'
                },
                {
                    iconCls: 'fa fa-trash',
                    tooltip: 'Eliminar perfil',
                    handler: 'onDeleteProfile',
                    // Estilo para el icono de eliminar
                    getClass: function () {
                        return 'fa fa-trash delete-icon';
                    }
                }
            ]
        }
    ],

    // Barra de herramientas superior
    tbar: [
        {
            text: 'Nuevo Perfil',
            iconCls: 'fa fa-plus',
            handler: 'onNewProfile',
            // Estilo del botón
            ui: 'default',
            scale: 'medium'
        },
        '-', // Separador
        {
            text: 'Recargar',
            iconCls: 'fa fa-refresh',
            handler: 'onReload',
            scale: 'medium'
        },
        '->',  // Empuja los siguientes items a la derecha
        {
            xtype: 'textfield',
            reference: 'searchField',
            emptyText: 'Buscar...',
            width: 200,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onSearch'
            }
        }
    ],

    // Barra de paginación inferior
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Mostrando perfiles {0} - {1} de {2}',
        emptyMsg: 'No hay perfiles para mostrar'
    },

    // Listeners
    listeners: {
        // Se ejecuta cuando se hace doble clic en una fila
        itemdblclick: 'onEditProfile'
    },

    // Controller con los métodos de acción
    controller: {

        /**
         * CREAR - Abrir formulario para nuevo perfil
         */
        onNewProfile: function () {
            console.log('➕ Abriendo formulario para nuevo perfil');

            var form = Ext.create('Tutorial.view.ProfileForm', {
                isEdit: false
            });

            // Escuchar el evento de guardado
            form.on('profilesaved', this.onReload, this);

            form.show();
        },

        /**
         * ACTUALIZAR - Abrir formulario para editar perfil
         */
        onEditProfile: function (grid, record) {
            console.log('📝 Editando perfil:', record.data);

            var form = Ext.create('Tutorial.view.ProfileForm', {
                isEdit: true,
                record: record
            });

            // Escuchar el evento de guardado
            form.on('profilesaved', this.onReload, this);

            form.show();
        },

        /**
         * ELIMINAR - Método DELETE
         * Elimina un perfil del servidor
         */
        onDeleteProfile: function (grid, rowIndex, colIndex, item, e, record) {
            var me = this;

            console.log('🗑️ Solicitando eliminar perfil:', record.data);

            // Confirmar eliminación
            Ext.Msg.confirm(
                'Confirmar eliminación',
                '¿Está seguro que desea eliminar a <b>' + record.get('nombre') + '</b>?',
                function (button) {
                    if (button === 'yes') {
                        me.deleteProfile(record);
                    }
                }
            );
        },

        /**
         * Ejecuta la petición DELETE
         */
        deleteProfile: function (record) {
            var me = this,
                grid = me.getView(),
                id = record.get('id');

            console.log('📤 DELETE - Eliminando perfil ID:', id);

            // Mostrar loading
            grid.setLoading('Eliminando...');

            // Hacer la petición DELETE
            Ext.Ajax.request({
                url: 'http://localhost:8080/api/profiles/' + id,
                method: 'DELETE',
                success: function (response) {
                    console.log('✅ Perfil eliminado exitosamente');

                    grid.setLoading(false);
                    Ext.Msg.alert('Éxito', 'Perfil eliminado correctamente');

                    // Recargar el grid
                    me.onReload();
                },
                failure: function (response) {
                    console.error('❌ Error al eliminar perfil:', response);
                    grid.setLoading(false);
                    Ext.Msg.alert('Error', 'No se pudo eliminar el perfil: ' + response.statusText);
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
                // Filtrar por nombre o emailDeContacto
                store.filter([
                    {
                        filterFn: function (record) {
                            var nombre = record.get('nombre').toLowerCase(),
                                emailDeContacto = record.get('emailDeContacto').toLowerCase(),
                                search = searchValue.toLowerCase();

                            return nombre.indexOf(search) > -1 || emailDeContacto.indexOf(search) > -1;
                        }
                    }
                ]);
            }
        }
    }
});
