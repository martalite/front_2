
Ext.define('profiles.ProfilesController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.profilescontroller',

    onSelectProfile: function (grid, record) {

        if (!record) return; // Hace falta?

        console.log("On select profile: ", record);

        // Pillar la columna
        var rightColumn = Ext.getCmp('rightColumn');

        // Eliminar todo lo que haya en la columna y añadir nuevo detail
        rightColumn.removeAll(true);

        var detail = Ext.create('profiles.DetailProfile', { record: record });

        // Cargar datos
        if (detail.record) {
            detail.getForm().loadRecord(detail.record);
        }

        rightColumn.add(detail);
    }


    //     /**
    //      * CREAR - Abrir formulario para nuevo perfil
    //      */
    //     onNewProfile: function () {
    //         console.log('➕ Abriendo formulario para nuevo perfil');

    //         var form = Ext.create('Tutorial.view.ProfileForm', {
    //             isEdit: false
    //         });

    //         // Escuchar el evento de guardado
    //         form.on('usersaved', this.onReload, this);

    //         form.show();
    //     },

    //     /**
    //      * ACTUALIZAR - Abrir formulario para editar perfil
    //      */
    //     onEditProfile: function (grid, record) {
    //         console.log('📝 Editando perfil:', record.data);

    //         var form = Ext.create('Tutorial.view.ProfileForm', {
    //             isEdit: true,
    //             record: record
    //         });

    //         // Escuchar el evento de guardado
    //         form.on('usersaved', this.onReload, this);

    //         form.show();
    //     },

    //     /**
    //      * ELIMINAR - Método DELETE
    //      * Elimina un perfil del servidor
    //      */
    //     onDeleteProfile: function (grid, rowIndex, colIndex, item, e, record) {
    //         var me = this;

    //         console.log('🗑️ Solicitando eliminar perfil:', record.data);

    //         // Confirmar eliminación
    //         Ext.Msg.confirm(
    //             'Confirmar eliminación',
    //             '¿Está seguro que desea eliminar a <b>' + record.get('nombre') + '</b>?',
    //             function (button) {
    //                 if (button === 'yes') {
    //                     me.deleteProfile(record);
    //                 }
    //             }
    //         );
    //     },

    //     /**
    //      * Ejecuta la petición DELETE
    //      */
    //     deleteProfile: function (record) {
    //         var me = this,
    //             grid = me.getView(),
    //             id = record.get('id');

    //         console.log('📤 DELETE - Eliminando perfil ID:', id);

    //         // Mostrar loading
    //         grid.setLoading('Eliminando...');

    //         // Hacer la petición DELETE
    //         Ext.Ajax.request({
    //             url: 'http://localhost:8080/api/profiles/' + id,
    //             method: 'DELETE',
    //             success: function (response) {
    //                 console.log('✅ Perfil eliminado exitosamente');

    //                 grid.setLoading(false);
    //                 Ext.Msg.alert('Éxito', 'Perfil eliminado correctamente');

    //                 // Recargar el grid
    //                 me.onReload();
    //             },
    //             failure: function (response) {
    //                 console.error('❌ Error al eliminar perfil:', response);
    //                 grid.setLoading(false);
    //                 Ext.Msg.alert('Error', 'No se pudo eliminar el perfil: ' + response.statusText);
    //             }
    //         });
    //     },

    //     /**
    //      * LEER - Método GET
    //      * Recarga los datos del servidor
    //      */
    //     onReload: function () {
    //         var grid = this.getView(),
    //             store = grid.getStore();

    //         console.log('📥 GET - Recargando datos desde el servidor');

    //         // Limpiar filtros de búsqueda
    //         store.clearFilter();

    //         // Recargar el store (hace una petición GET)
    //         store.load({
    //             callback: function (records, operation, success) {
    //                 if (success) {
    //                     console.log('✅ Datos recargados correctamente:', records.length, 'registros');
    //                 } else {
    //                     console.error('❌ Error al recargar datos');
    //                 }
    //             }
    //         });
    //     },

    //     /**
    //      * BUSCAR - Filtrado local
    //      * Filtra los datos que ya están en el grid
    //      */
    //     onSearch: function (field) {
    //         var grid = this.getView(),
    //             store = grid.getStore(),
    //             searchValue = field.getValue();

    //         console.log('🔍 Buscando:', searchValue);

    //         // Limpiar filtros anteriores
    //         store.clearFilter();

    //         if (searchValue) {
    //             // Filtrar por nombre o emailDeContacto
    //             store.filter([
    //                 {
    //                     filterFn: function (record) {
    //                         var nombre = record.get('nombre').toLowerCase(),
    //                             emailDeContacto = record.get('emailDeContacto').toLowerCase(),
    //                             search = searchValue.toLowerCase();

    //                         return nombre.indexOf(search) > -1 || emailDeContacto.indexOf(search) > -1;
    //                     }
    //                 }
    //             ]);
    //         }
    //     }
    // }
});