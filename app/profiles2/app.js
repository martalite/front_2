/**
 * APLICACIÓN PRINCIPAL
 * 
 * Este archivo inicializa la aplicación ExtJS.
 * 
 * Aprenderás:
 * - Cómo inicializar una aplicación ExtJS
 * - Cómo crear el viewport principal
 * - La estructura básica de una app ExtJS
 */

if (!localStorage.getItem("loggedIn")) {

    window.location = '../../../';
}

// Habilitar el modo de desarrollo para ver mensajes detallados en consola
Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false
});

// Esperar a que el DOM esté listo
Ext.onReady(function () {

    console.log('%c📚 TUTORIAL EXTJS - CRUD CON REST API', 'font-size: 16px; color: #667eea; font-weight: bold;');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #667eea;');
    console.log('%cEsta aplicación demuestra cómo hacer un CRUD completo con llamadas REST:', 'color: #555;');
    console.log('%c• CREATE (POST)   - Crear nuevo usuario', 'color: #28a745;');
    console.log('%c• READ (GET)      - Leer/listar usuarios', 'color: #17a2b8;');
    console.log('%c• UPDATE (PUT)    - Actualizar usuario existente', 'color: #ffc107;');
    console.log('%c• DELETE (DELETE) - Eliminar usuario', 'color: #dc3545;');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #667eea;');
    console.log('%cAbre la Consola de Desarrollo para ver las peticiones HTTP', 'color: #888; font-style: italic;');
    console.log(' ');

    /**
     * Crear el viewport principal de la aplicación
     * El viewport es el contenedor principal que ocupa toda la pantalla
     */
    Ext.create('Ext.container.Viewport', {

        layout: 'fit',

        // Renderizar en nuestro contenedor personalizado
        renderTo: 'app-container',

        // Un panel con navegación i un footer (que contendrá dos panels más en un layout de izquierda a derecha definido en Profiles.js)
        items: [

            {
                // Toolbar para navegación
                tbar: {
                    items: [

                        'Perfiles',
                        '-', // Separador
                        {
                            text: "Volver",
                            handler: function () {

                                window.location = '../';
                            }
                        },
                        '->',  // Empuja los siguientes items a la derecha
                        {
                            text: "Cerrar sesión",
                            handler: function () {

                                localStorage.removeItem("loggedIn");
                                window.location = '../../';
                            }
                        }
                    ]
                },

                // Los items del panel i config
                // title: 'Gestión de Perfiles',
                id: 'panelColumns',
                xtype: 'panel',
                layout: 'fit',
                border: false,
                items: [
                    {
                        xtype: 'profile',
                    },
                    // {

                    //     // xtype: 'profile',
                    //     // flex: 1
                    //     // Ext.create('Ext.panel.Panel', {
                    //     xtype: 'panel',
                    //     title: 'Dummy Panel',
                    //     width: 400,
                    //     height: 250,
                    //     bodyPadding: 10,
                    //     html: '<div style="text-align:center; color:#888;">Empty Space</div>',
                    //     //     renderTo: Ext.getBody()
                    //     // });
                    // }
                ],

                bbar: {
                    xtype: 'toolbar',
                    ui: 'footer',
                },
            }
        ],

        // Listener cuando se renderiza el viewport
        listeners: {
            afterrender: function () {
                console.log('✅ Aplicación inicializada correctamente');
                console.log('📍 URL de la API configurada: http://localhost:8080/api/users');

                // Mostrar mensaje de bienvenida
                Ext.defer(function () {
                    Ext.create('Ext.window.Toast', {
                        title: '👋 ¡Bienvenido!',
                        html: 'Aplicación lista. Abre la Consola de Desarrollo (F12) para ver los detalles de cada operación REST.',
                        autoClose: true,
                        autoCloseDelay: 5000,
                        align: 'br',
                        slideInDuration: 400
                    });
                }, 500);
            }
        }
    });
});
