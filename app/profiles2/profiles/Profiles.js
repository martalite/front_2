
Ext.define('profiles.Profile', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.profile',

    controller: 'profilescontroller',

    // Título del panel
    title: 'Perfiles',

    // Configuración del grid
    // frame: true,



    layout: 'column',
    items: [

        {
            margin: 10,
            columnWidth: 0.4,

            xtype: 'grid',
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
                // {
                //     text: 'Descripción',
                //     dataIndex: 'descripcion',
                //     flex: 1
                // },
                // {
                //     text: 'Email de Contacto',
                //     dataIndex: 'emailDeContacto',
                //     flex: 1,
                //     sortable: true,
                //     // Renderizador con icono
                //     renderer: function (value) {
                //         return '<i class="fa fa-envelope"></i> ' + value;
                //     }
                // },
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


            // Listeners del grid de la izquierda
            listeners: {

                itemdblclick: 'onSelectProfile'
            }

        },

        {
            // TODO: rehacer
            columnWidth: 0.6,
            margin: 10,
            id: 'rightColumn',
            xtype: 'container',

            items: [

                // Para decir que no hay seleccionado al inicio
                {
                    xtype: 'noselectedprofile'
                }

            ]

            // bodyStyle: 'text-align:center; display: flex; justify-content: center; align-items: center; height:100%',

            // layout: {
            //     type: 'vbox',
            //     align: 'center',
            //     pack: 'center'
            // },

            // items: [
            //     {
            //         html: '<div>No se ha seleccionado ningún perfil.</div>',

            //     }
            // ]

            // bodyStyle: {

            //     display: 'flex',
            //     alignItems: 'center',
            //     justifyContent: 'center',
            //     textAlign: 'center',
            //     height: '100%',
            //     color: 'red'

            // }
        }
    ],



    // // Barra de herramientas superior
    // tbar: [
    //     {
    //         text: 'Nuevo Perfil',
    //         iconCls: 'fa fa-plus',
    //         handler: 'onNewProfile',
    //         // Estilo del botón
    //         ui: 'default',
    //         scale: 'medium'
    //     },
    //     '-', // Separador
    //     {
    //         text: 'Recargar',
    //         iconCls: 'fa fa-refresh',
    //         handler: 'onReload',
    //         scale: 'medium'
    //     },
    //     '->',  // Empuja los siguientes items a la derecha
    //     {
    //         xtype: 'textfield',
    //         reference: 'searchField',
    //         emptyText: 'Buscar...',
    //         width: 200,
    //         enableKeyEvents: true,
    //         listeners: {
    //             keyup: 'onSearch'
    //         }
    //     }
    // ],

    // // Barra de paginación inferior
    // bbar: {
    //     xtype: 'pagingtoolbar',
    //     displayInfo: true,
    //     displayMsg: 'Mostrando perfiles {0} - {1} de {2}',
    //     emptyMsg: 'No hay perfiles para mostrar'
    // }
});