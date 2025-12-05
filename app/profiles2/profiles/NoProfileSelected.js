Ext.define('profiles.NoSelectedProfile', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.noselectedprofile',

    // html: '<div style=text-align:center; display: flex; justify-content: center; align-items: center; height:100%>No se ha seleccionado ningún perfil.</div>',
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    items: [
        {
            ui: 'default',
            scale: 'large',
            html: '<i class="fa fa-user fa-5x"></i> ',
        },
        {
            
            html: 'No se ha seleccionado ningún perfil',
            style: {
                'margin-top': '10px'
            }
        }
    ]
});