/**
 * STORE DE Perfiles
 * 
 * Un Store es una colección de registros (models) que conecta con un servidor.
 * Aquí es donde configuramos las llamadas REST API.
 * 
 * Aprenderás:
 * - Cómo configurar un proxy REST
 * - Las URLs para cada operación CRUD
 * - Cómo funciona la carga automática de datos
 */

Ext.define('Tutorial.store.Profiles', {
    extend: 'Ext.data.Store',

    // Alias para referenciar este store fácilmente
    alias: 'store.profiles',

    // Asociamos el modelo User
    model: 'Tutorial.model.Profile',

    // Número de registros por página (para paginación)
    pageSize: 25,

    // Configuración del proxy REST
    proxy: {
        // Tipo REST: hace llamadas HTTP automáticamente
        type: 'rest',

        // URL base de la API
        url: 'http://localhost:8080/api/profiles',

        /**
         * CONFIGURACIÓN DE URLs PARA CADA OPERACIÓN CRUD:
         * 
         * CREATE (POST):   http://localhost:8080/api/profiles
         * READ (GET):      http://localhost:8080/api/profiles/search
         * UPDATE (PUT):    http://localhost:8080/api/profiles/{id}
         * DELETE (DELETE): http://localhost:8080/api/profiles/{id}
         */
        api: {
            // GET - Leer todos los perfiles
            read: 'http://localhost:8080/api/profiles/search',

            // POST - Crear nuevo perfil
            create: 'http://localhost:8080/api/profiles',

            // PUT - Actualizar perfil existente
            update: 'http://localhost:8080/api/profiles',

            // DELETE - Eliminar perfil
            destroy: 'http://localhost:8080/api/profiles'
        },

        // Configuración del lector (reader) - cómo interpretar la respuesta
        reader: {
            type: 'json',
            // La respuesta es un array directamente
            rootProperty: '',
            // Donde está el total de registros (para paginación)
            totalProperty: 'total'
        },

        // Configuración del escritor (writer) - cómo enviar los datos
        writer: {
            type: 'json',
            // Enviar todos los campos, no solo los modificados
            writeAllFields: true,
            // Formato de fecha
            dateFormat: 'Y-m-d'
        },

        // Headers HTTP para todas las peticiones
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },

        // Listeners para monitorear las operaciones
        listeners: {
            // Se ejecuta cuando hay un error en la petición
            exception: function (proxy, response, operation) {
                console.error('❌ Error en la petición REST:', response);
                Ext.Msg.alert('Error', 'Error en la comunicación con el servidor: ' + response.statusText);
            }
        }
    },

    // Cargar datos automáticamente al crear el store
    autoLoad: true,

    // Sincronización automática con el servidor
    autoSync: false, // Lo dejamos en false para controlarlo manualmente

    // Listeners del store
    listeners: {
        // Se ejecuta después de cargar los datos
        load: function (store, records, successful) {
            if (successful) {
                console.log('✅ Datos cargados correctamente:', records.length, 'perfiles');
            } else {
                console.error('❌ Error al cargar los datos');
            }
        },

        // Se ejecuta después de actualizar un registro
        update: function (store, record, operation) {
            console.log('📝 Registro actualizado:', record.data);
        },

        // Se ejecuta después de añadir un registro
        add: function (store, records) {
            console.log('➕ Nuevo registro añadido:', records[0].data);
        },

        // Se ejecuta después de eliminar un registro
        remove: function (store, records) {
            console.log('🗑️ Registro eliminado:', records[0].data);
        }
    }
});
