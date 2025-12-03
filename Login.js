Ext.onReady(function () {

    Ext.create('Ext.container.Viewport', {

        autoSize: true,
        // profiles: {
        //     defaults: {
        //         width: 340,
        //         height: 544,
        //         margin: '25 0 0 0',
        //         forgotMargin: '20 0 0 0',
        //         signMargin: '4 0 0 0',
        //         buttonHeight: 30
        //     },
        //     'classic-material': {
        //         width: 340,
        //         height: 544,
        //         margin: (Ext.isIE || Ext.isEdge) ? '10 0 0 0' : '25 0 0 0',
        //         forgotMargin: '20 0 0 0',
        //         signMargin: '4 0 0 0',
        //         buttonHeight: 30
        //     },
        //     graphite: {
        //         width: 340,
        //         height: 544,
        //         margin: '15 0 0 0',
        //         forgotMargin: '10 0 0 0',
        //         signMargin: '0 0 0 0',
        //         buttonHeight: 50
        //     }
        // },
        width: 340,
        height: 544,
        layout: {
            type: 'vbox',
            align: 'middle'
        },
        // scrollable: 'y',
        // otherContent: [
        //     {
        //         type: 'Controller',
        //         path: './LoginController.js'
        //     }
        // ],
        // setting the background of the container
        style: 'background-color: var(--base-color)',

        items: [
            {
                xtype: 'form',
                height: 514,
                width: 340,
                reference: 'formLogin',
                bodyPadding: 30,
                items: [
                    // {
                    //     xtype: 'image',
                    //     height: 90,
                    //     width: 280,
                    //     margin: '0 0 0 0',
                    //     alt: 'sencha-logo-image',
                    //     src: Ext.theme.name === "Aria" ? 'resources/images/SenchaLogoWht.svg' : 'resources/images/SenchaLogoLg.svg'
                    // },
                    {
                        xtype: 'component',
                        width: 280,
                        height: 27,
                        margin: '9 0 0 0',
                        html: 'Inicio de sesión',
                        style: {
                            'font-size': '24px',
                            'text-align': 'center',
                            'margin': 'auto'
                        }
                    },
                    // {
                    //     xtype: 'component',
                    //     reference: 'formLoginFailure',
                    //     tpl: '<tpl if="errors.length">' +
                    //         '<span class="x-fa fa-exclamation-circle" style="color: red;">' +
                    //         ' Login Failure</span>' +
                    //         '</tpl>',
                    //     height: 26,
                    //     width: 280,
                    //     margin: '9 0 0 0',
                    //     style: {
                    //         'font-size': '20px',
                    //         'text-align': 'center'
                    //     }
                    // },
                    {
                        xtype: 'textfield',
                        allowBlank: false,
                        required: true,
                        width: 280,
                        margin: "25 0 0 0",
                        fieldLabel: 'Email',
                        name: 'email',
                        placeholder: 'Email',
                        msgTarget: 'qtip',
                        responsiveConfig: {
                            'desktop': {
                                msgTarget: 'side'
                            }
                        }
                    },
                    {
                        xtype: 'textfield',
                        inputType: 'password',
                        allowBlank: false,
                        required: true,
                        width: 280,
                        fieldLabel: 'Contraseña',
                        name: 'pass',
                        placeholder: 'Contraseña',
                        msgTarget: 'qtip',
                        margin: "25 0 0 0",
                        responsiveConfig: {
                            'desktop': {
                                msgTarget: 'side'
                            }
                        }
                    },
                    // {
                    //     xtype: 'checkbox',
                    //     width: 280,
                    //     height: 30,
                    //     boxLabel: 'Keep me logged in',
                    //     name: 'remember',
                    //     margin: "25 0 0 0",
                    //     style: {
                    //         'font-size': '16px',
                    //         'letter-spacing': '1.25px',
                    //         'color': 'rgba(17, 17, 17, 0.54)'
                    //     }
                    // },
                    {
                        xtype: 'button',
                        text: 'Iniciar sesión',
                        autoSize: true,
                        handler: function (btn) {

                            /*
                            var me = this,
                                errorCmp = me.lookupReference('formLoginFailure'),
                                fields,
                                form = me.lookupReference('formLogin').getForm(),
                                errors = [],
                                data = {
                                    errors: errors
                                };

                            Ext.Msg.alert('AADSAD Success', 'Youadasdasdgged in!');

                            if (form.isValid()) {
                                Ext.Msg.alert('Login Success', 'You have been logged in!');
                            }
                            else {
                                Ext.Msg.alert('Login Failure', 'The username/password provided is invalid.');
                                fields = form.getFields();

                                fields.each(function (field) {
                                    var error;

                                    if (!field.validate() && (error = field.getErrors())) {
                                        errors.push({
                                            errors: error,
                                            name: field.getFieldLabel()
                                        });
                                    }
                                });
                            }

                            if (errorCmp) {
                                errorCmp.setData(data);
                            }
                                */



                            var form = btn.up('form').getForm();




                            if (form.isValid()) {

                                // Validar en server

                                // Obtener los valores del formulario
                                var values = form.getValues();

                                Ext.Ajax.request({
                                    url: 'http://localhost:8080/api/login',
                                    method: 'POST',
                                    jsonData: values,
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    success: function (response) {

                                        localStorage.setItem("loggedIn", "true");

                                        // Ext.Msg.alert('Éxito', 'Has iniciado sessión');

                                        window.location = '../app/';
                                    },
                                    failure: function (response) {
                                        Ext.Msg.alert('Error', 'Email o contraseña incorrectos');
                                    }
                                });

                                
                                // form.submit({
                                //     url: 'http://localhost:8080/api/login',
                                //     method: 'POST',
                                //     success: function () {
                                //         Ext.Msg.alert('Éxito', 'Has iniciado sessión');
                                //         window.location = '../app/index.html';
                                //     },
                                //     failure: function () {
                                //         Ext.Msg.alert('Error', 'Email o contraseña incorrectos');
                                //     }
                                // });

                            } else {

                                Ext.Msg.alert('Error', 'Email o contraseña incorrectos');

                            }


                        },
                        height: 30,
                        width: 280,
                        margin: '30 0 0 0',
                        style: {
                            'text-align': 'center',
                            'letter-spacing': '1.25px',
                            'font-size': '14px'
                        }
                    },
                    // {
                    //     xtype: 'component',
                    //     html: "<a style='color: var(--base-color);text-decoration: none;' href='#template-reset-password'>Forgot your Password?</a>",
                    //     style: {
                    //         'font-size': '16px',
                    //         'text-align': 'center'
                    //     },
                    //     width: 280,
                    //     margin: "20 0 0 0"
                    // }
                ]
            }//,
            // {
            //     xtype: 'component',
            //     margin: "4 0 0 0",
            //     width: 280,
            //     style: {
            //         'font-size': '16px',
            //         'text-align': 'center',
            //         'color': 'var(--base-foreground-color)',
            //         'letter-spacing': '1.25px'
            //     },
            //     html: 'Don\'t have an account?' +
            //         "<a style='font-weight:bold;color:var(--base-foreground-color);text-decoration: none;' href='#template-create-account'> Sign-Up</a>"
            // }
        ]

    });

});