const satData = [
    {
        id: "aeg",
        name: "AEG ELECTROD.",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/AEG/aeg.png",
        contacts: [
            {
                name: "Israel Tejada Martínez",
                phone: "616 723 866",
                email: "israel.tejada-martinez@electrolux.com"
            },
            {
                name: "SAT",
                phone: "902 116 388 - 912 665 682"
            },
            {
                name: "CAMBIO SENTIDO DE LA PUERTA",
                phone: "912186619"
            },
            {
                name: "Atención al Cliente",
                phone: "91.117.80.67"
            }
        ],
        // downloads: [
        //     {
        //         name: "plantilla_Electrolux.xls",
        //         url: "/src/assets/downloads/plantilla_Electrolux.xls"
        //     }
        // ],
        // description: "<p>Se tramita directamente con el proveedor.</p><p>Enviar plantilla debidamente cumplimentada.</p><p>&nbsp;</p><p>#AEG</p><p>&nbsp;</p>"
    },
    // {
    //     id: "acer",
    //     name: "ACER",
    //     description: "<p>CONSULTAR CON SU GESTORA</p><p>pedir autorización a proveedor<br></p><p></p>"
    // },
    {
        id: "aiwa",
        name: "AIWA",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/AIWA/aiwa.png",
        contacts: [
            {
                name: "SAT / DOA",
                phone: "93 654 61 20",
                email: "posventa@eu-aiwa.com"
            },
            {
                name: "SAT / RMA",
                phone: "93 595 29 89",
                email: "rma@eu-aiwa.com"
            }
        ],
        // downloads: [
        //     {
        //         name: "Condiciones_de_garantía_y_de_RMA_AIWA.pdf",
        //         url: "/src/assets/downloads/Condiciones_de_garantía_y_de_RMA_AIWA.pdf"
        //     },
        //     {
        //         name: "RMA_EDITABLE-2021-08-25.pdf",
        //         url: "/src/assets/downloads/RMA_EDITABLE-2021-08-25.pdf"
        //     }
        // ],
        // description: "<p>&nbsp;</p><p>&nbsp;</p><p>Se tramita directamente con el proveedor.</p><p>&nbsp;</p><p><strong>PARA REPORTAR INCIDENCIAS TÉCNICAS Y DE SAT</strong> lo tienen que gestionar a través del link ; <a href=\"https://groupgia.com/es/soporte-tecnico/\">https://groupgia.com/es/soporte-tecnico/</a></p><p>&nbsp;</p><p>** una vez aceptada la devolución por parte del SAT de proveedor, se cerrará la devolución con abono. Nunca con reposición.</p><p>&nbsp;</p><p>La duración de la garantía será de 36 meses después de la compra.</p><p>Todos los accesorios (cables, adaptadores de corriente, fundas, etc.) dispondrán de un periodo de garantía de 6 meses.</p><p>&nbsp;</p><p>Para que la garantía sea válida se tendrá que adjuntar ticket o factura de compra en donde figure la fecha de venta y los datos de usuario y producto.</p><p>Si la solicitud es <strong>DOA</strong>, deben enviar el artículo en perfecto estado, con todos sus accesorios y documentación.</p><p>&nbsp;</p>"
    },
    {
        id: "akai",
        name: "AKAI",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/AKAI/akai.png",
        // description: "<p>Graben devolución por portal. </p><p>IMPRESCINDIBLE embalajes y accesorios originales</p><p>&nbsp;</p><p class=\"MsoNormal\"><span style=\"font-size: 11.0pt; mso-ascii-font-family: Aptos; mso-ascii-theme-font: minor-latin; mso-hansi-font-family: Aptos; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: 'Times New Roman'; mso-bidi-theme-font: minor-bidi; mso-fareast-language: EN-US;\">** Otras marcas: #MINION #</span><span style=\"font-size: 14.6667px;\">DIPROGRESS</span></p>"
    },
    {
        id: "alcatel",
        name: "ALCATEL",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/ALCATEL/alcatel.png",
        contacts: [
            {
                name: "SAT / SERVICIO 10",
                phone: "913 587 490",
                email: "gestion.multimarca@servicio10.es"
            },
            {
                name: "GEMMA LOZANO",
                phone: "658103000",
                email: "Gemma.lozano@linku.es"
            }
        ],
        websites: [
            "https://tcl.servicio10.es"
        ],
        // description: "<p>Se tramita directamente con el SAT / SERVICIO 10,&nbsp;<span style=\"font-size: 10.5pt; font-family: 'Helvetica',sans-serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; color: #333333; mso-ansi-language: ES; mso-fareast-language: ES; mso-bidi-language: AR-SA;\"><a href=\"mailto:gestion.multimarca@servicio10.es\" target=\"_blank\" rel=\"noopener\"><span style=\"color: #337ab7;\">gestion.multimarca@servicio10.es</span></a></span></p><p>Tramitar a través de WEB <a href=\"https://tcl.servicio10.es\" target=\"_blank\" rel=\"noopener\">https://tcl.servicio10.es</a>, deben registrarse como tienda y registrar el terminal indicando los problemas que tiene.</p><p>Ellos le recogen el terminal y se lo devuelven en tienda.&nbsp;</p><p>DOA (dentro de los primeros 15 días desde que le has facturado el terminal al cliente) o RMA (el resto de la garantía)&nbsp;</p>"
    },
    // {
    //     id: "alza",
    //     name: "ALZA",
    //     contacts: [
    //         {
    //             name: "Jaime Monclús",
    //             email: "jaimemonclus@gmail.com"
    //         }
    //     ],
    //     description: "<p>Se ha de pedir autorización previa&nbsp;<strong><u>siempre</u></strong> a <a href=\"mailto:jaimemonclus@gmail.com\"><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">jaimemonclus@gmail.com</span></span></a> adjuntando tiquet inferior a 15 dias.</p><p>&nbsp;</p><p>Después graben devolución por portal,&nbsp;<u>adjunten la autorización</u>, y se la validaremos.</p><p>&nbsp;</p><p>IMPRESCINDIBLE embalajes y accesorios originales y tiquet de venta.</p><p>&nbsp;</p><p>PEGUEN LA AUTORIZACIÓN FUERA DEL PRODUCTO DEFECTUOSO, GRACIAS.</p>"
    // },
    {
        id: "amazfit",
        name: "AMAZFIT",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/AMAZFIT/amazfit.png",
        contacts: [
            {
                name: "Sr. Alberto Garcia",
                email: "alberto.garcia@gadgetiberia.com"
            }
        ],
        // description: "Pedir autorización a proveedor"
    },
    {
        id: "asus",
        name: "ASUS",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/ASUS/asus.png",
        websites: [
            "https://www.asus.com/es/support"
        ],
        // description: "<p>para PC y portátiles, tramitar directamente con ASUS: <a href=\"https://www.asus.com/es/support/\">https://www.asus.com/es/support/</a></p><p><br></p><p>Para el resto de componentes (teclados, ratones, relojes…) pedir autorización según proveedor. CONSULTAR CON SU GESTORA</p>"
    },
    // {
    //     id: "aura",
    //     name: "AURA",
    //     contacts: [
    //         {
    //             name: "ÓSCAR GONZÁLEZ",
    //             email: "oscargv@closdreams.com"
    //         }
    //     ],
    //     description: "<p>Graben devolución por portal, han de indicar el motivo de la devolución y el número de serie, gracias.</p><p>&nbsp;</p><p>IMPRESCINDIBLE embalajes y accesorios originales</p><p>&nbsp;</p>"
    // },
    {
        id: "bmov",
        name: "B-MOV",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/B-MOV/b-mov.jpeg",
        contacts: [
            {
                name: "Sr. Manuel Zarco",
                phone: "696077691",
                email: "mzarcoperez@gmail.com"
            },
            {
                name: "SAT / PATINETES",
                phone: "744707772",
                email: "doctorscooterbmov@gmail.com"
            }
        ],
        // downloads: [
        //     {
        //         name: "DATOS.pdf",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740262079_DATOS.pdf"
        //     }
        // ],
        // description: "<p>Se tramita directamente con el proveedor.</p><p>&nbsp;</p><p>&nbsp;</p>"
    },
    {
        id: "balay",
        name: "BALAY",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/BALAY/balay.png",
        contacts: [
            {
                name: "COMERCIAL: Sr. Juan Jimenez",
                phone: "629 820 172",
                email: "juan.jimenez@bshg.com"
            },
            {
                name: "DISPONIBILIDAD STOCKS",
                phone: "976305700"
            },
            {
                name: "Avisos de reparación CLIENTE FINAL",
                phone: "976305710",
                email: "Cau-balay@bshg.com"
            },
            {
                name: "Avisos de reparación TIENDA:",
                email: "Benjamin.hormigo@bshg.com"
            }
        ],
        // description: "<p>Se tramita directamente con el proveedor.</p><p>&nbsp;</p><p>** para avisos de producto DEFECTUOSO o FALTANTE DE UNA PIEZA en TIENDA, envíen correo a&nbsp;<strong><u><a href=\"http://Benjamin.hormigo@bshg.com/\">su</a> delegado de zona</u></strong>&nbsp;con los siguientes datos: DATOS TIENDA / DIRECCIÓN + TELÉFONO + REFERENCIA + motivo del aviso, gracias.</p><p>&nbsp;</p><p>** para producto NUEVO con daño oculto en TIENDA, envíen correo a&nbsp;su delegado de zona con copia a <strong>su comercial (JV)</strong>&nbsp;para solicitar devolución o depreciación, gracias</p><p>&nbsp;</p><table width=\"651\"><tbody><tr><td width=\"96\"><p><strong>Zona</strong></p></td><td width=\"273\"><p>AREA</p></td><td width=\"94\"><p><strong>JV</strong></p></td><td width=\"188\"><p><strong>EMAIL:</strong></p></td></tr><tr><td width=\"96\"><p>ZONA NORTE</p></td><td width=\"273\"><p>ZARAGOZA-HUESCA-NAVARRA</p></td><td width=\"94\"><p>MENENDEZ-A</p></td><td width=\"188\"><p><u><a href=\"mailto:Antonio.Menendez@bshg.com\">Antonio.Menendez@bshg.com</a></u></p></td></tr><tr><td width=\"96\"><p>ZONA LEVANTE</p></td><td width=\"273\"><p>TERUEL</p></td><td width=\"94\"><p>ADAN</p></td><td width=\"188\"><p><u><a href=\"mailto:Elviro.adan@bshg.com\">Elviro.adan@bshg.com</a></u></p></td></tr><tr><td width=\"96\"><p>ZONA NORESTE</p></td><td width=\"273\"><p>BALEARES + CATALUÑA</p></td><td width=\"94\"><p>JUAN JIMENEZ</p></td><td width=\"188\"><p><u><a href=\"mailto:Juan.Jimenez@bshg.com\">Juan.Jimenez@bshg.com</a></u></p></td></tr><tr><td width=\"96\"><p>ZONA CENTRO</p></td><td width=\"273\"><p>GUADALAJARA</p></td><td width=\"94\"><p>DELAOSA</p></td><td width=\"188\"><p><a href=\"mailto:Jose-Luis.De-La-Osa@BSHG.COM\">Jose-Luis.De-La-Osa@BSHG.COM</a></p></td></tr></tbody></table><p>&nbsp;</p><p>&nbsp;</p>"
    },
    {
        id: "beko",
        name: "BEKO",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/BEKO/beko.png",
        contacts: [
            {
                name: "Sr. Albert Mateu",
                phone: "687 78 25 03",
                email: "albert.mateu@beko.com"
            },
            {
                name: "PARA CAMBIOS ,DUPLICADOS, CAMBIO CADENA DE COMPRAS Y CANCELACIONES REFERENTE A ABONOS",
                email: "rma@callcenterbarcelona.es"
            },
            {
                name: "SAT / CATALUÑA",
                phone: "932958650",
                email: "beko@callcenterbarcelona.es"
            },
            {
                name: "SAT / RESTO DE ESPAÑA",
                phone: "932958650",
                email: "beko@callcenterbarcelona.es"
            },
            {
                name: "SAT / LLEIDA",
                phone: "932958650",
                email: "beko@callcenterbarcelona.es"
            },
            {
                name: "SAT/CALL CENTER",
                phone: "932958650",
                email: "beko@callcenterbarcelona.es"
            },
            {
                name: "SAT/ envío certificado punto limpio",
                email: "rma@callcenterbarcelona.es"
            }
        ],
        websites: [
            "https://www.beko.com/es-es/soporte/contacto"
        ],
        // downloads: [
        //     {
        //         name: "RELACION_CP_-_SATs_CONTACT.xlsx",
        //         url: "/src/assets/downloads/RELACION_CP_-_SATs_CONTACT.xlsx"
        //     },
        //     {
        //         name: "AUTORIZACION_DEVOLUCION_PRODUCTO_BEKO.doc",
        //         url: "/src/assets/downloads/AUTORIZACION_DEVOLUCION_PRODUCTO_BEKO.doc"
        //     }
        // ],
        // description: "<p>Se gestiona directamente con proveedor.</p><p>Rellenar la plantilla y mandarla al e-mail del <a href=\"mailto:emine.sari@beko.com\" target=\"_blank\" rel=\"noopener\">SAT</a>.</p><p><span style=\"color: #464e5f; font-family: Poppins;\">Autorizan y una vez autorizado, se procede a su destrucción por los medios de reciclaje establecidos legalmente por zona.</span></p><p><br><strong>PARA AVERÍAS O REPARACIONES:</strong> pueden encontrar su SAT Oficial más cercano repartidos por la geografía nacional. Ver documento <u>RELACION CP - SATs CONTACT</u></p>"
    },
    {
        id: "beko-pae",
        name: "BEKO PAE",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/BEKO/beko.png",
        contacts: [
            {
                name: "Albert Mateu",
                phone: "687 78 25 03",
                email: "albert.mateu@beko.com"
            },
            {
                name: "SAT / CATALUNYA",
                phone: "932958650",
                email: "beko@callcenterbarcelona.es"
            },
            {
                name: "SAT / RESTO DE ESPAÑA",
                phone: "932958650"
            },
            {
                name: "Autorización",
                email: "rma@callcenterbarcelona.es"
            }
        ],
        websites: [
            "https://www.beko.com/es-es/soporte/contacto"
        ],
        // downloads: [
        //     {
        //         name: "AUTORIZACION_DEVOLUCION_PRODUCTO_BEKO.doc",
        //         url: "/src/assets/downloads/AUTORIZACION_DEVOLUCION_PRODUCTO_BEKO.doc"
        //     }
        // ],
        // description: "<p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Se tramita directamente con el proveedor.</span></span></p><p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Enviar mail a autorización </span></span><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">adjuntando fotografía de la matrícula, dónde aparece el núm. de serie, modelo y factura o ticket de compra cliente final.</span></span></p><p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Autorizan y una vez autorizada, se procede a su destrucción por los medios de reciclaje establecidos legalmente por zona.</span></span></p>"
    },
    {
        id: "bellissima",
        name: "BELLISSIMA",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/BELLISSIMA/bellissima.png",
        contacts: [
            {
                name: "Lourdes Noguera",
                phone: "682 13 05 83",
                email: "lourdes.noguera@tenacta.es"
            },
            {
                name: "SAT LEGON",
                phone: "93 272 59 78"
            }
        ],
        // downloads: [
        //     {
        //         name: "TENACTA_SPV.pptx",
        //         url: "/src/assets/downloads/TENACTA_SPV.pptx"
        //     },
        //     {
        //         name: "RMA_SAT.xls",
        //         url: "/src/assets/downloads/RMA_SAT.xls"
        //     },
        //     {
        //         name: "RMA_DESTRUCCION.xls",
        //         url: "/src/assets/downloads/RMA_DESTRUCION.xls"
        //     }
        // ],
        // description: "<p><strong>Para productos defectuosos:</strong></p><p>Soliciten DEVOLUCIÓN a <a href=\"mailto:lourdes.noguera@tenacta.es\">lourdes.noguera@tenacta.es</a>, envíen un @ acompañado de la factura o tiquet de venta&nbsp;para solicitar la autorización y siga sus instrucciones, gracias.</p><p><strong>&nbsp;</strong></p><p><strong>** Requeridos embalajes y accesorios originales.</strong></p><p>** lean atentamente documento adjunto \"TENACTA SPV.pptx\"</p>"
    },
    {
        id: "beurer",
        name: "BEURER",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/BEURER/beurer.png",
        contacts: [
            {
                name: "joaquin@machogarcia.es",
                phone: "649483332",
                email: "joaquin@machogarcia.es"
            },
            {
                name: "SAT CENTRAL",
                phone: "932478570",
                email: "informacion@presat.net"
            },
            {
                name: "Juan Carlos Macho Garcia ( Delegado Cataluña, Baleares y Aragón)",
                phone: "649304603",
                email: "jcmacho@telefonica.net"
            },
            {
                name: "Miguel Angel Macho Garcia ( Delegado Cataluña, Baleares y Aragón)",
                phone: "630388947",
                email: "miguel.macho@telefonica.net"
            },
            {
                name: "Merche Cavia",
                phone: "932013777"
            },
            {
                name: "Atención al cliente SAT",
                phone: "93 2624268",
                email: "sat@riverint.com"
            }
        ],
        websites: [
            "www.riverint.com",
            "https://riverint.com/wp-content/uploads/PDFSAT/SATS%20BEURER.pdf"
        ],
        // downloads: [
        //     {
        //         name: "SATS_BEURER.pdf",
        //         url: "/src/assets/downloads/SATS_BEURER.pdf"
        //     }
        // ],
        // description: "<p>&nbsp;</p><p><strong><u>POSVENTA.</u></strong>Se gestiona directamente con proveedor desde su página web <a href=\"http://www.riverint.com\">www.riverint.com</a>&nbsp; donde en&nbsp; <a href=\"https://riverint.com/wp-content/uploads/PDFSAT/SATS%20BEURER.pdf\">https://riverint.com/wp-content/uploads/PDFSAT/SATS%20BEURER.pdf</a>&nbsp; podrán consultar todos los servicios técnicos a nivel Nacional. Para cualquier duda pueden contar con el SAT central&nbsp; al tel: 932478570 o por correo a <a href=\"mailto:informacion@presat.net\">informacion@presat.net</a> o llamar al teléfono de atención al cliente al SAT 93 2624268 o <a href=\"mailto:sat@riverint.com\">sat@riverint.com</a></p><p>&nbsp;</p><p><strong><u>PREVENTA. Contactar con su delegado asignado</u></strong>:</p><p>Cataluña, Baleares y Aragón: <a href=\"mailto:jcmacho@telefonica.net\">jcmacho@telefonica.net</a> o <a href=\"mailto:miguel.macho@telefonica.net\">miguel.macho@telefonica.net</a></p><p>Resto zonas:&nbsp; Merche Cavia 932013777</p><p>&nbsp;</p>"
    },
    {
        id: "bosch",
        name: "BOSCH",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/BOSCH/bosch.png",
        contacts: [
            {
                name: "COMERCIAL: Juan Jimenez",
                phone: "629 820 172",
                email: "juan.jimenez@bshg.com"
            },
            {
                name: "DISPONIBILIDAD STOCKS",
                phone: "976305700"
            },
            {
                name: "Avisos de reparación CLIENTE FINAL",
                phone: "976305710",
                email: "Cau-bosch@bshg.com"
            },
            {
                name: "Avisos de reparación TIENDA:",
                email: "Benjamin.hormigo@bshg.com"
            }
        ],
        // description: "<p>Se tramita directamente con el proveedor.</p><p>&nbsp;</p><p>** para avisos de producto DEFECTUOSO o FALTANTE DE UNA PIEZA en TIENDA, envíen correo a&nbsp;<strong><u><a href=\"http://Benjamin.hormigo@bshg.com/\">su</a> delegado de zona</u></strong>&nbsp;con los siguientes datos: DATOS TIENDA / DIRECCIÓN + TELÉFONO + REFERENCIA + motivo del aviso, gracias.</p><p>&nbsp;</p><p>** para producto NUEVO con daño oculto en TIENDA, envíen correo a&nbsp;su delegado de zona con copia a <strong>su comercial (JV)</strong>&nbsp;para solicitar devolución o depreciación, gracias</p><p>&nbsp;</p><table width=\"651\"><tbody><tr><td width=\"96\"><p><strong>Zona</strong></p></td><td width=\"273\"><p>AREA</p></td><td width=\"94\"><p><strong>JV</strong></p></td><td width=\"188\"><p><strong>EMAIL:</strong></p></td></tr><tr><td width=\"96\"><p>ZONA NORTE</p></td><td width=\"273\"><p>ZARAGOZA-HUESCA-NAVARRA</p></td><td width=\"94\"><p>MENENDEZ-A</p></td><td width=\"188\"><p><u><a href=\"mailto:Antonio.Menendez@bshg.com\">Antonio.Menendez@bshg.com</a></u></p></td></tr><tr><td width=\"96\"><p>ZONA LEVANTE</p></td><td width=\"273\"><p>TERUEL</p></td><td width=\"94\"><p>ADAN</p></td><td width=\"188\"><p><a href=\"mailto:Jose-Luis.De-La-Osa@BSHG.COM\">Jose-Luis.De-La-Osa@BSHG.COM</a></p></td></tr><tr><td width=\"96\"><p>ZONA NORESTE</p></td><td width=\"273\"><p>BALEARES + CATALUÑA</p></td><td width=\"94\"><p>JUAN JIMENEZ</p></td><td width=\"188\"><p><u><a href=\"mailto:Juan.Jimenez@bshg.com\">Juan.Jimenez@bshg.com</a></u></p></td></tr><tr><td width=\"96\"><p>ZONA CENTRO</p></td><td width=\"273\"><p>GUADALAJARA</p></td><td width=\"94\"><p>DELAOSA</p></td><td width=\"188\"><p><a href=\"mailto:Jose-Luis.De-La-Osa@BSHG.COM\">Jose-Luis.De-La-Osa@BSHG.COM</a></p></td></tr></tbody></table><p>&nbsp;</p><p>**protocolo de devoluciones para todas las gamas: BLANCA Y PAE</p>"
    },
    // {
    //     id: "bra",
    //     name: "BRA",
    //     logo: "https://bucket-pim.eu-central-1.linodeobjects.com/BRA/bra.png",
    //     description: "<p>Graben devolución por portal. Les recogerá RAPITECNIC con nuestra RMA.</p><p>IMPRESCINDIBLE embalajes y accesorios originales</p>"
    // },
    {
        id: "brandt",
        name: "BRANDT",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/BRANDT/brandt.png",
        contacts: [
            {
                name: "Sr. Sergi Mayor",
                phone: "616.489.436",
                email: "sergi.mayor@groupebrandt.com"
            },
            {
                name: "SAT",
                phone: "91.737.13.98.",
                email: "asistenciatecnica@groupebrandt.com"
            }
        ],
        // downloads: [
        //     {
        //         name: "Brandt_Garantía_2017_compressed.pdf",
        //         url: "Brandt_Garantía_2017_compressed.pdf"
        //     },
        //     {
        //         name: "Listados_SATs_BRANDT_por_zonas_2017.xlsx",
        //         url: "/src/assets/downloads/Listados_SATs_BRANDT_por_zonas_2017.xlsx"
        //     }
        // ],
        // description: "<p>Se tramita directamente con el SAT.</p><p>Enviar mail, indicando modelo, número de serie y motivo devolución</p>"
    },
    {
        id: "braun",
        name: "BRAUN",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/BRAUN/braun.png",
        contacts: [
            {
                name: "Pablo Segovia",
                phone: "677881805",
                email: "Pablo.segovia@external.delnghigroup.com"
            },
            {
                name: "Pablo Segovia (HEALTH)",
                phone: "677881805",
                email: "pablonic22@live.com"
            },
            {
                name: "Joan Roger (HOGAR)",
                email: "joan.roger@delonghigroup.com"
            },
            {
                name: "SAT Health",
                phone: "913.754.176"
            },
            {
                name: "SAT BRAUN",
                phone: "936 065 405"
            }
        ],
        websites: [
            "https://www.delonghi.com"
        ],
        // description: "<p>BRAUN PAE - COCINA:</p><p>Graben devolución por portal, <u>adjunten tiquet de venta a cliente final inferior a 15 dias</u>, y se la validaremos. Les recogerá RAPITECNIC con nuestra RMA.</p><p><strong>IMPRESCINDIBLE </strong>embalajes y accesorios originales y tiquet de venta.</p><div><u>Pasados los 15/30&nbsp;</u><u>días&nbsp;</u><u>(según GAMA) o&nbsp; no tener los embalajes y accesorios originales</u>, ponerse en contacto con el SAT:&nbsp;</div><div>&nbsp;</div><table class=\"table table-bordered\" style=\"width: 816.234px;\"><tbody><tr><td>SAT</td><td>936 065 405</td></tr><tr><td>RED SERVICIOS TÉCNICOS</td><td><a style=\"color: #2739c1; text-decoration-line: underline; background-color: #ffffff;\" href=\"https://www.delonghi.com/es-es/authorised-service-centre\">https://www.delonghi.com/es-es/authorised-service-centre</a></td></tr></tbody></table><div>&nbsp;</div><div>&nbsp;</div><p><strong>BRAUN HEALTH - CUIDADO PERSONAL:</strong></p><p>Se ha de pedir autorización previa <strong><u>siempre</u></strong> a delegado/comercial&nbsp; adjuntando tiquet inferior a 15 dias.</p><p>&nbsp;</p><ul><li>Si su valor es inferior a 100€, para su destrucción y abono directo, tendrán que subir dicha autorización como \"recogida directa en tienda\", gracias.</li></ul><p>&nbsp;</p><ul><li>Si su valor es superior a 100€, graben devolución por portal, <u>adjunten autorización</u>, y se la validaremos. Les recogerá RAPITECNIC con nuestra RMA.</li></ul><p>&nbsp;</p><p><strong>Peguen en el exterior del producto defectuoso dicha autorización, gracias.</strong></p><p><span style=\"text-decoration: underline;\"><strong>IMPRESCINDIBLE PEGAR FUERA DE LA CAJA EL TICKET INFERIOR A 15 DIAS </strong></span>embalajes y accesorios originales.</p><p>Listado de delegados/comerciales:</p><ul><li><strong>Candelsa y ASOCIADOS: Pablo Segovia <a href=\"mailto:Pablo.segovia@external.delnghigroup.com\">Pablo.segovia@external.delnghigroup.com</a></strong></li><li><strong>Tiendas MIRO: Pablo Segovia <a href=\"mailto:Pablo.segovia@external.delnghigroup.com\">Pablo.segovia@external.delnghigroup.com</a></strong></li><li><strong>Bazar EL REGALO: Santi Botias <a href=\"mailto:santibserrano@hotmail.com\">santibserrano@hotmail.com</a>&nbsp;</strong></li><li><strong>BALEARES: Jose Alcala <a href=\"mailto:jose.alcala.arbona@gmail.com\">jose.alcala.arbona@gmail.com</a></strong></li></ul>"
    },
    {
        id: "brigmton",
        name: "BRIGMTON",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/BRIGMTON/brigmton.png",
        contacts: [
            {
                name: "SAT"
            }
        ],
        // description: "<p>Para <b>PATINETES</b>: Se tramita directamente con el proveedor.</p><p>Enviar email a <a href=\"http://info@tera3d.es\" target=\"_blank\">info@tera3d.es</a> y ellos les darán las instrucciones para gestionar la garantía o devolución.</p><p><br></p><p>Para <b>el resto de productos</b>, pónganse en contacto por email con su gestora para indicarles como proceder, gracias.</p>"
    },
    {
        id: "brita",
        name: "BRITA",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/BRITA/brita.jpeg",
        contacts: [
            {
                name: "Verónica Marín",
                phone: "670 058 464",
                email: "vmarin@brita.net"
            },
            {
                name: "SAT",
                phone: "900 802 842",
                email: "sac@brita.net"
            }
        ],
        // downloads: [
        //     {
        //         name: "Servicios_ATT._Consumidor_y_Resiclaje_BRITA._..pdf",
        //         url: "/src/assets/downloads/Servicios_ATT._Consumidor_y_Resiclaje_BRITA._..pdf"
        //     }
        // ],
        // description: "<p>Graben devolución por portal. Les recogerá RAPITECNIC con nuestra RMA, A EXCEPCION DE LOS <strong>FILTROS QUE NO SE PUEDEN DEVOLVER </strong>Y DEBEN SER TRAMITADOS&nbsp; CON EL PROVEEDOR DIRECTAMENTE<strong>.</strong></p><p><strong>IMPRESCINDIBLE</strong> embalajes y accesorios originales</p><p>Para reparaciones o reposición de piezas: dirigirse al servicio de AATT. Se adjunta plantilla.<br>HORARIO de Lunes a Viernes de 09.00 - 13.00</p>"
    },
    {
        id: "candy",
        name: "CANDY",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/CANDY/candy.png",
        contacts: [
            {
                name: "Daniel Rodriguez",
                phone: "662 929 908",
                email: "drodriguez@candy-hoover.es"
            },
            {
                name: "SAT",
                phone: "902 100 150 / 943 914 150",
                email: "service.espana@candy-hoover.com"
            },
            {
                name: "Atención al cliente",
                email: "atencionalcliente@candy-hoover.es"
            }
        ],
        // downloads: [
        //     {
        //         name: "plantilla_daños_CANDY.xlsx",
        //         url: "/src/assets/downloads/plantilla_daños_CANDY.xlsx"
        //     },
        //     {
        //         name: "Política_de_Servicio_-_Haier_Europe_-_Rel_2.2.pdf",
        //         url: "/src/assets/downloads/Política_de_Servicio_-_Haier_Europe_-_Rel_2.2.pdf"
        //     }
        // ],
        // description: "<p>Se gestiona directamente con proveedor.&nbsp;</p><p><strong>&nbsp;</strong></p><p><strong>Producto defectuoso en el momento de la entrega al usuario (DOA)</strong></p><p>En el caso de que en el momento de la instalación o la entrega del bien realizada por la distribución el producto no funcionase y este decidiese retirarlo in situ, debe solicitar la revisión de este por parte de un servicio técnico oficial que en caso de confirmar el problema se procederá bien a reacondicionar para su venta o bien proceder a la devolución del mismo.</p><p>Para presentar la solicitud debe enviar la solicitud a&nbsp;<a href=\"http://atencion.cliente@haier-europe.com/\" target=\"_blank\" rel=\"noopener\">atencion.cliente@haier-europe.com</a>&nbsp;acompañado de los siguientes documentos:</p><p>• Formulario de solicitud compilado (Anexo 1)</p><p>• Factura o ticket de compra del cliente final.</p><p>&nbsp;</p><p>Localice su SAT/CAT más cercano:&nbsp;<a href=\"http://www.hoover.es/es_ES/centros-de-asistencia\">http://www.hoover.es/es_ES/centros-de-asistencia</a></p><p>&nbsp;</p><p><strong>Gestión de recambios y accesorios</strong></p><p>En caso de encontrase un producto en la distribución con alguna pieza, componente, accesorio en falta o dañado, fácilmente sustituible por su personal puede solicitarlo directamente enviado un correo a su comercial y en copia a&nbsp;<a href=\"http://carmen.galeano@haier-europe.com/\" target=\"_blank\" rel=\"noopener\">carmen.galeano@haier-europe.com</a></p>"
    },
    {
        id: "canon",
        name: "CANON ESPAÑA",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/CANON/canon.png",
        // description: "<p>CONSULTAR CON SU GESTORA</p><p>pedir autorización a proveedor</p>"
    },
    {
        id: "castey",
        name: "CASTEY",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/CASTEY/castey.png",
        // description: "<p>Graben devolución por portal. Les recogerá RAPITECNIC con nuestra RMA.</p><p>IMPRESCINDIBLE embalajes y accesorios originales</p>"
    },
    {
        id: "cecotec",
        name: "CECOTEC",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/CECOTEC/cecotec.png",
        contacts: [
            {
                name: "Francisco Fernández",
                phone: "674291579",
                email: "franciscofernandez@cecotec.es"
            },
            {
                name: "SAT / DEVOLUCIONES",
                phone: "960628458",
                email: "devolucionesempresas@cecotec.es"
            },
            {
                name: "SAT / CAMBIOS Y REPARACIONES",
                phone: "960628457 / 960661099 (Gama blanca)"
            },
            {
                name: "ATENCIÓN AL CLIENTE",
                phone: "963210728"
            }
        ],
        websites: [
            "https://b2bissues.cecotec.cloud/",
            "https://cecocare.com/"
        ],
        // downloads: [
        //     {
        //         name: "POSTVENTA_HORIZONTAL_v6.pdf",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740261184_POSTVENTA_HORIZONTAL_v6.pdf"
        //     },
        //     {
        //         name: "POSTVENTA_HORIZONTAL_v6.pdf",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740261184_POSTVENTA_HORIZONTAL_v6.pdf"
        //     }
        // ],
        // description: "<p><u>POSTVENTA:</u></p><p><strong>INCIDENCIA EN LOS PRIMEROS 15 DÍAS (DOA):&nbsp;</strong></p><p>*DEVOLUCIONES: Las devoluciones por DOA (15 días desde la fecha de venta) deberán ser solicitadas a través del correo electrónico <span style=\"background-color: #ffffff;\"><u>devolucionesempresas@cecotec.es</u></span></p><p>**indiquen que no quieren reposición, todas nuestras devoluciones han de ser contra abono</p><p>&nbsp;</p><p><strong>Pasados los 15 días</strong>, deben derivar al cliente final al servicio técnico: <a href=\"http://www.cecocare.com\" target=\"_blank\" rel=\"noopener\">www.cecocare.com</a></p><p>SAT, dependiendo del producto tienen diferentes ramas a las que dirigirse.</p><p>1.<span style=\"white-space: pre;\"> </span>PAE: Llevar a cabo a través del formulario CecoCare, el cual, os adjunto el manual en dicho correo, y se re realiza a través del siguiente enlace: https://support.storececotec.com/es</p><p>2.<span style=\"white-space: pre;\"> </span>Gama Blanca: A través del teléfono 960 66 10 99.</p><p><span style=\"white-space: pre;\"> </span>o<span style=\"white-space: pre;\"> </span>Una vez dado el parte, se derivará el mismo al SAT de la provincia correspondiente de la incidencia y se pondrá en contacto con el cliente final.</p><p>3.<span style=\"white-space: pre;\"> </span>Gama Marron TV: A través del teléfono: 916 35 06 19.</p><p><span style=\"white-space: pre;\"> </span>o<span style=\"white-space: pre;\"> </span>Una vez dado el parte, se derivará el mismo al SAT de la provincia correspondiente de la incidencia y se pondrán en contacto con el cliente final.</p><p>4.<span style=\"white-space: pre;\"> </span>Movilidad Eléctrica: Podremos gestionar la reparación a través del enlace de CecoCare o el cliente final podrá dirigirse a un centro Feu Vert.&nbsp; Para ello, podrá elegir día y hora de cita para acudir al centro más cercano de Feu Vert a través de CecoCare.</p><p>&nbsp;</p><p>** lean atentamente los documentos:&nbsp;COND. POSVENTA CANAL HORIZONTAL_v5 y&nbsp;Manual CecoCare - Canal horizontal - v2 (1), gracias.</p><p>** Teléfono de atención al cliente para CLIENTE FINAL: 96 321 07 28.</p><p>El horario de atención será de 09:00 a 18:00 de lunes a jueves y de 09:00 a 15:00 los viernes (excepto festivos).</p><p>&nbsp;</p>"
    },
    {
        id: "celly",
        name: "CELLY",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/CELLY/celly.png",
        contacts: [
            {
                name: "Max Yataco Portilla",
                email: "Max.Yataco@esprinet.com"
            }
        ],
        // description: "<p><span style=\"font-size:12.0pt;font-family:&quot;Century Gothic&quot;,sans-serif;mso-fareast-font-family:Aptos;mso-fareast-theme-font:minor-latin;mso-bidi-font-family:Aptos;color:#002060;mso-ansi-language:ES;mso-fareast-language:ES;mso-bidi-language:AR-SA\">La gestión de productos no funcionantes de Celly se realiza a través del DOA/Garantía.</span></p><p><span style=\"font-size:12.0pt;font-family:&quot;Century Gothic&quot;,sans-serif;mso-fareast-font-family:Aptos;mso-fareast-theme-font:minor-latin;mso-bidi-font-family:Aptos;color:#002060;mso-ansi-language:ES;mso-fareast-language:ES;mso-bidi-language:AR-SA\">Envía un email a tu gestora: adjunta tiquet inferior a 15 dias e indica el motivo de la devolución.</span></p><p><br></p>"
    },
    {
        id: "cointra",
        name: "COINTRA",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/COINTRA/cointra.png",
        contacts: [
            {
                name: "JUAN FERRERAS",
                email: "Juan.Ferreras@ferroli.com"
            },
            {
                name: "SAT / AVERIAS",
                phone: "912176834"
            }
        ],
        // description: "<p>Se tramita directamente con el proveedor.</p><p>Enviar email y ellos les darán las instrucciones para gestionar la garantía o devolución.</p><p><br></p><p>IMPORTANTE:<b>&nbsp;<span style=\"font-family: Arial, sans-serif; font-size: 11pt;\">en Calderas hay Puesta en Servicio (Verificación de Funcionamiento) Gratuita.&nbsp; Es un tema importante para la Garantía.</span></b></p>"
    },
    {
        id: "contact",
        name: "CONTACT",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/CONTACT/contact.png",
        contacts: [
            {
                name: "SAT",
                phone: "93.336.97.97",
                email: "sat@atlantistelecom.com"
            }
        ],
        // downloads: [
        //     {
        //         name: "Postventa_FITNESS_ATLANTIS.pdf",
        //         url: "/src/assets/downloads/Postventa_FITNESS_ATLANTIS.pdf"
        //     }
        // ],
        // description: "<p>Graben devolución por portal, adjunten tiquet de venta a cliente final inferior a 15 dias, y se la validaremos. Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p><strong>IMPRESCINDIBLE </strong>embalajes y accesorios originales y tiquet de venta.</p><p>indicar también el motivo de la devolución y el número de serie, se requerirán fotos de los embalajes.</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>Para&nbsp;<strong>REPARACIONES</strong>, se tramita directamente con el SAT de ATLANTIS</p>"
    },
    // {
    //     id: "cosori",
    //     name: "COSORI",
    //     logo: "https://bucket-pim.eu-central-1.linodeobjects.com/COSORI/cosori.png",
    //     contacts: [
    //         {
    //             name: "Marie-Théana El-Hachem",
    //             phone: "667 424 160",
    //             email: "theana.elhachem@ziclo.tech"
    //         },
    //         {
    //             name: "Zebima Amador / DEVOLUCIONES",
    //             email: "zebima.amador@ziclo.tech"
    //         },
    //         {
    //             name: "POSTVENTA / equipo de soporte",
    //             phone: "744641499",
    //             email: "soporte@cosori.site"
    //         }
    //     ],
    // description: "<p>Se ha de pedir autorización previa&nbsp;<strong><u>siempre</u></strong> a&nbsp;<span style=\"color: #4e95d9; background: yellow;\"><a href=\"mailto:returns@ziclotech.com\">returns@ziclotech.com</a></span><span style=\"color: #4e95d9;\"> <span style=\"background-color: #ffffff; color: #000000;\">adjuntando </span></span><span style=\"background-color: #ffffff;\">tiqu</span>et inferior a 15 dias e indicando motivo de la avería, gracias.</p><p>&nbsp;</p><p>Una vez tengan la autorización, graben devolución por portal,&nbsp;<u>adjunten dicha autorización</u>, y se la validaremos.</p><p>Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p>Peguen en el exterior del producto defectuoso dicha autorización, gracias.</p><p>&nbsp;</p><p><strong>IMPRESCINDIBLE&nbsp;</strong>embalajes y accesorios originales.</p><p>&nbsp;</p><p>Para consultas/ equipo de soporte: telf. 744641499 (L-J de 08:00 a 17:00 y V de 08:00 a 13:00)</p>"
    // },
    {
        id: "dlink",
        name: "D-LINK",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/D-LINK/dlink.png",
        contacts: [
            {
                name: "ANTONIO GIMENO",
                phone: "666.590.152",
                email: "antonio.gimeno@dlink.com"
            }
        ],
        // description: "<p>Se ha de pedir autorización previa&nbsp;<strong><u>siempre</u></strong> a <a class=\"sat-value-search\" href=\"mailto:antonio.gimeno@dlink.com\" target=\"_blank\" rel=\"noopener\">antonio.gimeno@dlink.com</a> indicando el motivo de la devolución y el número de serie, gracias.</p><p>&nbsp;</p><p>Después graben devolución por portal,&nbsp;<u>adjunten la autorización</u>, y se la validaremos.</p><p>Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p>IMPRESCINDIBLE embalajes y accesorios originales</p>"
    },
    // {
    //     id: "daewoo",
    //     name: "DAEWOO",
    //     description: "<p class=\"MsoNormal\">PARA EL RESTO DE PRODUCTOS CONSULTE A SU GESTORA, la marca ya no se trabaja.<br></p><p class=\"MsoNormal\" style=\"background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\"><o:p></o:p></p><p class=\"MsoNormal\" style=\"background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">Envíe un email a su gestora y valorará la devolución.<o:p></o:p></p><p class=\"MsoNormal\" style=\"background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\"></p><p class=\"MsoNormal\" style=\"background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">Indique: adjunte tiquet de venta, referencia, EAN, y motivo de la devolución<o:p></o:p></p>"
    // },
    {
        id: "daewoo-internacional",
        name: "DAEWOO INTERNACIONAL",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/DAEWOO/daewoo.png",
        contacts: [
            {
                name: "Rafael Atienza",
                phone: "650 968 465",
                email: "ratienza@flamagas.com"
            },
            {
                name: "o SERVICIO TECNICO HELPSAT",
                phone: "93 513 34 08",
                email: "tecnico@helpsat.es"
            }
        ],
        description: "<div><strong>DAEWO TELEFONIA + AUDIO (DAEI/MASATS)</strong></div><div>&nbsp;</div><div><span style=\"text-decoration: underline;\">Todas las reparaciones de post-venta se tienen que gestionar directamente con help-sat.<strong>&nbsp;</strong></span></div><div>Tienen que rellenar el formulario de la WEB;<a href=\"https://www.helpsat.es/reparaciones.php\" target=\"_blank\" rel=\"noopener\">https://www.helpsat.es/reparaciones.php</a></div><div>Sigan sus instrucción para la gestión del envío.</div><div>&nbsp;</div><div>SERVICIO TECNICO HELPSAT</div><div>Dirección: c/Anselm Clave 24 Local,&nbsp;</div><div>08750 Molins de Rei</div><div>E-mail: tecnico@helpsat.es&nbsp;</div><div>Teléfono: 935.13.34.08&nbsp;</div><div>Horario: de 10h a 18h de lunes a viernes</div><div>&nbsp;</div><div>Pasada la garantía, el usuario enviará el aparato por sus propios medios a <u>Helpsat </u>y siempre a portes pagados.</div><div>(*) La garantía de los productos vendidos antes del 1 de enero del 2022 era de dos (2) años, en lugar de los tres (3) años para los productos vendidos a partir de dicha fecha.</div><div>&nbsp;</div>"
    },
    {
        id: "daewoo-vestel",
        name: "DAEWOO VESTEL",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/DAEWOO/daewoo.png",
        contacts: [
            {
                name: "Víctor Lebrón",
                phone: "634 271 984",
                email: "lebron@vestel.es"
            },
            {
                name: "SAT",
                phone: "902.050.407 - 914.872.814",
                email: "expediciones@hiperservice.com"
            }
        ],
        // downloads: [
        //     {
        //         name: "RMA_Devoluciones_JVC_1-9-16_PROCEDIMIENTO.doc",
        //         url: "/src/assets/downloads/RMA_Devoluciones_JVC_1-9-16_PROCEDIMIENTO.doc"
        //     },
        //     {
        //         name: "extension_garantia_JVC.pdf",
        //         url: "/src/assets/downloads/extension_garantia_JVC.pdf"
        //     }
        // ],
        description: "<p><span style=\"color: #464e5f; font-family: gbregular;\">DAEWO - TELEVISIONES (DAEV)</span></p><p><span style=\"color: #464e5f; font-family: gbregular;\">&nbsp;</span></p><p><span style=\"color: #464e5f; font-family: gbregular;\">Se tramita directamente con el SAT.</span></p><p><span style=\"color: #464e5f; font-family: gbregular;\">Ellos proporcionan la información necesaria para el traslado o reparación dependiendo de la necesidad.</span></p><p><span style=\"color: #464e5f; font-family: gbregular;\">También pueden contactar a través de POST VENTA Sra. Silvia Anibaldi; 913.206.398</span></p><div>&nbsp;</div>"
    },
    {
        id: "daga",
        name: "DAGA",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/DAGA/daga.png",
        contacts: [
            {
                name: "Lourdes Noguera",
                phone: "682 13 05 83",
                email: "lourdes.noguera@tenacta.es"
            },
            {
                name: "SAT LEGON",
                phone: "93 272 59 78"
            }
        ],
        // downloads: [
        //     {
        //         name: "TENACTA_SPV.pptx",
        //         url: "/src/assets/downloads/TENACTA_SPV.pptx"
        //     },
        //     {
        //         name: "RMA_SAT.xls",
        //         url: "/src/assets/downloads/RMA_SAT.xls"
        //     },
        //     {
        //         name: "RMA_DESTRUCION.xls",
        //         url: "/src/assets/downloads/RMA_DESTRUCION.xls"
        //     }
        // ],
        // description: "<p><strong>Para productos defectuosos:</strong></p><p>Soliciten DEVOLUCIÓN a <a href=\"mailto:lourdes.noguera@tenacta.es\">lourdes.noguera@tenacta.es</a>, envíen un @ acompañado de la factura o tiquet de venta&nbsp;para solicitar la autorización y siga sus instrucciones, gracias.</p><p><strong>&nbsp;</strong></p><p><strong>** Requeridos embalajes y accesorios originales.</strong></p><p>** lean atentamente documento adjunto \"TENACTA SPV.pptx\"</p>"
    },
    {
        id: "daikin",
        name: "DAIKIN",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/DAIKIN/daikin.png",
        contacts: [
            {
                name: "SAT",
                phone: "900 800 867",
                email: "satcat@daikin.es"
            },
            {
                name: "COMERCIAL / Sergio Lopez Hernandez",
                phone: "656 289 142",
                email: "lopezhernandez.s@daikin.es"
            },
            {
                name: "CHATBOT TÉCNICO (whatsapp)",
                phone: "649 259 253"
            },
            {
                name: "ATENCIÓN AL CLIENTE",
                phone: "900 266 744"
            }
        ],
        // downloads: [
        //     {
        //         name: "Solicitud_de_intervencion.pdf",
        //         url: "/src/assets/downloads/Solicitud_de_intervencion.pdf"
        //     }
        // ],
        // description: "<h4><span style=\"font-family: Tahoma;\">se debe gestionar directamente con el servicio técnico, gracias.</span></h4><h4><span style=\"font-family: Tahoma;\">&nbsp;</span></h4><h4><span style=\"font-family: Tahoma;\">* Para gestionar un aviso de avería de doméstico tiene que rellenar el formulario adjunto.</span></h4><h4><span style=\"font-family: Tahoma;\">&nbsp;</span></h4><h4><span style=\"font-family: Tahoma;\">* Para consulta de avisos de industrial, tiene que escribir al correo de industrial <a href=\"http://satcat@daikin.es\" target=\"_blank\" rel=\"noopener\">satcat@daikin.es</a></span></h4>"
    },
    {
        id: "daitsu",
        name: "DAITSU (FUJITSU)",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/DAITSU/daitsu.png",
        contacts: [
            {
                name: "Ramon Basarrate",
                phone: "676 477 984",
                email: "rbasarrate@eurofred.com"
            },
            {
                name: "Servicio de Atención al Cliente",
                phone: "932998331"
            },
            {
                name: "SAT / Reparación o cambio",
                email: "asistenciatecnica@eurofred.com"
            }
        ],
        websites: [
            "https://www.eurofred.cl/atencion-al-cliente/buscador-servicios-tecnicos/"
        ],
        description: "<p>Se tramita directamente con el proveedor.</p><p>Dar aviso al SAT, localice el servicio técnico más cercano a través de la web.</p><p>Les pedirán la dirección completa del usuario y sus datos,&nbsp;así como la factura y el nº de serie que viene en la placa.</p><p>&nbsp;</p><p>Servicio de Atención al Cliente ,&nbsp;<span style=\"font-family: Arial, sans-serif; font-size: 12pt;\">de lunes a viernes de&nbsp;</span><strong><span style=\"font-size: 12pt; font-family: Arial, sans-serif;\">9:00h a 14:00h y de 15:00h a 18:00h.</span></strong></p><p class=\"MsoNormal\" style=\"background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\"><span style=\"color: #212121;\">&nbsp;</span></p><p class=\"MsoNormal\" style=\"background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\"><span style=\"color: #212121;\">En el caso de que el SAT resuelvan con reparación o cambio;&nbsp;</span><span style=\"color: #212121;\">Enviar los datos x email a</span></p><p class=\"MsoNormal\" style=\"background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\"><span style=\"color: #212121;\"><a href=\"mailto:distribucion.clima@eurofred.com\">distribucion.clima@eurofred.com</a>&nbsp;</span></p><p class=\"MsoNormal\" style=\"background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\"><span style=\"color: #212121;\"><a href=\"mailto:asistenciatecnica@eurofred.com\">asistenciatecnica@eurofred.com</a></span></p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>"
    },
    {
        id: "delonghi",
        name: "DELONGHI",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/DELONGHI/delonghi.png",
        contacts: [
            {
                name: "JOAN ROGER",
                phone: "646537167",
                email: "joan.roger@delonghigroup.com"
            },
            {
                name: "SAT",
                phone: "936 065 405"
            }
        ],
        websites: [
            "https://www.delonghi.com"
        ],
        // description: "<div><p>Graben devolución por portal, adjunten tiquet de venta a cliente final inferior a 15 dias, y se la validaremos. Les recogerá RAPITECNIC con nuestra RMA.</p><p><strong>IMPRESCINDIBLE </strong>embalajes y accesorios originales y tiquet de venta.</p></div><div>&nbsp;</div><div><u>Pasados los 15 días o&nbsp; no tener los embalajes y accesorios originales,</u> ponerse en contacto con el SAT:&nbsp;</div><div>&nbsp;</div><div><table style=\"width: 569pt;\" border=\"0\" width=\"758\" cellspacing=\"0\" cellpadding=\"0\"><colgroup><col style=\"width: 135pt;\" width=\"180\"><col style=\"width: 434pt;\" width=\"578\"></colgroup><tbody><tr style=\"height: 15pt;\"><td style=\"height: 15pt; width: 135pt;\" width=\"180\" height=\"20\">SAT</td><td class=\"xl65\" style=\"width: 434pt;\" width=\"578\">936 065 405</td></tr><tr style=\"height: 15pt;\"><td style=\"height: 15pt;\" height=\"20\">RED SERVICIOS TÉCNICOS</td><td class=\"xl66\"><a href=\"https://www.delonghi.com/es-es/authorised-service-centre\">https://www.delonghi.com/es-es/authorised-service-centre</a></td></tr></tbody></table></div>"
    },
    // {
    //     id: "denver",
    //     name: "DENVER",
    //     contacts: [
    //         {
    //             name: "SAT",
    //             phone: "960 046 883 ext. 4",
    //             email: "serviciotecnico.denver@intersales.eu"
    //         }
    //     ],
    // downloads: [
    //     {
    //         name: "Manual_Post_Venta_DENVER",
    //         url: "/src/assets/downloads/Manual_Post_Venta_DENVER_-_Anexo_1.pdf"
    //     }
    // ],
    //     description: "<p>Se tramita directamente con el FABRICANTE.</p><p>Por favor, lea atentamente el Manual Post Venta DENVER</p><p>&nbsp;</p><p>Garantía por DOA: 15 primeros días.</p><p>Garantía ordinaria: 2 años.</p><p>&nbsp;</p><p>DOA / RMA: enviar email a <a href=\"http://serviciotecnico.denver@intersales.eu\" target=\"_blank\" rel=\"noopener\">serviciotecnico.denver@intersales.eu</a> y seguir las instrucciones, gracias.</p><p>&nbsp;</p><p><span class=\"ui-provider a b c d e f g h i j k l m n o p q r s t u v w x y z ab ac ae af ag ah ai aj ak\" dir=\"ltr\"><span style=\"font-size: inherit;\">Gestionen la incidencia por la web de IDIOMUND: </span><a class=\"fui-Link ___1rxvrpe f2hkw1w f3rmtva f1ewtqcl fyind8e f1k6fduh f1w7gpdv fk6fouc fjoy568 figsok6 f1hu3pq6 f11qmguv f19f4twv f1tyq0we f1g0x7ka fhxju0i f1qch9an f1cnd47f fqv5qza f1vmzxwi f1o700av f13mvf36 f1cmlufx f9n3di6 f1ids18y f1tx3yz7 f1deo86v f1eh06m1 f1iescvh fhgqx19 f1olyrje f1p93eir f1nev41a f1h8hb77 f1lqvz6u f10aw75t fsle3fq f17ae5zn\" title=\"http://panel.idiomund.com/login-rma\" href=\"http://panel.idiomund.com/login-rma\" target=\"_blank\" rel=\"noreferrer noopener\" aria-label=\"Vínculo http://panel.idiomund.com/login-rma\">http://panel.idiomund.com/login-rma</a><span style=\"font-size: inherit;\">&nbsp;(Código: 00962), ellos les darán las instrucciones para gestionar la garantía o devolución.</span></span></p><p><span class=\"ui-provider a b c d e f g h i j k l m n o p q r s t u v w x y z ab ac ae af ag ah ai aj ak\" dir=\"ltr\"><span style=\"font-size: inherit;\"><br></span></span></p><p>&nbsp;</p>"
    // },
    // {
    //     id: "diquattro",
    //     name: "DIQUATTRO",
    //     contacts: [
    //         {
    //             name: "Daniel Sanchez",
    //             email: "daniel.sanchez@bbtrends.es"
    //         },
    //         {
    //             name: "GENERICO CIAL.",
    //             email: "pedidoscomercial@bbtrends.es"
    //         }
    //     ],
    //     description: "<p>Graben devolución por portal. Les recogerá RAPITECNIC con nuestra RMA.</p><p><strong>IMPRESCINDIBLE </strong>embalajes y accesorios originales</p>"
    // },
    // {
    //     id: "estar",
    //     name: "E-STAR",
    //     description: "<p>Graben devolución por portal. Les recogerá RAPITECNIC con nuestra RMA.</p><p><strong>IMPRESCINDIBLE </strong>embalajes y accesorios originales</p><p>&nbsp;</p><p><span style=\"font-size: 14.6667px;\">** Otras marcas: #MINION</span></p>"
    // },
    {
        id: "electrolux",
        name: "ELECTROLUX",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/ELECTROLUX/electrolux.png",
        contacts: [
            {
                name: "Israel Tejada Martínez",
                phone: "616 723 866",
                email: "israel.tejada-martinez@electrolux.com"
            },
            {
                name: "SAT",
                phone: "902.11.63.88"
            },
            {
                name: "Cambio sentido puertas",
                phone: "91.218.66.19"
            },
            {
                name: "Atención al Cliente",
                phone: "91.117.80.67"
            }
        ],
        websites: [
            "www.electrolux.com"
        ],
        // downloads: [
        //     {
        //         name: "plantilla_Electrolux.xls",
        //         url: "/src/assets/downloads/plantilla_Electrolux.xls"
        //     }
        // ],
        // description: "<p>Se tramita directamente con el proveedor.</p><p>Enviar plantilla debidamente cumplimentada</p>"
    },
    // {
    //     id: "elektro",
    //     name: "ELEKTRO",
    //     description: "<p>CONSULTE CON SU GESTORA, la marca ya no se trabaja.</p>"
    // },
    {
        id: "emtec",
        name: "EMTEC",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/EMTEC/emtec.png",
        // description: "<p>Graben devolución por portal. Les recogerá RAPITECNIC con nuestra RMA.</p><p><strong>IMPRESCINDIBLE </strong>embalajes y accesorios originales</p>"
    },
    {
        id: "energy-sistem",
        name: "ENERGY SISTEM",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/ENERGY SISTEM/energy_sistem.png",
        contacts: [
            {
                name: "Sergio Fernández",
                phone: "678393471",
                email: "sergio.fernandez@energysistem.com"
            },
            {
                name: "Soporte Partners",
                phone: "966 831 058",
                email: "soporte.partners@energysistem.com"
            },
            {
                name: "Garantías",
                phone: "902887885 - 966831058",
                email: "garantias@energysistem.com"
            }
        ],
        websites: [
            "www.energysistem.com",
            "https://partners.energysistem.com/"
        ],
        // downloads: [
        //     {
        //         name: "Condiciones_Postventa.pdf",
        //         url: "/src/assets/downloads/Condiciones_Postventa.pdf"
        //     },
        //     {
        //         name: "RMA_ENERGY_SISTEM_CANDELSA.pdf",
        //         url: "/src/assets/downloads/RMA_ENERGY_SISTEM_CANDELSA.pdf"
        //     }
        // ],
        // description: "<p class=\"MsoNormal\">Tramite su devolución por PORTAL: <a href=\"https://partners.energysistem.com/\">https://partners.energysistem.com/</a></p><p class=\"MsoNormal\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -Usuario/contraseña (Cada tienda ha&nbsp;de darse de alta en WEB como punto de venta.&nbsp; Si no recuerda sus claves, se pueden restablecer desde la misma web)</p><p class=\"MsoNormal\">&nbsp;</p><p class=\"MsoNormal\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -Productos de menos de 15 días: DOA (sustitución por unidad nueva) rellenar formulario y adjuntar ticket cliente final</p><p>&nbsp;</p><p class=\"MsoNormal\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -Producto más de 15 días: RMA (tanto cliente como tienda)</p><p class=\"MsoNormal\">&nbsp;</p><p class=\"MsoNormal\">Contacto Telefónico (para asistencia) Lunes – Viernes (9:00 a 18:00) tlf: 966 831 058</p><p class=\"MsoNormal\">Las tramitaciones RMA siempre se harán por el portal, ya sea partners o usuario final.</p><p class=\"MsoNormal\">&nbsp;</p><p class=\"MsoNormal\">**<strong>Aunque estéis trabajando por el portal de ANOVO para otras marcas. NO HAY QUE USAR LOGING habitual, sino con el usuario que se os generará (que empezará por ES_...)</strong> Y una vez dentro podréis tramitar.</p><p class=\"MsoNormal\">&nbsp;</p><p class=\"MsoNormal\">Si entráis con el usuario habitual de ANOVO no os saldrá ENERGY SISTEM en las marcas del desplegable.</p>"
    },
    {
        id: "engel",
        name: "ENGEL",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/ENGEL/engel.png",
        contacts: [
            {
                name: "Sr. Manolo Zarco",
                phone: "696.077.691",
                email: "mzarcoperez@gmail.com"
            },
            {
                name: "Dpto. Postventa / Garantias",
                email: "taller@engel.es"
            }
        ],
        websites: [
            "http://engel.logsantiga.com"
        ],
        // downloads: [
        //     {
        //         name: "PLANTILLA.pdf",
        //         url: "/src/assets/downloads/PLANTILLA.pdf"
        //     },
        //     {
        //         name: "Protocolo_SPV_2017_Engel_Systems[1].pdf",
        //         url: "/src/assets/downloads/Protocolo_SPV_2017_Engel_Systems[1].pdf"
        //     },
        //     {
        //         name: "Protocolo_SPV_2017_Ersax.pdf",
        //         url: "/src/assets/downloads/Protocolo_SPV_2017_Ersax.pdf"
        //     }
        // ],
        description: "<p class=\"MsoNormal\"><strong><span style=\"font-size: 10pt;\">MENOS DE 15 DÍAS</span></strong></p><p class=\"MsoNormal\"><span style=\"font-size: 10pt;\">Lo tramita directamente la tienda/socio rellenando la plantilla para solicitud del DOA, con el Dpto. Postventa.</span></p><p class=\"MsoNormal\"><span style=\"font-size: 10pt;\">El producto se recoge directamente en la tienda</span></p><p class=\"MsoNormal\"><strong><span style=\"font-size: 10pt;\">MÁS DE 15 DÍAS</span></strong></p><p class=\"MsoNormal\"><span style=\"font-size: 10pt;\">Solicitar RMA, a través de la WEB</span></p>"
    },
    {
        id: "epson",
        name: "EPSON",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/EPSON/epson.png",
        contacts: [
            {
                name: "SAT / INCIDENCIAS",
                phone: "93 550 53 95"
            },
            {
                name: "POST-VENTA",
                phone: "902 40 41 42"
            }
        ],
        // description: "<p>PARA DEVOLUCIONES CONSULTAR CON SU GESTORA</p><p>Pedir autorización a proveedor</p><p>Para incidencias o reparaciones, llamen al&nbsp;<span style=\"font-family: Calibri, sans-serif; font-size: 11pt;\">93 550 53 95.</span></p>"
    },
    // {
    //     id: "eurotec",
    //     name: "EUROTEC",
    //     contacts: [
    //         {
    //             name: "Sr. Oscar González",
    //             phone: "679.121.212",
    //             email: "susanagl@closdreams.com"
    //         }
    //     ],
    //     description: "<p>Graben devolución por portal, adjunten tiquet de venta a cliente final inferior a 15 dias, y se la validaremos. Les recogerá RAPITECNIC con nuestra RMA.</p><p><strong>IMPRESCINDIBLE </strong>embalajes y accesorios originales y tiquet de venta.</p><p><strong>Pasados 15 días</strong>, se tramita directamente con el SAT</p>"
    // },
    {
        id: "fagor",
        name: "FAGOR",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/FAGOR/fagor.png",
        contacts: [
            {
                name: "Sr. Jaime Monclús",
                phone: "636 653 969",
                email: "jaimemonclus@gmail.com"
            },
            {
                name: "CALL CENTER",
                phone: "944.041.404"
            }
        ],
        // downloads: [
        //     {
        //         name: "LISTADO_SATS.xlsx",
        //         url: "/src/assets/downloads/LISTADO_SATS.xlsx"
        //     }
        // ],
        // description: "<p>Se tramita a través del SAT.</p><p>Se adjunta el listado con todos los SAT oficiales.</p>"
    },
    {
        id: "fagor-pae",
        name: "FAGOR-PAE",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/FAGOR/fagor.png",
        contacts: [
            {
                name: "Sr. Victor Artieda",
                phone: "619.078.218",
                email: "victor.artieda@fagorelectrodomestico.com"
            },
            {
                name: "CALL CENTER",
                phone: "944.041.404"
            }
        ],
        // downloads: [
        //     {
        //         name: "LISTADO_SATS.xlsx",
        //         url: "/src/assets/downloads/LISTADO_SATS.xlsx"
        //     }
        // ],
        // description: "<p>Se tramita a través del SAT.</p><p>Se adjunta listado con todos los SAT oficiales.</p>"
    },
    {
        id: "fellowes",
        name: "FELLOWES",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/FELLOWES/fellowes.png",
        contacts: [
            {
                name: "SAT",
                phone: "917480501",
                email: "stecnico@fellowes.com"
            }
        ],
        websites: [
            "https://www.fellowes.com/es/es/support/after-sales-support.aspx"
        ],
        // description: "<p>Se tramita directamente con fabricante desde la venta mediante su WEB:&nbsp;<a href=\"https://www.fellowes.com/es/es/support/after-sales-support.aspx\" target=\"_blank\">https://www.fellowes.com/es/es/support/after-sales-support.aspx</a></p>"
    },
    // {
    //     id: "fila",
    //     name: "FILA",
    //     contacts: [
    //         {
    //             name: "ÓSCAR GONZÁLEZ",
    //             email: "oscargv@closdreams.com"
    //         }
    //     ],
    // description: "<p>Graben devolución por portal han de indicar el <span style=\"text-decoration: underline;\">motivo de la devolución y el número de serie</span>, y se la validaremos.&nbsp;<br>Les recogerá RAPITECNIC con nuestra RMA.</p><p>IMPRESCINDIBLE embalajes y accesorios originales</p>"
    // },
    // {
    //     id: "fm-calefaccion",
    //     name: "FM CALEFACCIÓN",
    //     description: "<p style=\"color: rgb(70, 78, 95); font-family: gbregular;\">CONSULTE CON SU GESTORA, la marca ya no se trabaja.</p><p style=\"color: rgb(70, 78, 95); font-family: gbregular;\"></p>"
    // },
    // {
    //     id: "fr-tec",
    //     name: "FR-TEC",
    //     contacts: [
    //         {
    //             name: "Sr. Rubén Mercado",
    //             phone: "616.433.911",
    //             email: "ruben@blade.es"
    //         }
    //     ],
    //     description: "<p>Graben devolución por portal. Les recogerá RAPITECNIC con nuestra RMA.</p><p><strong>IMPRESCINDIBLE </strong>embalajes y accesorios originales</p>"
    // },
    {
        id: "fujitsu",
        name: "FUJITSU",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/FUJITSU/fujitsu.png",
        contacts: [
            {
                name: "Ramon Basarrate",
                phone: "676 477 984",
                email: "rbasarrate@eurofred.com"
            },
            {
                name: "Servicio de Atención al Cliente",
                phone: "932998331"
            },
            {
                name: "SAT / Reparación o cambio",
                email: "asistenciatecnica@eurofred.com"
            }
        ],
        websites: [
            "https://www.eurofred.cl/atencion-al-cliente/buscador-servicios-tecnicos/",
            "https://www.eurofred.com/es/recursos/catalogos"
        ]
        ,
    },
    {
        id: "garmin",
        name: "GARMIN",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/GARMIN/garmin.png",
        contacts: [
            {
                name: "DAVID GARCIA",
                email: "David.Garcia@garmin.com"
            },
            {
                name: "SAT",
                email: "sat.spain@garmin.com"
            }
        ],
        // description: "<p>Se tramita directamente con el proveedor.</p><p>Envíen un correo al Servicio Técnico,&nbsp;<a href=\"http://sat.spain@garmin.com\" target=\"_blank\">sat.spain@garmin.com</a>&nbsp;</p>"
    },
    // {
    //     id: "google",
    //     name: "GOOGLE",
    //     description: "<p>Graben devolución por portalhan de indicar el motivo de la devolución y el número de serie, y se la validaremos.&nbsp;<br>Les recogerá RAPITECNIC con nuestra RMA.</p><p>IMPRESCINDIBLE embalajes y accesorios originales</p>"
    // },
    {
        id: "gopro",
        name: "GOPRO",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/GOPRO/gopro.png",
        contacts: [
            {
                name: "Mike Pascual Hafner",
                phone: "663 247 240",
                email: "mike.pascual@aqipa.com"
            },
            {
                name: "DEVOLUCIONES",
                email: "returns.es@aqipa.com"
            }
        ],
        // downloads: [
        //     {
        //         name: "Returnguidelines_Aqipa-Iberia_ES_2023-06.pdf",
        //         url: "/src/assets/downloads/Returnguidelines_Aqipa-Iberia_ES_2023-06.pdf"
        //     }
        // ],
        description: "<p>Se ha de pedir autorización previa&nbsp;a <a href=\"mailto:returns.es@aqipa.com\">returns.es@aqipa.com</a></p><p>&nbsp;</p><p>&nbsp;<em>Las solicitudes deben incluir la siguiente información: </em></p><ul><li>El número de artículo (EAN y/o referencia AQIPA y/o referencia fabricante)</li><li>Los números de serie</li><li>El artículo debe estar dentro del periodo de garantía legal</li><li>La factura de compra del cliente final debe adjuntarse a la solicitud</li><li>Todos los accesorios deben incluirse en la devolución</li><li>Indicaran los datos de recogida (dirección, teléfono, persona de contacto)</li></ul><p>&nbsp;</p><p><strong>Indiquen que se recoge por RAPITECNIC.</strong></p><p><strong>&nbsp;</strong></p><p>Después graben devolución por portal,&nbsp;<u>adjunten la autorización</u>, y se la validaremos.</p><p>Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p><strong>IMPRESCINDIBLE</strong> embalajes y accesorios originales y tiquet de venta.</p><p>&nbsp;</p><p><strong>PEGUEN LA AUTORIZACIÓN FUERA DEL PRODUCTO DEFECTUOSO, GRACIAS</strong>.</p><p>&nbsp;</p><p>LEAN ATENTAMENTE EL DOCUMENTO ADJUNTO; Returnguidelines_Aqipa-Iberia_ES_2023-06</p><p>Se recomienda que el cliente final se ponga en contacto directamente con el servicio de asistencia de la marca para garantizar una tramitación más rápida; <a>https://community.gopro.com/</a></p><p>#AQIPA</p>"
    },
    {
        id: "grundig",
        name: "GRUNDIG",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/GRUNDIG/grundig.png",
        contacts: [
            {
                name: "Agustín Pina",
                phone: "619 28 86 55",
                email: "agustin.pina@europeanappliances.com"
            },
            {
                name: "SAT / TELENISA",
                phone: "902.100.036 - 932 884 276",
                email: "Rma.grundig@telenisa.net"
            },
            {
                name: "ATENCIÓN AL CLIENTE",
                email: "grundig@callcenterbarcelona.es"
            }
        ],
        websites: [
            "https://www.telenisa.net/profesionales/tiendas/abono-articulos.html"
        ],
        // description: "<p><strong>GAMA MARRÓN - AUDIO - CUIDADO PERSONAL</strong></p><p><u>TIENDAS</u>: para producto defectuoso, solicitar aviso a través del link de TELENISA: https://www.telenisa.net/profesionales/tiendas/abono-articulos.html</p><p>&nbsp;Usuario: tiendas&nbsp;</p><p>&nbsp;Contraseña: tiendas&nbsp;</p><p><u>&nbsp;</u></p><p>Rellene el formulario con los siguientes datos;&nbsp;</p><p>&nbsp;</p><p>GRUPO DE COMPRA O PLATAFORMA: <strong>RAPITECNIC</strong></p><p>EMAIL DEL DELEGADO QUE GESTIONA SU CUENTA: <a href=\"mailto:agustin.pina@europeanappliances.com\">agustin.pina@europeanappliances.com</a></p><p>CODIGO CLIENTE: <strong>64241</strong></p><p><u>&nbsp;</u></p><p>el resto de datos son los de su tienda y la dirección donde se encuentre el producto defectuoso.</p><p><u>&nbsp;</u></p><p>recibirán un correo conforme TELENISA ha recibido su aviso con un número de RMA: recogerán siempre por tienda, revisarán y les enviarán por email el resultado de dicha solicitud: abono o reposición.&nbsp;</p><p>en el caso de abono, recibirán un segundo email con el número de RMA o ABONO autorizado el cual han de subir a portal como \"recogida directa de proveedor\", de esta manera haremos el seguimiento hasta que nos hagan llegar dicho abono y se lo podamos&nbsp; repercutir, gracias.</p><p>&nbsp;</p><p><strong>OPERATIVA PRODUCTO BAJA FRECUENCIA:</strong></p><p>Graben devolución por portal, adjunten tiquet de venta a cliente final inferior a 15 dias, y se la validaremos. Les recogerá RAPITECNIC con nuestra RMA.</p><p><strong>IMPRESCINDIBLE </strong>embalajes y accesorios originales y tiquet de venta.</p><p>indicar también el motivo de la devolución y el número de serie</p><div>&nbsp;</div><p><u>CLIENTE FINAL</u>: para averías o reparaciones pueden encontrar su SAT Oficial más cercano repartidos por la geografía nacional en la WEB de TELENISA</p><p>&nbsp;</p><p>** por favor, lean atentamente el documento adjunto del protocolo de la operativa de devoluciones, gracias.</p>"
    },
    {
        id: "grundig-aire",
        name: "GRUNDIG AIRE",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/GRUNDIG/grundig.png",
        contacts: [
            {
                name: "Sr. Albert Mateu",
                phone: "687 78 25 03",
                email: "albert.mateu@beko.com"
            },
            {
                name: "ATENCIÓN AL CLIENTE",
                email: "grundig@callcenterbarcelona.es"
            }
        ],
        description: "<p class=\"MsoNormal\"><span style=\"font-size: 11.0pt; mso-fareast-language: EN-US;\">Los productos tienen 3 años de garantía y durante ese periodo la marca dará la cobertura pertinente con su red de servicio. </span></p><p class=\"MsoNormal\"><span style=\"font-size: 11.0pt; mso-fareast-language: EN-US;\">Los avisos se han de realizar a través del Call center,&nbsp;</span><span style=\"font-size: 14.6667px;\"><a href=\"http://grundig@callcenterbarcelona.es\" target=\"_blank\" rel=\"noopener\">grundig@callcenterbarcelona.es</a></span></p>"
    },
    {
        id: "grundig-blanca",
        name: "GRUNDIG BLANCA",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/GRUNDIG/grundig.png",
        contacts: [
            {
                name: "Sr. Albert Mateu",
                phone: "687 78 25 03",
                email: "albert.mateu@beko.com"
            },
            {
                name: "PARA CAMBIOS ,DUPLICADOS, CAMBIO CADENA DE COMPRAS Y CANCELACIONES REFERENTE A ABONOS",
                email: "rma@callcenterbarcelona.es"
            },
            {
                name: "SAT / CATALUÑA",
                email: "beko@callcenterbarcelona.es"
            },
            {
                name: "SAT / RESTO DE ESPAÑA",
                phone: "932958650"
            },
            {
                name: "SAT / LLEIDA",
                phone: "932958650"
            }
        ],
        // downloads: [
        //     {
        //         name: "RELACION_CP_-_SATs_CONTACT.xlsx",
        //         url: "/src/assets/downloads/RELACION_CP_-_SATs_CONTACT.xlsx"
        //     }
        // ],
        // description: "<p style=\"color: #464e5f; font-family: gbregular;\"><span style=\"font-family: Tahoma;\">Se gestiona directamente con proveedor.</span></p><p style=\"color: #464e5f; font-family: gbregular;\"><span style=\"font-family: Tahoma;\">Rellenar la plantilla y mandarla al e-mail del</span><span style=\"font-family: Tahoma;\">&nbsp;</span><a style=\"color: #0096db; transition: color 0.15s ease 0s, background-color 0.15s ease 0s, border-color 0.15s ease 0s, box-shadow 0.15s ease 0s;\" href=\"mailto:emine.sari@beko.com\" target=\"_blank\" rel=\"noopener\"><span style=\"font-family: Tahoma;\">SAT</span></a><span style=\"font-family: Tahoma;\">.</span></p><p style=\"color: #464e5f; font-family: gbregular;\"><span style=\"font-family: Tahoma;\">Autorizan y una vez autorizado, se procede a su destrucción por los medios de reciclaje establecidos legalmente por zona.</span></p><p style=\"color: #464e5f; font-family: gbregular;\"><br><span style=\"font-weight: 600; font-family: Tahoma;\">PARA AVERÍAS O REPARACIONES:</span><span style=\"font-family: Tahoma;\">&nbsp;</span><span style=\"font-family: Tahoma;\">pueden encontrar su SAT Oficial más cercano repartidos por la geografía nacional. Ver documento</span><span style=\"font-family: Tahoma;\">&nbsp;</span><u><span style=\"font-family: Tahoma;\">RELACION CP - SATs CONTACT</span></u></p>"
    },
    {
        id: "haier-insof",
        name: "HAIER INSOF",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/HAIER/haier.png",
        contacts: [
            {
                name: "Daniel Rodriguez",
                phone: "662929908",
                email: "drodriguez@candy-hoover.es"
            },
            {
                name: "SAT / Gama BLANCA",
                phone: "902 509 123 / 912 172 025",
                email: "soporte@haier-europe.com"
            },
            {
                name: "SAT / Gama PAE",
                phone: "902 100 150 / 943 914 150"
            }
        ],
        // downloads: [
        //     // {
        //     //     name: "HAIER_(HAII)_PLANTILLA.xls",
        //     //     url: "/src/assets/downloads/HAIER_(HAII)_PLANTILLA.xls"
        //     // },
        //     {
        //         name: "Política_de_Servicio_-_Haier_Europe_-_Rel_2.2.pdf",
        //         url: "/src/assets/downloads/Política_de_Servicio_-_Haier_Europe_-_Rel_2.2.pdf"
        //     }
        // ],
        // description: "<p>Se gestiona directamente con proveedor.&nbsp;</p><p><strong>&nbsp;</strong></p><p><strong>Producto defectuoso en el momento de la entrega al usuario (DOA) </strong></p><p>En el caso de que en el momento de la instalación o la entrega del bien realizada por la distribución el producto no funcionase y este decidiese retirarlo in situ, debe solicitar la revisión de este por parte de un servicio técnico oficial que en caso de confirmar el problema se procederá bien a reacondicionar para su venta o bien proceder a la devolución del mismo.</p><p>Para presentar la solicitud debe enviar la solicitud a <a href=\"http://atencion.cliente@haier-europe.com\" target=\"_blank\" rel=\"noopener\">atencion.cliente@haier-europe.com</a> acompañado de los siguientes documentos:</p><p>• Formulario de solicitud compilado (Anexo 1)</p><p>• Factura o ticket de compra del cliente final.</p><p>&nbsp;</p><p>Localice su SAT/CAT más cercano:&nbsp;<a href=\"http://www.hoover.es/es_ES/centros-de-asistencia\">http://www.hoover.es/es_ES/centros-de-asistencia</a></p><p>&nbsp;</p><p><strong>Gestión de recambios y accesorios</strong></p><p>En caso de encontrase un producto en la distribución con alguna pieza, componente, accesorio en falta o dañado, fácilmente sustituible por su personal puede solicitarlo directamente enviado un correo a su comercial y en copia a&nbsp;<a href=\"http://carmen.galeano@haier-europe.com/\" target=\"_blank\" rel=\"noopener\">carmen.galeano@haier-europe.com</a></p><p>&nbsp;</p>"
    },
    {
        id: "hewlett-packard",
        name: "HEWLETT PACKARD",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/HEWLETT PACKARD/hewlett_packard.png",
        // description: "<p>\tCONSULTAR CON SU GESTORA</p><p>Pedir autorización a proveedor</p><p>marca: HP</p><p class=\"MsoNormal\" style=\"background:#F7F7F8\"><b><span style=\"font-family:Roboto;color:#333232\"><br></span></b></p><p class=\"MsoNormal\" style=\"background:#F7F7F8\"><b><span style=\"font-family:Roboto;color:#333232\">REPARACIONES:&nbsp;</span></b><span style=\"color: rgb(51, 50, 50); font-family: Roboto;\">Directa con Fabricante</span></p><p class=\"MsoNormal\" style=\"background:#F7F7F8\"><span style=\"font-family:Roboto;color:#333232\">Garantía: 36 meses<o:p></o:p></span></p><p class=\"MsoNormal\" style=\"background:#F7F7F8\"><span style=\"color: rgb(51, 50, 50); font-family: Roboto;\">Contacto de soporte o gestión:&nbsp;</span><span style=\"color: rgb(51, 50, 50); font-family: Roboto;\">913754769 /&nbsp;</span><span style=\"color: rgb(51, 50, 50); font-family: Roboto;\">9137547</span><span style=\"color: rgb(51, 50, 50); font-family: Roboto;\">70</span></p><p class=\"MsoNormal\" style=\"background:#F7F7F8\"><span style=\"font-family:Roboto;color:#333232\">- Web: <a href=\"https://support.hp.com/es-es/\">https://support.hp.com/es-es/</a><o:p></o:p></span></p><p class=\"MsoNormal\" style=\"background:#F7F7F8\"><span style=\"font-family:Roboto;color:#333232\">Información adicional: Gestión directa con fabricante desde la venta.<o:p></o:p></span></p><p><br></p>"
    },
    {
        id: "hisense-blanca",
        name: "HISENSE BLANCA",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/HISENSE/hisense.png",
        contacts: [
            {
                name: "Josep Àngel Martínez Castillejo",
                phone: "661 44 39 58",
                email: "joseangel.martinez@hisense.com"
            }
        ],
        websites: [
            "www.hisense.es"
        ],
        // downloads: [
        //     {
        //         name: "DEVOLUCION_DOA__GAMA_BLANCA_AIRE_TV_HISENSE.docx",
        //         url: "/src/assets/downloads/DEVOLUCION_DOA__GAMA_BLANCA_AIRE_TV_HISENSE.docx"
        //     },
        //     {
        //         name: "ANEXO_GAMA_BLANCA_Y_AIRE__solicitud_individual_HISENSE.DOCX",
        //         url: "/src/assets/downloads/ANEXO_GAMA_BLANCA_Y_AIRE__solicitud_individual_HISENSE.DOCX"
        //     },
        //     {
        //         name: "FAX_Devolucion_Almacen_Hisense.doc",
        //         url: "/src/assets/downloads/FAX_Devolucion_Almacen_Hisense.doc"
        //     }
        // ],
        description: "<p>Ver adjunto ( según Gama )</p><p>Se tramita directamente con el SAT.</p><p>Poner en el asunto: Solicitud de devolución DOA y nombre de la tienda</p>"
    },
    {
        id: "hisense-marron",
        name: "HISENSE MARRÓN",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/HISENSE/hisense.png",
        contacts: [
            {
                name: "Javier Fernandez",
                phone: "677 900 869",
                email: "javier.fernandez@hisenseiberia.com"
            }
        ],
        websites: [
            "www.hisense.es"
        ],
        // downloads: [
        //     {
        //         name: "DOA_TELEFONIA_MÓVIL_HISENSE_punto_de_venta.docx",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740262253_DOA_TELEFONIA_MÓVIL_HISENSE_punto_de_venta.docx"
        //     },
        //     {
        //         name: "ANEXO_TELEFONIA__solicitud_individual_HISENSE.doc",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740262253_ANEXO_TELEFONIA__solicitud_individual_HISENSE.doc"
        //     },
        //     {
        //         name: "ANEXO_TV__solicitud_individual_HISENSE.docx",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740262253_ANEXO_TV__solicitud_individual_HISENSE.docx"
        //     },
        //     {
        //         name: "ANEXO_TV__solicitud_individual_HISENSE_(2).DOCX",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740262253_ANEXO_TV__solicitud_individual_HISENSE_(2).DOCX"
        //     },
        //     {
        //         name: "FAX_Devolucion_Almacen_Hisense.doc",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740262253_FAX_Devolucion_Almacen_Hisense.doc"
        //     }
        // ],
        // description: "<p>Ver adjunto ( según Gama )</p><p>Se tramita directamente con el SAT.</p><p>Poner en el asunto: Solicitud de devolución DOA y nombre de la tienda</p>"
    },
    // {
    //     id: "hitachi-tv",
    //     name: "HITACHI TV",
    //     contacts: [
    //         {
    //             name: "Sr. Félix Sepúlveda",
    //             email: "sepulveda@vestel.es"
    //         },
    //         {
    //             name: "SAT",
    //             phone: "902.050.407 - 914.872.814",
    //             email: "expediciones@hiperservice.com"
    //         }
    //     ],
    //     // downloads: [
    //     //     {
    //     //         name: "RMA_Devoluciones_PROCEDIMIENTO.doc",
    //     //         url: "/src/assets/downloads/RMA_Devoluciones_PROCEDIMIENTO.doc"
    //     //     }
    //     // ],
    //     description: "<p style=\"color: #464e5f; font-family: gbregular;\">Se tramita directamente con el SAT.</p><p style=\"color: #464e5f; font-family: gbregular;\">Ellos proporcionan la información necesaria para el traslado o reparación dependiendo de la necesidad.</p><p style=\"color: #464e5f; font-family: gbregular;\">También pueden contactar a través de POST VENTA Sra. Silvia Anibaldi; 913.206.398</p>"
    // },
    {
        id: "hoover",
        name: "HOOVER",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/HOOVER/hoover.png",
        contacts: [
            {
                name: "Daniel Rodriguez",
                phone: "662 929 908",
                email: "drodriguez@candy-hoover.es"
            },
            {
                name: "SAT",
                phone: "902 100 150 / 943 914 150",
                email: "service.espana@candy-hoover.com"
            },
            {
                name: "Atención al cliente",
                email: "atencionalcliente@candy-hoover.es"
            }
        ],
        // downloads: [
        //     {
        //         name: "plantilla_daños_CANDY.xlsx",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740261712_plantilla_daños_CANDY.xlsx"
        //     },
        //     {
        //         name: "Política_de_Servicio_-_Haier_Europe_-_Rel_2.2.pdf",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740261713_Política_de_Servicio_-_Haier_Europe_-_Rel_2.2.pdf"
        //     }
        // ],
        // description: "<p>Se gestiona directamente con proveedor.&nbsp;</p><p><strong>&nbsp;</strong></p><p><strong>Producto defectuoso en el momento de la entrega al usuario (DOA)</strong></p><p>En el caso de que en el momento de la instalación o la entrega del bien realizada por la distribución el producto no funcionase y este decidiese retirarlo in situ, debe solicitar la revisión de este por parte de un servicio técnico oficial que en caso de confirmar el problema se procederá bien a reacondicionar para su venta o bien proceder a la devolución del mismo.</p><p>Para presentar la solicitud debe enviar la solicitud a&nbsp;<a href=\"http://atencion.cliente@haier-europe.com/\" target=\"_blank\" rel=\"noopener\">atencion.cliente@haier-europe.com</a>&nbsp;acompañado de los siguientes documentos:</p><p>• Formulario de solicitud compilado (Anexo 1)</p><p>• Factura o ticket de compra del cliente final.</p><p>&nbsp;</p><p>Localice su SAT/CAT más cercano:&nbsp;<a href=\"http://www.hoover.es/es_ES/centros-de-asistencia\">http://www.hoover.es/es_ES/centros-de-asistencia</a></p><p>&nbsp;</p><p><strong>Gestión de recambios y accesorios</strong></p><p>En caso de encontrase un producto en la distribución con alguna pieza, componente, accesorio en falta o dañado, fácilmente sustituible por su personal puede solicitarlo directamente enviado un correo a su comercial y en copia a <a href=\"http://carmen.galeano@haier-europe.com\" target=\"_blank\" rel=\"noopener\">carmen.galeano@haier-europe.com</a></p>"
    },
    // {
    //     id: "htw",
    //     name: "HTW",
    //     contacts: [
    //         {
    //             name: "José Maria Alvarez",
    //             phone: "671514470",
    //             email: "josemaria.alvarez@groupgia.com"
    //         }
    //     ],
    //     emails: [
    //         "devoluciones@groupgia.com"
    //     ],
    //     description: "<p>&nbsp;</p><p>Se gestiona directamente con el proveedor.</p><p>&nbsp;</p><p>Enviar correo electrónico a&nbsp; <a href=\"mailto:devoluciones@groupgia.com\">devoluciones@groupgia.com</a> , indicando :</p><p>*Número de serie.</p><p>*Imagen del estado del producto.</p><p>*Descripción de la avería.</p><p>*Ticket de venta.</p><p>&nbsp;</p><p>El proveedor les indicará como proceder. En caso de autorización de destrucción para su&nbsp; canje/abono,&nbsp; subirla al portal en el apartado de \" Recogidas Proveedor en tienda\" para su abono.</p>"
    // },
    // {
    //     id: "hyundai",
    //     name: "HYUNDAI",
    //     contacts: [
    //         {
    //             name: "José Manuel Robledano",
    //             phone: "606 08 61 29",
    //             email: "jmrobledano@svanelectro.com"
    //         },
    //         {
    //             name: "TV SAT",
    //             phone: "722 345 702",
    //             email: "tvsat@svanelectro.com"
    //         },
    //         {
    //             name: "TV Avisos",
    //             phone: "963246751 – 963246752",
    //             email: "avisos@svanelectro.com"
    //         }
    //     ],
    //     // downloads: [
    //     //     {
    //     //         name: "Protocolo_avisos_de_TV_con_averia_Grupo_SVAN.pdf",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1741089543_Protocolo_avisos_de_TV_con_averia_Grupo_SVAN.pdf"
    //     //     }
    //     // ],
    //     description: "<p>Se tramita directamente con proveedor: Se comunicará la incidencia al S.A.T de TV Central, a través del correo <a>tvsat@svanelectro.com</a>,&nbsp;<br>&nbsp;con copia al correo de avisos <a>avisos@svanelectro.com</a></p><p>Lea \"Protocolo avisos de TV con averia Grupo SVAN\", y siga sus indicaciones dependiendo del tipo de incidencia, gracias.</p>"
    // },
    {
        id: "indesit",
        name: "INDESIT",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/INDESIT/indesit.png",
        contacts: [
            {
                name: "Sr. Xavier del Pino Badía",
                phone: "648907430",
                email: "xavier.del.pino@beko.com"
            },
            {
                name: "SAT / REPARACIONES",
                phone: "902 203 204 / 932 382 354",
                email: "avisos_reparacion@whirlpool.com"
            }
        ],
        websites: [
            "https://www.whirlpoolservice.es/"
        ],
        // description: "<table style=\"width: 324pt;\" border=\"0\" width=\"432\" cellspacing=\"0\" cellpadding=\"0\"><colgroup><col style=\"mso-width-source: userset; mso-width-alt: 15360; width: 324pt;\" width=\"432\"> </colgroup><tbody><tr style=\"height: 15.0pt;\"><td class=\"xl65\" style=\"height: 15.0pt; width: 324pt;\" width=\"432\" height=\"20\">Se tramita directamente con el proveedor.</td></tr><tr style=\"height: 15.6pt;\"><td class=\"xl65\" style=\"height: 15.6pt; border-top: none;\" height=\"21\"><p>Le pedirán la fotografía de la etiqueta del modelo y número de serie.&nbsp;</p><p>&nbsp;</p><table style=\"width: 351pt;\" border=\"0\" width=\"468\" cellspacing=\"0\" cellpadding=\"0\"><colgroup><col style=\"mso-width-source: userset; mso-width-alt: 17115; width: 351pt;\" width=\"468\"> </colgroup><tbody><tr style=\"height: 15.75pt;\"><td class=\"xl65\" style=\"height: 15.75pt; width: 351pt;\" width=\"468\" height=\"21\">para REPARACIONES, los avisos se pueden pasar de varias maneras:</td></tr><tr style=\"height: 15.75pt;\"><td class=\"xl65\" style=\"height: 15.75pt; border-top: none;\" height=\"21\">-Telf. : 902 203204 o bien telf. gratuito: 932382354</td></tr><tr style=\"height: 15.75pt;\"><td class=\"xl65\" style=\"height: 15.75pt; border-top: none;\" height=\"21\">- Por email: avisos_reparacion@whirlpool.com</td></tr><tr style=\"height: 15.75pt;\"><td class=\"xl65\" style=\"height: 15.75pt; border-top: none;\" height=\"21\">- Por Web: https://www.whirlpoolservice.es/&nbsp; , clickar en Nueva asistencia, rellenar el formulario, al final del proceso es posible descargar copia en PDF del aviso.</td></tr></tbody></table></td></tr></tbody></table>"
    },
    // {
    //     id: "infiniton",
    //     name: "INFINITON",
    //     contacts: [
    //         {
    //             name: "SAT",
    //             phone: "958 087 169",
    //             email: "rma@infiniton.es"
    //         },
    //         {
    //             name: "MIQUEL MORENO",
    //             phone: "609760235",
    //             email: "miquel.moreno@infiniton.es"
    //         }
    //     ],
    //     websites: [
    //         "online:infiniton.es/contactenos"
    //     ],
    //     // downloads: [
    //     //     {
    //     //         name: "CALL_CENTER_INFINITON.pdf",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1741089628_CALL_CENTER_INFINITON.pdf"
    //     //     },
    //     //     {
    //     //         name: "SERVICIOS_TÉCNICOS_ARAGON-CATALUÑA-BALEARES.xlsx",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1741089628_SERVICIOS_TÉCNICOS_ARAGON-CATALUÑA-BALEARES.xlsx"
    //     //     }
    //     // ],
    //     description: "<p>&nbsp;</p><p>para DOA (inferior a 15 dias de la fecha de la venta): pidan autorización a <a href=\"mailto:rma@infiniton.es\">rma@infiniton.es</a> , pongan en copia a MIQUEL MORENO <a href=\"mailto:miquel.moreno@infiniton.es\">miquel.moreno@infiniton.es</a> ,y pedir que les confirmacen dirección de recogida;</p><p>&nbsp;</p><p>&nbsp; &nbsp;- Si recoge INFINITON directamente por tienda, subir a portal el albarán de la recogida como \"Recogida proveedor en tienda\".</p><p>&nbsp; &nbsp;- Si la recogida la hace INFINITON desde RAPITECNIC, graben por portal como \"Devolución\" adjuntando dicha autorización, gracias.</p><p>&nbsp;</p><p>para DAÑO OCULTO (golpeado): pidan autorización a a <a href=\"mailto:rma@infiniton.es\">rma@infiniton.es</a> , pongan en copia a MIQUEL MORENO <a href=\"mailto:miquel.moreno@infiniton.es\">miquel.moreno@infiniton.es</a>&nbsp;. Les pedirán foto del número de serie, y etiqueta siguiendo las instrucciones del correo o de la web. Se resolverá con depreciación o recogida en tienda y abono.</p><p>&nbsp;</p><p>&nbsp;</p><p>Para <strong>REPARACIONES/GARANTIAS</strong>; póngase en contacto con SAT:&nbsp;</p><p>&nbsp;</p><p>mediante el formulario <a href=\"online:infiniton.es/contactenos\" target=\"_blank\" rel=\"noopener\">online:infiniton.es/contactenos</a></p><p>o a través del correo electrónico:&nbsp;<a href=\"http://rma@infiniton.es\" target=\"_blank\" rel=\"noopener\">rma@infiniton.es</a></p><p>&nbsp;</p><p>atención al cliente: 958 087 169</p><p>672 749 414 · 663 358 715 · 670 811 291 · 674 055 406</p><p>&nbsp;</p><p>HORARIO</p><p>de Lunes a Jueves de 9:00 a 14:00 y de 15:45 a 18:00</p><p>Viernes de 9:00 a 15:00</p><p>&nbsp;</p><p>** localice su SAT más cercano en el documento adjunto \"SERVICIOS TÉCNICOS ARAGÓN-CATALUÑA-BALEARES\"</p>"
    // },
    // {
    //     id: "innjoo",
    //     name: "INNJOO",
    //     contacts: [
    //         {
    //             name: "620.616.511",
    //             email: "administracion@innjoo.es"
    //         },
    //         {
    //             name: "MIGUEL",
    //             email: "postventa@innjoo.es"
    //         }
    //     ],
    //     description: "<p>Se tiene que registrar la incidencia en el link siguiente: https://innjoo.es/garantia-rma-innjoo/</p><p>GLS pasará a por el dispositivo en 24/48 horas y lo hará llegar al Servicio técnico.</p>"
    // },
    {
        id: "innova",
        name: "INNOVA",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/INNOVA/innova.png",
        contacts: [
            {
                name: "Oscar González",
                phone: "917524381",
                email: "oscargv@closdreams.com"
            },
            {
                name: "SAT",
                email: "devoluciones@closdreams.com"
            }
        ],
        // description: "<p>Graben devolución por portal, adjunten tiquet de venta a cliente final inferior a 15 dias, y se la validaremos. Les recogerá RAPITECNIC con nuestra RMA.</p><p><strong>IMPRESCINDIBLE </strong>embalajes y accesorios originales y tiquet de venta.</p><p><strong>PEGUEN EL TIQUET FUERA DEL PRODUCTO DEFECTUOSO, GRACIAS.</strong></p>"
    },
    // {
    //     id: "inovix",
    //     name: "INOVIX",
    //     description: "<p><span style=\"color: rgb(70, 78, 95); font-family: gbregular;\">CONSULTAR CON SU GESTORA</span><br></p>"
    // },
    // {
    //     id: "iphone",
    //     name: "IPHONE",
    //     // downloads: [
    //     //     {
    //     //         name: "SOLICITUD_DOA_IPHONE.doc",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1740258683_SOLICITUD_DOA_IPHONE.doc"
    //     //     }
    //     // ],
    //     description: "<p>Ver procedimiento adjunto</p>"
    // },
    // {
    //     id: "iphone-refurbished",
    //     name: "IPHONE REFURBISHED",
    //     contacts: [
    //         {
    //             name: "Atención al cliente",
    //             phone: "951 38 57 41"
    //         },
    //         {
    //             name: "Avisos y solicitudes de posventa",
    //             phone: "951 385 741 (Ext. 3)",
    //             email: "reparaciones@rewaremobile.com"
    //         }
    //     ],
    //     websites: [
    //         "www.rewaremobile.es",
    //         "http://Rewarest.apkweb.es",
    //         "www.rewaremobile.es"
    //     ],
    //     // downloads: [
    //     //     {
    //     //         name: "Condiciones_de_RMA_y_garantiìa_ReWare_CPO_2022_Peninsula_y_Canarias.DE_(1).pdf",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1740261832_Condiciones_de_RMA_y_garantiìa_ReWare_CPO_2022_Peninsula_y_Canarias.DE_(1).pdf"
    //     //     },
    //     //     {
    //     //         name: "iCLOUD_&_PASSCODE.pdf",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1740261832_iCLOUD_&_PASSCODE.pdf"
    //     //     },
    //     //     {
    //     //         name: "BUSCAR_MI_IPHONE.pdf",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1740261832_BUSCAR_MI_IPHONE.pdf"
    //     //     }
    //     // ],
    // },
    // {
    //     id: "jata",
    //     name: "JATA",
    //     contacts: [
    //         {
    //             name: "servicio técnico",
    //             phone: "848640234"
    //         }
    //     ],
    //     websites: [
    //         "www.jata.es"
    //     ],
    //     // downloads: [
    //     //     {
    //     //         name: "SAT_PROPIO_JATA_v230125_(003).pdf",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1741089721_SAT_PROPIO_JATA_v230125_(003).pdf"
    //     //     },
    //     //     {
    //     //         name: "DOCUMENTO_SAT_10-05-2023.pdf",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1741090155_DOCUMENTO_SAT_10-05-2023.pdf"
    //     //     }
    //     // ],
    //     description: "<p><strong>SERVICIO TÉCNICO destinado a cliente final</strong>: dirijan a los clientes a la web <a>www.jata.es</a> y aquí podrán gestionar la solicitud de recogida en el apartado servicio técnico o pueden llamar al 848640234. También puede dirigirlos a un SAT asociado si hay alguno cerca de su tienda. Puede encontrar el listado actualizado de SAT asociados en <a>www.jata.es</a>.</p><p>le pedirán los detalles de su problema, la referencia y ticket de compra y desde Jata le mandarán una agencia de paquetería a su casa para la recogida del producto. Si se encuentra dentro de los primeros 20 días desde la compra, recibirá en su casa en 24-48 horas un producto nuevo y probado. Si está por encima de los 20 días y hasta los 3 años, le devolveremos en su casa el aparato reparado en garantía, siempre que se cumplan las condiciones, en un plazo aproximado de 10 días. Todo ello sin coste ni molestia para el cliente.</p><p>lean atentamente el documento adjunto \"SAT PROPIO JATA_v230125 (003)</p>"
    // },
    // {
    //     id: "jbl",
    //     name: "JBL",
    //     contacts: [
    //         {
    //             name: "Mike Pascual Hafner",
    //             phone: "663 247 240",
    //             email: "mike.pascual@aqipa.com"
    //         },
    //         {
    //             name: "DEVOLUCIONES",
    //             email: "orders.es@aqipa.com"
    //         }
    //     ],
    //     // downloads: [
    //     //     {
    //     //         name: "Returnguidelines_Aqipa-Iberia_ES_2023-06.pdf",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1740503537_Returnguidelines_Aqipa-Iberia_ES_2023-06.pdf"
    //     //     }
    //     // ],
    //     description: "<p>Se ha de pedir autorización previa a <a href=\"mailto:returns.es@aqipa.com\">returns.es@aqipa.com</a></p><p>&nbsp;</p><p>&nbsp;<em>Las solicitudes deben incluir la siguiente información: </em></p><ul><li>El número de artículo (EAN y/o referencia AQIPA y/o referencia fabricante)</li><li>Los números de serie</li><li>El artículo debe estar dentro del periodo de garantía legal</li><li>La factura de compra del cliente final debe adjuntarse a la solicitud</li><li>Todos los accesorios deben incluirse en la devolución</li><li>Indicaran los datos de recogida (dirección, teléfono, persona de contacto)</li></ul><p>&nbsp;</p><p><strong>Indiquen que se recoge por RAPITECNIC.</strong></p><p><strong>&nbsp;</strong></p><p>Después graben devolución por portal,&nbsp;<u>adjunten la autorización</u>, y se la validaremos.</p><p>Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p><strong>IMPRESCINDIBLE</strong> embalajes y accesorios originales y tiquet de venta.</p><p>&nbsp;</p><p><strong>PEGUEN LA AUTORIZACIÓN FUERA DEL PRODUCTO DEFECTUOSO, GRACIAS</strong>.</p><p>&nbsp;</p><p>LEAN ATENTAMENTE EL DOCUMENTO ADJUNTO; Returnguidelines_Aqipa-Iberia_ES_2023-06</p><p>Se recomienda que el cliente final se ponga en contacto directamente con el servicio de asistencia de la marca para garantizar una tramitación más rápida: <a>https://support.jbl.com/es/es/contac.html</a></p><p>#AQIPA</p>"
    // },
    {
        id: "jura",
        name: "JURA",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/JURA/jura.png",
        contacts: [
            {
                name: "SAT / Servicio de Atención al Cliente",
                phone: "902 024 238 / 910 77 11 77 / 935 687 200",
                email: "atencioncliente@es.jura.com"
            }
        ],
        description: "<p style=\"text-align: justify;\"><span style=\"text-align: left;\">Se tramita directamente con el proveedor.</span></p><p style=\"text-align: justify;\"><span style=\"text-align: left;\">Enviar email solicitando Orden de Servicio y JURA les dará las instrucciones para gestionar la garantía o devolución.</span></p><p style=\"text-align: justify;\"><span style=\"text-align: left;\">JURA recoge con sus medios, repara y devuelve en tienda.&nbsp;El coste del transporte es gratuito en periodo de garantía; si no lo estuviera, son 35€ (IVA incl.)</span></p><p style=\"text-align: justify;\"><span style=\"text-align: left;\">Este servicio solo está disponible para Península.<br>Para servicios en Baleares, Canarias y Portugal, por favor contacte con nuestro Servicio de Atención al Cliente.<br><br></span><b>Importante</b>: para evitar daños durante el transporte, rogamos vacíe el depósito de agua y la bandeja de recogida de posos de café. De no cumplirse esta condición, JURA no puede responsabilizarse de los posibles daños ocasionados durante el transporte.</p>"
    },
    {
        id: "jvc",
        name: "JVC",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/JVC/jvc.png",
        contacts: [
            {
                name: "Víctor Lebrón",
                phone: "634 271 984",
                email: "lebron@vestel.es"
            },
            {
                name: "SAT",
                phone: "902.050.407 - 914.872.814",
                email: "expediciones@hiperservice.com"
            }
        ],
        // downloads: [
        //     {
        //         name: "RMA_Devoluciones_JVC_1-9-16_PROCEDIMIENTO.doc",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740261472_RMA_Devoluciones_JVC_1-9-16_PROCEDIMIENTO.doc"
        //     },
        //     {
        //         name: "extension_garantia_JVC.pdf",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740261472_extension_garantia_JVC.pdf"
        //     }
        // ],
        // description: "<p>Se tramita directamente con el SAT.</p><p>Ellos proporcionan la información necesaria para el traslado o reparación dependiendo de la necesidad.</p><p>También pueden contactar a través de POST VENTA Sra. Silvia Anibaldi; 913.206.398</p>"
    },
    {
        id: "karcher",
        name: "KARCHER",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/KARCHER/karcher.png",
        contacts: [
            {
                name: "BARCELONA CAPITAL: Sr Pablo Segovia",
                phone: "677.881.805"
            },
            {
                name: "CATALUÑA: Sr Gustavo Segovia",
                phone: "626.917.275"
            },
            {
                name: "LLEIDA: Sr Xavier Vera",
                phone: "629.281.069"
            },
            {
                name: "TARRAGONA: Sr Marcos Benítez",
                phone: "676.126.886"
            },
            {
                name: "GIRONA: Sr Tony López",
                phone: "658.933.263"
            },
            {
                name: "SAT",
                phone: "902.170.068"
            },
            {
                name: "ATENCIÓN AL CLIENTE",
                email: "ml-es10-atencion.cliente@karcher.com"
            },
            {
                name: "Jaume Monclús / COMERCIAL",
                phone: "636 653 969",
                email: "jaimemonclus@gmail.com"
            }
        ],
        description: "Se tramita directamente con el SAT"
    },
    // {
    //     id: "kenwood-pae",
    //     name: "KENWOOD PAE",
    //     contacts: [
    //         {
    //             name: "Joan Roger",
    //             phone: "646 537 167",
    //             email: "joan.roger@delonghigroup.com"
    //         },
    //         {
    //             name: "SAT",
    //             phone: "936 065 405"
    //         }
    //     ],
    //     websites: [
    //         "https://www.delonghi.com"
    //     ],
    //     description: "<p>Graben devolución por portal, adjunten tiquet de venta a cliente final inferior a 15 dias, y se la validaremos.</p><p>Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p><strong>IMPRESCINDIBLE</strong> embalajes y accesorios originales y tiquet de venta.</p><p>&nbsp;</p><p><strong>PEGUEN EL TIQUET FUERA DEL PRODUCTO DEFECTUOSO, GRACIAS.</strong></p><p>&nbsp;</p><p><u>Pasados los 15 días o&nbsp; no tener los embalajes y accesorios originales</u>, ponerse en contacto con el SAT:&nbsp;</p><p>&nbsp;</p><p><table style=\"width: 569pt;\" border=\"0\" width=\"758\" cellspacing=\"0\" cellpadding=\"0\"><colgroup><col style=\"mso-width-source: userset; mso-width-alt: 6582; width: 135pt;\" width=\"180\"> <col style=\"mso-width-source: userset; mso-width-alt: 21138; width: 434pt;\" width=\"578\"> </colgroup><tbody><tr style=\"height: 15.0pt;\"><td style=\"height: 15.0pt; width: 135pt;\" width=\"180\" height=\"20\">SAT</td><td class=\"xl65\" style=\"width: 434pt;\" width=\"578\">936 065 405</td></tr><tr style=\"height: 15.0pt;\"><td style=\"height: 15.0pt;\" height=\"20\">RED SERVICIOS TÉCNICOS</td><td class=\"xl66\"><a href=\"https://www.delonghi.com/es-es/authorised-service-centre\">https://www.delonghi.com/es-es/authorised-service-centre</a></td></tr></tbody></table></p>"
    // },
    {
        id: "kingston",
        name: "KINGSTON",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/KINGSTON/kingston.png",
        websites: [
            "https://app.idiomund.com/login-rma"
        ],
        // description: "<p>Toda solicitud devolución la tienen que solicitar a través de:</p><p><a href=\"https://app.idiomund.com/login-rma\">https://app.idiomund.com/login-rma</a></p><p>&nbsp;</p><p>para solicitar la reparación o devolucion de su producto adquirido a través nuestro, lo tienen que gestionar por el panel de post Venta.</p>"
    },
    {
        id: "krups",
        name: "KRUPS",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/KRUPS/krups.png",
        contacts: [
            {
                name: "JORGE DEL OJO",
                phone: "670.744.328",
                email: "jdelojo@groupeseb.com"
            },
            {
                name: "DUNIA MARTÍNEZ - stocks y disponibilidad",
                email: "dmartinezt@groupeseb.com"
            }
        ],
        // downloads: [
        //     {
        //         name: "SATs_GrpSEB_2023.xlsx",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740503253_SATs_GrpSEB_2023.xlsx"
        //     }
        // ],
    },
    {
        id: "ksix",
        name: "KSIX",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/KSIX/ksix.png",
        contacts: [
            {
                name: "SAT",
                phone: "93.336.97.97",
                email: "sat@atlantistelecom.com"
            }
        ],
        // downloads: [
        //     {
        //         name: "Postventa_FITNESS_ATLANTIS.pdf",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1741097825_Postventa_FITNESS_ATLANTIS.pdf"
        //     }
        // ],
        // description: "<p>Graben devolución por portal, adjunten tiquet de venta a cliente final inferior a 15 dias, y se la validaremos. Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p><strong>IMPRESCINDIBLE </strong>embalajes y accesorios originales y tiquet de venta.</p><p>indicar también el motivo de la devolución y el número de serie, se requerirán fotos de los embalajes.</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>Para&nbsp;<strong>REPARACIONES</strong>, se tramita directamente con el SAT de ATLANTIS</p>"
    },
    {
        id: "kuken",
        name: "KÜKEN",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/KÜKEN/kuken.png",
        contacts: [
            {
                name: "Alejandro Gómez",
                phone: "937 831 011",
                email: "alejandrogomez@alfadyser.es"
            }
        ],
        // description: "<p>Graben devolución por portal. Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p><strong>IMPRESCINDIBLE</strong>&nbsp;embalajes y accesorios originales</p><p>&nbsp;</p><p>#KUKEN</p><p>&nbsp;</p>"
    },
    // {
    //     id: "leifheit",
    //     name: "LEIFHEIT",
    //     contacts: [
    //         {
    //             name: "Ignacio de la Órden",
    //             phone: "607 53 95 11"
    //         }
    //     ],
    //     description: "<p>Graben devolución por portal. Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p><strong>IMPRESCINDIBLE</strong>&nbsp;embalajes y accesorios originales</p><p>&nbsp;</p><p style=\"color: #464e5f; font-family: gbregular;\">otras marcas:&nbsp;<a class=\"sat-value-search d-flex align-items-center text-dark text-hover-primary font-size-h5 font-weight-bold mr-3\" style=\"background-color: #ffffff; transition: color 0.15s ease 0s, background-color 0.15s ease 0s, border-color 0.15s ease 0s, box-shadow 0.15s ease 0s; font-family: gmregular; color: #212121 !important; margin-right: 0.75rem !important; font-weight: 500 !important; font-size: 1.25rem !important; display: inline !important;\" href=\"https://ventas.candelsa.com/comercial/sats\">SOEHNLE</a></p>"
    // },
    // {
    //     id: "lemco",
    //     name: "LEMCO",
    //     description: "<p>Graben devolución por portal. Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p><strong>IMPRESCINDIBLE</strong>&nbsp;embalajes y accesorios originales</p>"
    // },
    {
        id: "lenovo",
        name: "LENOVO",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/LENOVO/lenovo.png",
        contacts: [
            {
                name: "SAT",
                phone: "917911799"
            }
        ],
        // description: "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"420\" style=\"width: 315pt;\"><colgroup><col width=\"420\" style=\"mso-width-source:userset;mso-width-alt:15360;width:315pt\"></colgroup><tbody><tr height=\"20\" style=\"height:15.0pt\"><td height=\"20\" class=\"xl64\" width=\"420\" style=\"height:15.0pt;width:315pt\">CONSULTAR CON SU GESTORA</td></tr><tr height=\"20\" style=\"height:15.0pt\"><td height=\"20\" class=\"xl64\" style=\"height:15.0pt;border-top:none\">&nbsp;</td></tr><tr height=\"21\" style=\"height:15.75pt\"><td height=\"21\" class=\"xl65\" style=\"height:15.75pt;border-top:none\"><p>pedir autorización según proveedor</p><p><br></p><p>#DMI</p></td></tr></tbody></table>"
    },
    // {
    //     id: "leotec",
    //     name: "LEOTEC",
    //     contacts: [
    //         {
    //             name: "SAT",
    //             phone: "932676600",
    //             email: "soporte@leotec.com"
    //         }
    //     ],
    //     description: "<p>Para devoluciones DOA (dentro de los 15 dias de la compra), póngase en contacto con su gestora y le indicará como gestionarlo, gracias.</p><p><br></p><p>#DMI</p>"
    // },
    // {
    //     id: "lg-blanca",
    //     name: "LG BLANCA",
    //     contacts: [
    //         {
    //             name: "Franc Blanco (GAMA BLANCA Y PAE)",
    //             email: "franc.blanco@lge.com"
    //         },
    //         {
    //             name: "Atención al cliente/sat:",
    //             phone: "963050500",
    //             email: "asistenciatecnica@lge.com"
    //         },
    //         {
    //             name: "Devoluciones:",
    //             phone: "917197171",
    //             email: "devoluciones@lge.com"
    //         },
    //         {
    //             name: "Stocks:",
    //             phone: "912112690"
    //         }
    //     ],
    //     // downloads: [
    //     //     {
    //     //         name: "Nuevo_Proceso_Devoluciones_BG_(31-7-21).pdf",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1740501740_Nuevo_Proceso_Devoluciones_BG_(31-7-21).pdf"
    //     //     },
    //     //     {
    //     //         name: "Plantilla_BG_Solicitud_devolucion_NUEVA.XLSX",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1740501740_Plantilla_BG_Solicitud_devolucion_NUEVA.XLSX"
    //     //     }
    //     // ],
    //     description: "<p>Para que el proceso sea eficiente, deben seguir rigurosamente las instrucciones que se indican:</p><p>1- En el Asunto del mail indicar : Solicitud devolución Modelo, S/N del equipo e ID de la tienda <br>2- Adjuntar fotografías que se indican en la presentación adjunta <br>3- Adjuntar plantilla con todos las celdas Naranjas cumplimentadas. Una vez cumplimentados todos los datos, aparece un cuadro en verde con el texto que debe poner en el Asunto del mail.</p><p>ENVIAR MAIL A :</p><p>PRODUCTO NUEVO : <a href=\"mailto:dev.nuevo1@lge.com;dev.nuevo2@lge.com;\" target=\"_blank\" rel=\"noopener\">dev.nuevo1@lge.com; dev.nuevo2@lge.com</a></p><p>PRODUCTO DEFECTUOSO: <a href=\"mailto:devoluciones@lge.com\" target=\"_blank\" rel=\"noopener\">devoluciones@lge.com</a></p><p>&nbsp;</p><p>#LG</p>"
    // },
    // {
    //     id: "lg-informatica",
    //     name: "LG INFORMÁTICA",
    //     contacts: [
    //         {
    //             name: "Atención al cliente/sat:",
    //             phone: "963050500",
    //             email: "asistenciatecnica@lge.com"
    //         },
    //         {
    //             name: "Devoluciones:",
    //             phone: "917197171",
    //             email: "devoluciones@lge.com"
    //         },
    //         {
    //             name: "Stocks:",
    //             phone: "912112690"
    //         }
    //     ],
    //     // downloads: [
    //     //     {
    //     //         name: "Nuevo_Proceso_Devoluciones_BG_(31-7-21).pdf",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1740501690_Nuevo_Proceso_Devoluciones_BG_(31-7-21).pdf"
    //     //     },
    //     //     {
    //     //         name: "Actualizacion_Plantilla_BG_Solicitud_devolucion__v.170622.XLSX",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1740501690_Actualizacion_Plantilla_BG_Solicitud_devolucion__v.170622.XLSX"
    //     //     }
    //     // ],
    //     description: "<p>Para que el proceso sea eficiente, deben seguir rigurosamente las instrucciones que se indican:</p><p>1- En el Asunto del mail indicar : Solicitud devolución Modelo, S/N del equipo e ID de la tienda<br>2- Adjuntar fotografías que se indican en la presentación adjunta<br>3- Adjuntar plantilla con todos las celdas Naranjas cumplimentadas. Una vez cumplimentados todos los datos, aparece un cuadro en verde con el texto que debe poner en el Asunto del mail.</p><p>ENVIAR MAIL A :</p><p>PRODUCTO NUEVO :&nbsp;<a href=\"mailto:dev.nuevo1@lge.com;dev.nuevo2@lge.com;\" target=\"_blank\" rel=\"noopener\">dev.nuevo1@lge.com; dev.nuevo2@lge.com</a></p><p>PRODUCTO DEFECTUOSO:&nbsp;<a href=\"mailto:devoluciones@lge.com\" target=\"_blank\" rel=\"noopener\">devoluciones@lge.com</a></p><p>&nbsp;</p><p>#LG</p>"
    // },
    {
        id: "lg-marron",
        name: "LG MARRÓN",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/LG/lg.png",
        contacts: [
            {
                name: "DAVID GARCÍA (GAMA MARRÓN)",
                email: "david01.garcia@lge.com"
            },
            {
                name: "Atención al cliente/sat:",
                phone: "963050500",
                email: "asistenciatecnica@lge.com"
            },
            {
                name: "Devoluciones:",
                email: "dev.nuevo2@lge.com"
            },
            {
                name: "Stocks:",
                phone: "912112690"
            }
        ],
        websites: [
            "www.lg.com/es"
        ],
        // downloads: [
        //     {
        //         name: "Nuevo_Proceso_Devoluciones_BG_(31-7-21).pdf",
        //         url: "/src/assets/downloads/Nuevo_Proceso_Devoluciones_BG_(31-7-21).pdf"
        //     },
        //     {
        //         name: "Plantilla_BG_Solicitud_devolucion_NUEVA.XLSX",
        //         url: "/src/assets/downloads/Plantilla_BG_Solicitud_devolucion_NUEVA.XLSX"
        //     },
        //     {
        //         name: "Solicitud_Reacondicionamiento_-_20240103_LGE.xlsm",
        //         url: "/src/assets/downloads/Solicitud_Reacondicionamiento_-_20240103_LGE.xlsm"
        //     }
        // ],
        // description: "<p>Para iniciar cualquier consulta o reclamación, envíen platilla \"Solicitud Reacondicionamiento\"  y LG les indicarán los procesos a seguir.</p><p>Para que el proceso sea eficiente, deben seguir rigurosamente las instrucciones que se indican:</p><p>1- En el Asunto del mail indicar : Solicitud devolución Modelo, S/N del equipo e ID de la tienda<br>2- Adjuntar fotografías que se indican en la presentación adjunta <br>3- Adjuntar plantilla con todos las celdas Naranjas cumplimentadas. Una vez cumplimentados todos los datos, aparece un cuadro en verde con el texto que debe poner en el Asunto del mail.</p><p>ENVIAR MAIL A :</p><p>PRODUCTO NUEVO :&nbsp;<a href=\"mailto:dev.nuevo1@lge.com;dev.nuevo2@lge.com;\" target=\"_blank\" rel=\"noopener\">dev.nuevo2@lge.com</a></p><p>PRODUCTO DEFECTUOSO: <a href=\"mailto:devoluciones@lge.com\" target=\"_blank\" rel=\"noopener\">devoluciones@lge.com</a></p><p><span style=\"font-size: 10pt; font-family: 'Segoe UI', sans-serif;\">Solicitar ( ejemplo : tornillos que faltan, un mando etc... ):&nbsp;</span><a style=\"font-family: 'Segoe UI', sans-serif; font-size: 10pt; background-color: #ffffff;\" href=\"mailto:escid@lge.com\">escid@lge.com</a></p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>#LG</p><p>&nbsp;</p>"
    },
    {
        id: "liebherr",
        name: "LIEBHERR",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/LIEBHERR/liebherr.png",
        contacts: [
            {
                name: "MARTA QUESADA",
                email: "Marta.Quesada@liebherr.com"
            },
            {
                name: "SAT",
                phone: "949363136"
            }
        ],
        websites: [
            "Servicio al cliente para usted: Póngase en contacto con nosotros | Liebherr-Hausgeräte"
        ],
        // description: "<p><strong>Se gestiona directamente con proveedor.</strong></p><p>Para producto golpeado contactar con comercial <a href=\"mailto:marta.quesada@liebherr.com\">marta.quesada@liebherr.com</a> quien procederá a evaluar el golpe y&nbsp; ofrecer depreciación económica al usuario,&nbsp; &nbsp;+ garantía ampliada.</p><p>Para producto en Garantía y fuera de garantía hay que llamar al SAT (Call Center) 949363136 o bien rellenar el formulario &nbsp;<a href=\"https://www.liebherr.com/es-es/refrigeradores-congeladores/servicio-al-cliente-3226034\">Servicio al cliente para usted: Póngase en contacto con nosotros | Liebherr-Hausgeräte.&nbsp;</a></p><p>La Puesta en marcha esta incluida en máquinas con Conexión a Red . Para ello se debe llamar al SAT al&nbsp; tel. 949363136 o bien rellenando su formulario web&nbsp; <a href=\"https://www.liebherr.com/es-es/refrigeradores-congeladores/servicio-al-cliente-3226034\">Servicio al cliente para usted: Póngase en contacto con nosotros | Liebherr-Hausgeräte</a>.&nbsp; Mismo procedimiento para solicitar cualquier recambio..</p><p>Si el SAT concluye que en Garantía una máquina es \"irreparable\", este se encargará directamente de realizar el cambio al usuario.</p><p>Para registrar los 10 años de garantía Total ofrecida por el fabricante realizarlo en &nbsp;<a href=\"https://www.liebherr.com/es-es/refrigeradores-congeladores/garant%C3%ADa-liebherr-10-a%C3%B1os-4943585\">10&nbsp;años de garantía Liebherr | Liebherr Hausgeräte - Liebherr</a></p>"
    },
    {
        id: "logitech",
        name: "LOGITECH",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/LOGITECH/logitech.png",
        // description: "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"420\" style=\"width: 315pt;\"><tbody><tr height=\"20\" style=\"height:15.0pt\"><td height=\"20\" class=\"xl64\" width=\"420\" style=\"height:15.0pt;width:315pt\"><p>CONSULTAR CON SU GESTORA</p><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"420\" style=\"width: 315pt;\"><tbody><tr height=\"21\" style=\"height:15.75pt\"><td height=\"21\" class=\"xl65\" width=\"420\" style=\"height:15.75pt;width:315pt\">pedir autorización según proveedor</td></tr></tbody></table></td></tr></tbody></table>"
    },
    {
        id: "mac-apple",
        name: "MAC APPLE",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/PHILIPS/philips.png",
        // downloads: [
        //     {
        //         name: "Servicio_Tecnico_-_Mac_-_Procedimiento.pdf",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740258480_Servicio_Tecnico_-_Mac_-_Procedimiento.pdf"
        //     }
        // ],
        // description: "<p>Ver procedimiento adjunto</p>"
    },
    // {
    //     id: "maillon",
    //     name: "MAILLON",
    //     description: "<p>Graben devolución por portal. Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p><strong>IMPRESCINDIBLE</strong>&nbsp;embalajes y accesorios originales</p>"
    // },
    {
        id: "marshall",
        name: "MARSHALL",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/MARSHALL/logo-marshall.png",
        contacts: [
            {
                name: "SAT",
                email: "returns.es@aqipa.com"
            }
        ],
        // downloads: [
        //     {
        //         name: "Returnguidelines_Aqipa-Iberia_ES_2023-06.pdf",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740503558_Returnguidelines_Aqipa-Iberia_ES_2023-06.pdf"
        //     }
        // ],
        // description: "<div>Se ha de pedir autorización previa a <a href=\"mailto:returns.es@aqipa.com\">returns.es@aqipa.com</a></div><div><p>&nbsp;</p><p>&nbsp;<em>Las solicitudes deben incluir la siguiente información: </em></p><ul><li>El número de artículo (EAN y/o referencia AQIPA y/o referencia fabricante)</li><li>Los números de serie</li><li>El artículo debe estar dentro del periodo de garantía legal</li><li>La factura de compra del cliente final debe adjuntarse a la solicitud</li><li>Todos los accesorios deben incluirse en la devolución</li><li>Indicaran los datos de recogida (dirección, teléfono, persona de contacto)</li></ul><p>&nbsp;</p><p><strong>Indiquen que se recoge por RAPITECNIC.</strong></p><p><strong>&nbsp;</strong></p><p>Después graben devolución por portal,&nbsp;<u>adjunten la autorización</u>, y se la validaremos.</p><p>Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p><strong>IMPRESCINDIBLE</strong> embalajes y accesorios originales y tiquet de venta.</p><p>&nbsp;</p><p><strong>PEGUEN LA AUTORIZACIÓN FUERA DEL PRODUCTO DEFECTUOSO, GRACIAS</strong>.</p><p>&nbsp;</p><p>LEAN ATENTAMENTE EL DOCUMENTO ADJUNTO; Returnguidelines_Aqipa-Iberia_ES_2023-06</p></div><div>&nbsp;</div><div>Se recomienda que el cliente final se ponga en contacto directamente con el servicio de asistencia de la marca para garantizar una tramitación más rápida: <a href=\"http://support@marshallheadphones.com\" target=\"_blank\" rel=\"noopener\">support@marshallheadphones.com</a></div><div>&nbsp;</div><div>#AQIPA</div>"
    },
    // {
    //     id: "medion",
    //     name: "MEDION",
    //     websites: [
    //         "https://medion.enametech.com/#/ES"
    //     ],
    //     description: "<p>Se gestiona directamente con fabricante:</p><p><br></p><p class=\"MsoNormal\">Enlace reparaciones:&nbsp; <a href=\"https://medion.enametech.com/#/ES\">https://medion.enametech.com/#/ES</a><u5:p></u5:p><o:p></o:p></p><p class=\"MsoNormal\">Formulario gestión DOA: <a href=\"https://medion-doa.enametech.com/#/ES\" style=\"background-color: rgb(255, 255, 255);\">https://medion-doa.enametech.com/#/ES</a></p><p class=\"MsoNormal\"><o:p></o:p></p>"
    // },
    {
        id: "meireles",
        name: "MEIRELES",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/MEIRELES/meireles.png",
        contacts: [
            {
                name: "Sr. David Rojas",
                phone: "667.420.903",
                email: "david@representacionesrojas.com"
            }
        ],
        websites: [
            "http://www.meireles.pt/pt/servicos.29/pedidos-de-at.84.html"
        ],
        // downloads: [
        //     {
        //         name: "formulario_devolución_Meireles_España.xlsx",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740502637_formulario_devolución_Meireles_España.xlsx"
        //     }
        // ],
        // description: "<p>Cualquier problema de Asistencia Técnica, deben de registrar su solicitud de reparación a través de la Web, <strong>rellenando y adjuntando el formulario</strong>.</p><p>Recibirán inmediatamente un correo de confirmación con los datos de la solicitud.</p><p>Después del registro en el sistema informático, recibirán un segundo correo con la información detallada de la notificación y asignación del SAT de la zona.</p><p>En caso de cualquier duda adicional, pueden contactar a través del teléfono 91.137.86.70. o por mail a pedidos.madrid@meireles.pt</p>"
    },
    {
        id: "minimoka",
        name: "MINIMOKA",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/MINIMOKA/minimoka.png",
        description: "<p>Graben devolución por portal. Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p><strong>IMPRESCINDIBLE</strong>&nbsp;embalajes y accesorios originales</p>"
    },
    {
        id: "mitsubishi-aire",
        name: "MITSUBISHI AIRE",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/MITSUBISHI AIRE/mitsubishi-aire.png",
        contacts: [
            {
                name: "María Reverte",
                phone: "638 097 554",
                email: "maria.reverte@sp.mee.com"
            },
            {
                name: "SAT",
                phone: "900 266 745",
                email: "asistencia.ac@sp.mee.com"
            },
            {
                name: "CHATBOT TÉCNICO (whatsapp)",
                phone: "649 259 253"
            },
            {
                name: "ATENCIÓN AL CLIENTE",
                phone: "900 266 744"
            }
        ],
        // downloads: [
        //     {
        //         name: "Solicitud_de_intervencion.pdf",
        //         url: "/src/assets/downloads/Solicitud_de_intervencion.pdf"
        //     }
        // ],
        // description: "<div>Se tramita directamente con el proveedor.</div><div>&nbsp;</div><div>En caso de necesitar asistencia técnica, rellenar documento adjunto y enviar a <a href=\"http://asistencia.ac@sp.mee.com\" target=\"_blank\" rel=\"noopener\">asistencia.ac@sp.mee.com</a> con copia al comercial.</div>"
    },
    {
        id: "monix",
        name: "MONIX",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/MONIX/monix.jpg",
        phones: [
            "9776008810"
        ],
        // description: "<p>Graben devolución por portal. Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p><strong>IMPRESCINDIBLE</strong>&nbsp;embalajes y accesorios originales</p>"
    },
    // {
    //     id: "motorola",
    //     name: "MOTOROLA",
    //     contacts: [
    //         {
    //             name: "PILAR RODRIGUEZ (VINZEO)",
    //             email: "pilar.rodriguez@vinzeo.com"
    //         },
    //         {
    //             name: "SAT",
    //             email: "incidencias.vinzeo@vinzeo.com"
    //         }
    // },
    {
        id: "moulinex",
        name: "MOULINEX",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/MOULINEX/moulinex.png",
        contacts: [
            {
                name: "JORGE DEL OJO",
                phone: "670.744.328",
                email: "jdelojo@groupeseb.com"
            },
            {
                name: "DUNIA MARTÍNEZ - stocks y disponibilidad",
                email: "dmartinezt@groupeseb.com"
            }
        ],
        // downloads: [
        //     {
        //         name: "SATs_GrpSEB_2023.xlsx",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740503301_SATs_GrpSEB_2023.xlsx"
        //     }
        // ],
    },
    {
        id: "muse",
        name: "MUSE",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/MUSE/muse.png",
        contacts: [
            {
                name: "Emilio López",
                phone: "646486310",
                email: "elopez@maygap.com"
            }
        ],
        // description: "<p>Enviar email a comercial para solicitar devolución indicando modelo y fecha de venta</p><p>Si está en garantía y procede la devolución, proveedor recogerá el defectuoso y lo sustituirá directamente en tienda.</p><p><br></p>"
    },
    // {
    //     id: "myo",
    //     name: "MYO",
    //     contacts: [
    //         {
    //             email: "comercialaro@gmail.com"
    //         }
    //     ],
    // description: "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"432\" style=\"width: 324pt;\"><colgroup><col width=\"432\" style=\"mso-width-source:userset;mso-width-alt:15360;width:324pt\"></colgroup><tbody><tr height=\"20\" style=\"height:15.0pt\"><td height=\"20\" class=\"xl64\" width=\"432\" style=\"height:15.0pt;width:324pt\">Se tramita directamente con el proveedor.</td></tr><tr height=\"19\" style=\"height:14.4pt\"><td height=\"19\" class=\"xl64\" style=\"height:14.4pt;border-top:none\">Enviar un email pidiendo reposición.</td></tr></tbody></table>"
    // },
    // {
    //     id: "nasa",
    //     name: "NASA",
    //     contacts: [
    //         {
    //             name: "Max Yataco Portilla",
    //             email: "Max.Yataco@esprinet.com"
    //         }
    //     ],
    //     description: "<p class=\"MsoNormal\"><span style=\"font-size: 10.0pt; mso-fareast-font-family: 'Times New Roman'; mso-fareast-language: ES;\">Se ha de pedir autorización previa&nbsp;<strong><u>siempre</u></strong> a </span><a href=\"mailto:Max.Yataco@esprinet.com\">Max.Yataco@esprinet.com</a></p><p class=\"MsoNormal\"><span style=\"font-size: 13.3333px;\">i</span>ndicando lo siguiente:</p><ul style=\"margin-top: 0cm;\" type=\"disc\"><li class=\"MsoListParagraph\" style=\"margin-left: 0cm; mso-list: l0 level1 lfo1;\">Grupo de compra</li><li class=\"MsoListParagraph\" style=\"margin-left: 0cm; mso-list: l0 level1 lfo1;\">EAN y referencia</li><li class=\"MsoListParagraph\" style=\"margin-left: 0cm; mso-list: l0 level1 lfo1;\">Nº de serie</li><li class=\"MsoListParagraph\" style=\"margin-left: 0cm; mso-list: l0 level1 lfo1;\">Factura / ticket&nbsp;</li><li class=\"MsoListParagraph\" style=\"margin-left: 0cm; mso-list: l0 level1 lfo1;\">Motivo de la devolución</li></ul><p class=\"MsoNormal\">&nbsp;</p><p>Después graben devolución por portal,&nbsp;<u>adjunten la autorización</u>, y se la validaremos.</p><p>Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p><strong>IMPRESCINDIBLE</strong> embalajes y accesorios originales</p><p>&nbsp;</p><p><strong>PEGUEN LA AUTORIZACIÓN FUERA DEL PRODUCTO DEFECTUOSO, GRACIAS.</strong></p><p>&nbsp;</p><p class=\"MsoNormal\"><span style=\"font-size: 10.0pt; mso-fareast-font-family: 'Times New Roman'; mso-fareast-language: ES;\">otras marcas:&nbsp;</span><span style=\"font-size: 13.3333px;\">SPARCO, NILOX</span></p>"
    // },
    // {
    //     id: "neckar",
    //     name: "NECKAR",
    //     contacts: [
    //         {
    //             name: "INFORMACIÓN GENERAL USUARIO FINAL",
    //             phone: "91 175 90 92"
    //         },
    //         {
    //             name: "CALL CENTER TÉCNICO",
    //             phone: "902 41 00 14"
    //         },
    //         {
    //             name: "CALL CENTER GARANTIAS BOSCH",
    //             phone: "91 175 90 92"
    //         },
    //         {
    //             name: "CALL CENTER COMERCIAL",
    //             phone: "902 99 92 19"
    //         },
    //         {
    //             name: "AVISO AVERIAS",
    //             phone: "91 175 90 92"
    //         },
    //         {
    //             name: "PEDRO FERRER",
    //             phone: "629 97 25 41",
    //             email: "PEDRO.FERRER@es.bosch.com"
    //         }
    //     ],
    //     description: "<table style=\"color: #464e5f; font-family: gbregular; width: 324pt;\" border=\"0\" width=\"432\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr style=\"height: 15pt;\"><td class=\"xl64\" style=\"height: 15pt; width: 324pt;\" width=\"432\" height=\"20\"><p>Se tramita directamente con el proveedor.</p></td></tr></tbody></table><p style=\"color: #464e5f; font-family: gbregular;\">&nbsp;</p><p style=\"color: #464e5f; font-family: gbregular;\">&nbsp;</p><p style=\"color: #464e5f; font-family: gbregular;\">** Listado de Teléfonos Directos de servicios técnicos por zona geográfica:&nbsp;</p><p class=\"MsoNormal\" style=\"color: #464e5f; font-family: gbregular;\">SETESA BARCELONA&nbsp;&nbsp; 93 357 16 00</p><p class=\"MsoNormal\" style=\"color: #464e5f; font-family: gbregular;\">SETESA VALLÈS, MARESME I BARCELONÈS NORD&nbsp; 93 720 89 10</p><p class=\"MsoNormal\" style=\"color: #464e5f; font-family: gbregular;\">SETESA BAIX LLOBREGAT 93 680 76 00&nbsp;</p><p class=\"MsoNormal\" style=\"color: #464e5f; font-family: gbregular;\">SAMADHI VIERKA TARRAGONA&nbsp; 902 409 499&nbsp;</p><p class=\"MsoNormal\" style=\"color: #464e5f; font-family: gbregular;\">GIRONA PARERA TÈCNICS&nbsp; 972 &nbsp;21 57 62&nbsp;</p><p class=\"MsoNormal\" style=\"color: #464e5f; font-family: gbregular;\">LLEIDA SAT JUNKERS BOSCH&nbsp;&nbsp; 973 27 06 11&nbsp;</p><p class=\"MsoNormal\" style=\"color: #464e5f; font-family: gbregular;\">SAT SERVEI GARRAF&nbsp; CORBALAN&nbsp;&nbsp; 666 513 090&nbsp;</p><p class=\"MsoNormal\" style=\"color: #464e5f; font-family: gbregular;\">SAT ALT PENEDÈS INDOIN&nbsp; 93 770 30 59</p><p class=\"MsoNormal\" style=\"color: #464e5f; font-family: gbregular;\">SAT CERDANYA&nbsp;&nbsp; 972 881 147</p>"
    // },
    {
        id: "nilox",
        name: "NILOX",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/NILOX/nilox.jpeg",
        contacts: [
            {
                name: "Max Yataco Portilla",
                email: "Max.Yataco@esprinet.com"
            }
        ],
        // description: "<p style=\"font-weight: 400;\">Se ha de pedir autorización previa&nbsp;<strong style=\"font-weight: 600;\"><u>siempre</u></strong>&nbsp;a&nbsp;<a href=\"mailto:Max.Yataco@esprinet.com\">Max.Yataco@esprinet.com</a></p><p style=\"font-weight: 400;\">indicando lo siguiente:</p><ul style=\"font-weight: 400;\"><li>Grupo de compra</li><li>EAN y referencia</li><li>Nº de serie</li><li>Factura / ticket&nbsp;</li><li>Motivo de la devolución</li></ul><p style=\"font-weight: 400;\">&nbsp;</p><p style=\"font-weight: 400;\">Después graben devolución por portal,&nbsp;<u>adjunten la autorización</u>, y se la validaremos.</p><p style=\"font-weight: 400;\">Les recogerá RAPITECNIC con nuestra RMA.</p><p style=\"font-weight: 400;\">&nbsp;</p><p style=\"font-weight: 400;\"><strong style=\"font-weight: 600;\">IMPRESCINDIBLE</strong>&nbsp;embalajes y accesorios originales</p><p style=\"font-weight: 400;\">&nbsp;</p><p style=\"font-weight: 400;\"><strong style=\"font-weight: 600;\">PEGUEN LA AUTORIZACIÓN FUERA DEL PRODUCTO DEFECTUOSO, GRACIAS.</strong></p><p><span style=\"font-family: Aptos, sans-serif;\"><span style=\"font-size: 13.3333px;\">otras marcas:&nbsp;SPARCO, NASA</span></span></p>"
    },
    // {
    //     id: "ninja",
    //     name: "NINJA",
    //     contacts: [
    //         {
    //             name: "Joaquín Macho",
    //             phone: "649483332",
    //             email: "joaquin@machogarcia.es"
    //         },
    //         {
    //             name: "Miguel Angel Macho Garcia (Delegado comercial Cataluña , Baleares y Aragón))",
    //             phone: "630388947",
    //             email: "miguel.macho@telefonica.net"
    //         },
    //         {
    //             name: "Juan Carlos Macho Garcia (Delegado comercial Cataluña , Baleares y Aragón))",
    //             phone: "649304606",
    //             email: "jcmacho@telefonica.net"
    //         },
    //         {
    //             name: "Merche Cavia ( Delegada resto de España)",
    //             phone: "932013777"
    //         },
    //         {
    //             name: "Atención al cliente",
    //             phone: "93 262 42 68",
    //             email: "sat@riverint.com"
    //         },
    //         {
    //             name: "SAT( Sr David Vera )",
    //             phone: "93 2624268",
    //             email: "sat@riverint.com"
    //         }
    //     ],
    //     description: "<p>&nbsp;</p><p>Se gestiona directamente con proveedor.</p><p><strong><u>POSVENTA .Durante los primeros 15 días</u></strong> solicitar al delegado correspondiente según zona, la autorización para cambio al cliente y su posterior recogida del producto defectuoso en tienda. Una vez recogido de la tienda por proveedor, subir comprobante al portal en \"recogidas directas proveedor \"para su abono.</p><p>Requisitos: ticket de hasta 15 días, embalajes originales y quedando excluido el mal uso.</p><p>&nbsp;</p><p><strong><u>Pasados los 15 días o no tener los embalajes y accesorios originales</u></strong><u>,</u>&nbsp;ponerse en contacto con el SAT al tel. 900-839-453. Para cualquier duda sobre la garantía llamar al teléfono de atención al cliente 93 262 42 68 o por correo a <a href=\"mailto:sat@riverint.com\">sat@riverint.com</a>.</p><p>&nbsp;</p><p><strong><u>PREVENTA. Contactar con su delegado asignado</u></strong>:</p><p>Cataluña, Baleares y Aragón: <a href=\"mailto:jcmacho@telefonica.net\">jcmacho@telefonica.net</a> o <a href=\"mailto:miguel.macho@telefonica.net\">miguel.macho@telefonica.net</a></p><p>Resto zonas:&nbsp; Merche Cavia 932013777</p>"
    // },
    // {
    //     id: "nintendo",
    //     name: "NINTENDO",
    //     contacts: [
    //         {
    //             name: "CÉSAR ARTERO",
    //             phone: "630.906.438",
    //             email: "cesarnintendo@gmail.com"
    //         },
    //         {
    //             name: "SAT/Departamento de Atención al Punto de Venta",
    //             phone: "91 788 64 99",
    //             email: "sap@nintendo.es"
    //         }
    //     ],
    //     // downloads: [
    //     //     {
    //     //         name: "PROCEDIMIENTO_ESPAÑA__NINTENDO_SEPTIEMBRE_2019.pdf",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1740502667_PROCEDIMIENTO_ESPAÑA__NINTENDO_SEPTIEMBRE_2019.pdf"
    //     //     }
    //     // ],
    //     description: "<p>Las devoluciones o garantías las debe tramitar la tienda.</p><p>Lea atentamente el documento \"12_PROCEDIMIENTO ESPAÑA NINTENDO SEPTIEMBRE 2024\" relativo a la gestión de Servicios Técnicos y Adecuaciones de&nbsp;<br>productos Nintendo&nbsp;</p><p>&nbsp;</p>"
    // },
    // {
    //     id: "normende",
    //     name: "NORMENDE",
    //     contacts: [
    //         {
    //             name: "Sr. Manolo Zarco",
    //             email: "mzarcoperez@gmail.com"
    //         },
    //         {
    //             name: "Dpto. Garantías",
    //             email: "taller@engel.es"
    //         }
    //     ],
    //     websites: [
    //         "http://engel.logsantiga.com"
    //     ],
    //     // downloads: [
    //     //     {
    //     //         name: "PLANTILLA.pdf",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1740262537_PLANTILLA.pdf"
    //     //     },
    //     //     {
    //     //         name: "Protocolo_SPV_2017_Engel_Systems[1].pdf",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1740262537_Protocolo_SPV_2017_Engel_Systems[1].pdf"
    //     //     },
    //     //     {
    //     //         name: "Protocolo_SPV_2017_Ersax.pdf",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1740262537_Protocolo_SPV_2017_Ersax.pdf"
    //     //     }
    //     // ],
    //     description: "<p class=\"MsoNormal\"><strong><span style=\"font-size: 10pt;\">MENOS DE 15 DÍAS</span></strong></p><p class=\"MsoNormal\"><span style=\"font-size: 10pt;\">Lo tramita directamente la tienda/socio rellenando la plantilla para solicitud del DOA, con el Dpto. Postventa.</span></p><p class=\"MsoNormal\"><span style=\"font-size: 10pt;\">El producto se recoge directamente en la tienda</span></p><p class=\"MsoNormal\"><strong><span style=\"font-size: 10pt;\">MÁS DE 15 DÍAS</span></strong></p><p class=\"MsoNormal\"><span style=\"font-size: 10pt;\">Solicitar RMA, a través de la WEB</span></p>"
    // },
    // {
    //     id: "nutribullet",
    //     name: "NUTRIBULLET",
    //     contacts: [
    //         {
    //             name: "JOAN ROGER",
    //             phone: "646537167",
    //             email: "joan.roger@delonghigroup.com"
    //         },
    //         {
    //             name: "SAT",
    //             phone: "936 065 405"
    //         }
    //     ],
    //     websites: [
    //         "https://www.delonghi.com"
    //     ],
    //     description: "<div><p>Graben devolución por portal, adjunten tiquet de venta a cliente final inferior a 15 dias, y se la validaremos. Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p><strong>IMPRESCINDIBLE</strong> embalajes y accesorios originales y tiquet de venta.</p><p><strong>PEGUEN EL TIQUET FUERA DEL PRODUCTO DEFECTUOSO, GRACIAS.</strong></p></div><div>&nbsp;</div><div><u>Pasados los 15 días o&nbsp; no tener los embalajes y accesorios originales,</u>&nbsp;ponerse en contacto con el SAT:&nbsp;</div><div>&nbsp;</div><div><table border=\"0\" width=\"758\" cellspacing=\"0\" cellpadding=\"0\"><colgroup><col width=\"180\"><col width=\"578\"></colgroup><tbody><tr><td width=\"180\" height=\"20\">SAT</td><td class=\"xl65\" width=\"578\">936 065 405</td></tr><tr><td height=\"20\">RED SERVICIOS TÉCNICOS</td><td class=\"xl66\"><a href=\"https://www.delonghi.com/es-es/authorised-service-centre\">https://www.delonghi.com/es-es/authorised-service-centre</a></td></tr></tbody></table></div>"
    // },
    {
        id: "olimpia-splendid",
        name: "OLIMPIA SPLENDID",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/OLIMPIA SPLENDID/olimpia-splendid.png",
        contacts: [
            {
                name: "David Rojas Granados",
                phone: "667420903",
                email: "david@representacionesrojas.com"
            },
            {
                name: "servicio post-venta:",
                email: "serviciotecnico@olimpiasplendid.es"
            },
            {
                name: "Bernardo Castro (post-venta)",
                phone: "91 662 21 54 Ext 3",
                email: "b.castro@olimpiasplendid.es"
            }
        ],
        // description: "<p>Ante cualquier problema de funcionamiento, bien la tienda o el cliente final, debe contactar con la central de SPLENDID para comunicar dicho problema.</p><p>Se debe enviar copia de la factura de compra o ticket de compra, para que comprueben fecha en que se realizó la compra: A partir de esta fecha la garantía es de 3 años, tanto desplazamientos, mano de obra o posibles piezas a sustituir</p>"
    },
    {
        id: "one-for-all",
        name: "ONE FOR ALL",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/ONE FOR ALL/one_for_all.png",
        contacts: [
            {
                name: "JULIO MIGUEL DELGADO",
                phone: "619.525.092",
                email: "juldel@uebv.com"
            }
        ],
        // description: "<p>CONSULTE CON SU GESTORA</p><p>&nbsp;</p><p>Envíe un email a su gestora con la referencia, EAN, tiquet de venta a cliente final inferior a 15 dias y motivo de la devolución, gracias.</p><p>Revisaremos si procede abono y destrucción.</p><p>&nbsp;</p><p><strong>Pasados 15 días</strong>, se tramita directamente con el SAT</p>"
    },
    // {
    //     id: "onlex",
    //     name: "ONLEX",
    //     contacts: [
    //         {
    //             name: "Alejandro Gómez",
    //             phone: "937 831 011",
    //             email: "alejandrogomez@alfadyser.es"
    //         }
    //     ],
    //     description: "<div><p>Graben devolución por portal. Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p><strong>IMPRESCINDIBLE</strong>&nbsp;embalajes y accesorios originales</p></div><div>&nbsp;</div>"
    // },
    // {
    //     id: "oppo",
    //     name: "OPPO",
    //     contacts: [
    //         {
    //             name: "Sr. Daniel Pons",
    //             phone: "621.374.426",
    //             email: "daniel.pons@oppo-aed.es"
    //         }
    //     ],
    //     websites: [
    //         "https://anovo.es/empresas/"
    //     ],
    //     // downloads: [
    //     //     {
    //     //         name: "Manual_uso_web_compressed_(2).pdf",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1740258953_Manual_uso_web_compressed_(2).pdf"
    //     //     },
    //     //     {
    //     //         name: "OPPO_Euro_DOA_Process_(Spanish_version)_v1.3.pdf",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1740258953_OPPO_Euro_DOA_Process_(Spanish_version)_v1.3.pdf"
    //     //     }
    //     // ],
    //     description: "<p>Se tramita a través de la WEB de ANOVO ( Es necesario registrarse previamente)</p>"
    // },
    // {
    //     id: "opticum",
    //     name: "OPTICUM",
    //     description: "<p>Graben devolución por portal. Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p><strong>IMPRESCINDIBLE</strong>&nbsp;embalajes y accesorios originales</p><p>&nbsp;</p><p>** Otras marcas: #MINION</p>"
    // },
    // {
    //     id: "ora",
    //     name: "ORA",
    //     contacts: [
    //         {
    //             name: "Sr. Manolo Zarco",
    //             phone: "696.077.691",
    //             email: "mzarcoperez@gmail.com"
    //         },
    //         {
    //             name: "Dpto. Postventa",
    //             email: "sac@ersaxtrade.com"
    //         }
    //     ],
    //     websites: [
    //         "https://www.logsantiga.com/"
    //     ],
    //     // downloads: [
    //     //     {
    //     //         name: "PLANTILLA.pdf",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1740262651_PLANTILLA.pdf"
    //     //     },
    //     //     {
    //     //         name: "Protocolo_SPV_2017_Engel_Systems[1].pdf",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1740262651_Protocolo_SPV_2017_Engel_Systems[1].pdf"
    //     //     },
    //     //     {
    //     //         name: "Protocolo_SPV_2017_Ersax.pdf",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1740262651_Protocolo_SPV_2017_Ersax.pdf"
    //     //     }
    //     // ],
    //     description: "<p><strong>MENOS DE 15 DÍAS</strong></p><p>Lo tramita directamente la tienda/socio rellenando la plantilla para solicitud del DOA, con el Dpto. Postventa</p><p>El producto se recoge directamente en la tienda</p><p><strong>MÁS DE 15 DÍAS</strong></p><p>Solicitar RMA, a través de la WEB</p>"
    // },
    // {
    //     id: "oralb",
    //     name: "ORALB",
    //     contacts: [
    //         {
    //             name: "Pablo Segovia",
    //             phone: "677881805",
    //             email: "pablonic22@live.com"
    //         }
    //     ],
    //     description: "<p>Se ha de pedir autorización previa <strong><u>siempre</u></strong> a delegado/comercial adjuntando tiquet inferior a 15 dias.</p><p>&nbsp;</p><ul><li>Si su valor es inferior a 100€, para su destrucción y abono directo, tendrán que subir dicha autorización como \"recogida directa en tienda\", gracias.</li></ul><p>&nbsp;</p><ul><li>Si su valor es superior a 100€, graben devolución por portal, <u>adjunten autorización</u>, y se la validaremos. Les recogerá RAPITECNIC con nuestra RMA.</li></ul><p>&nbsp;</p><p><span style=\"text-decoration: underline;\"><strong>IMPRESCINDIBLE PEGAR FUERA DE LA CAJA EL TICKET INFERIOR A 15 DIAS</strong></span></p><p><strong>REQUERIDOS</strong>: embalajes y accesorios originales</p><p>&nbsp;</p><p>Listado de delegados/comerciales:</p><p>&nbsp;</p><ul><li>Rapitecnic y ASOCIADOS: Pablo Segovia &nbsp;<a href=\"mailto:pablonic22@live.com\">pablonic22@live.com</a></li><li>Tiendas MIRO: Pablo Segovia <a href=\"mailto:pablonic22@live.com\">pablonic22@live.com</a></li><li>Bazar EL REGALO: Santi Botias <a href=\"mailto:santibserrano@hotmail.com\">santibserrano@hotmail.com</a></li><li>BALEARES: Jose Alcala <a href=\"mailto:jose.alcala.arbona@gmail.com\">jose.alcala.arbona@gmail.com</a></li></ul>"
    // },
    {
        id: "orbegozo",
        name: "ORBEGOZO (SONIFER)",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/ORBEGOZO/orbegozo.png",
        contacts: [
            {
                name: "Mamen Luque Muelas",
                email: "mc.luque@sonifer.es"
            },
            {
                name: "AUTORIZACIONES DEVOLUCIONES",
                email: "recogidas@sonifer.es"
            },
            {
                name: "SAT",
                phone: "968238800"
            }
        ],
        // description: "<p>Graben devolución por portal. Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p><strong>IMPRESCINDIBLE</strong>&nbsp;embalajes y accesorios originales</p><p>&nbsp;</p><p>&nbsp;</p><p>Para reparaciones: llevar al SAT.</p><p>Localice su SAT más cercano en el apartado de post-venta en <a href=\"http://www.logman.es\">www.logman.es</a></p><p>&nbsp;</p>"
    },
    // {
    //     id: "oroley",
    //     name: "OROLEY (CENTREX)",
    //     description: "<p>CONSULTE CON SU GESTORA, la marca ya no se trabaja.</p><p>Envíe un email a su gestora con la referencia, EAN, y factura  de la compra en RAPITECNIC</p>"
    // },
    {
        id: "otsein",
        name: "OTSEIN",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/OTSEIN/otsein.png",
        contacts: [
            {
                name: "Sr. Daniel Rodriguez",
                phone: "662 929 908",
                email: "drodriguez@candy-hoover.es"
            },
            {
                name: "SAT",
                phone: "902 100 150 / 943 914 150",
                email: "service.espana@candy-hoover.com"
            },
            {
                name: "Atención al cliente",
                email: "atencionalcliente@candy-hoover.es"
            }
        ],
        // downloads: [
        //     {
        //         name: "plantilla_daños_CANDY.xlsx",
        //         url: "/src/assets/downloads/plantilla_daños_CANDY.xlsx"
        //     },
        //     {
        //         name: "Política_de_Servicio_-_Haier_Europe_-_Rel_2.2.pdf",
        //         url: "/src/assets/downloads/Política_de_Servicio_-_Haier_Europe_-_Rel_2.2.pdf"
        //     }
        // ],
        // description: "<p>Se gestiona directamente con proveedor. </p><p><strong>&nbsp;</strong></p><p><strong>Producto defectuoso en el momento de la entrega al usuario (DOA)</strong></p><p>En el caso de que en el momento de la instalación o la entrega del bien realizada por la distribución el producto no funcionase y este decidiese retirarlo in situ, debe solicitar la revisión de este por parte de un servicio técnico oficial que en caso de confirmar el problema se procederá bien a reacondicionar para su venta o bien proceder a la devolución del mismo.</p><p>Para presentar la solicitud debe enviar la solicitud a&nbsp;<a href=\"http://atencion.cliente@haier-europe.com/\" target=\"_blank\" rel=\"noopener\">atencion.cliente@haier-europe.com</a>&nbsp;acompañado de los siguientes documentos:</p><p>• Formulario de solicitud compilado (Anexo 1)</p><p>• Factura o ticket de compra del cliente final.</p><p>&nbsp;</p><p>Localice su SAT/CAT más cercano:&nbsp;<a href=\"http://www.hoover.es/es_ES/centros-de-asistencia\">http://www.hoover.es/es_ES/centros-de-asistencia</a></p><p>&nbsp;</p><p><strong>Gestión de recambios y accesorios</strong></p><p>En caso de encontrase un producto en la distribución con alguna pieza, componente, accesorio en falta o dañado, fácilmente sustituible por su personal puede solicitarlo directamente enviado un correo a su comercial y en copia a&nbsp;<a href=\"http://carmen.galeano@haier-europe.com/\" target=\"_blank\" rel=\"noopener\">carmen.galeano@haier-europe.com</a></p>"
    },
    {
        id: "panasonic",
        name: "PANASONIC",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/PANASONIC/panasonic.png",
        contacts: [
            {
                name: "Sr. JC Rosselló",
                phone: "669497832",
                email: "jcrossellobi@gmail.com"
            },
            {
                name: "SAT",
                phone: "919 94 18 04",
                email: "Devoluciones_PIB@eu.panasonic.com"
            }
        ],
        description: "<p><b>MARRÓN</b></p><p>Adjuntando motivo, modelo, N.º serie, N.º factura, fotos en caso de roturas, informes del SAT</p><p><b>FOTO</b>&nbsp;</p><p>Todos los productos defectuosos de esta gama van a la red de SAT que PANASONIC tiene en: <a href=\"http://www.panasonic.es/soporte\" target=\"_blank\">www.panasonic.es/soporte</a> </p><p><b>TELEFONÍA</b></p><p>Directo al SAT.</p><p><b>DENTAL</b></p><p>Directo al SAT.</p>"
    },
    {
        id: "panasonic-aire",
        name: "PANASONIC AIRE ACONDICIONADOO",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/PANASONIC/panasonic.png",
        contacts: [
            {
                name: "CATALUÑA: Sr. David Márquez",
                phone: "670.83.43.26",
                email: "davidmarquezpanasonic@gmail.com"
            },
            {
                name: "BALEARES: Sr. Carlos Roselló",
                phone: "669.49.78.32"
            },
            {
                name: "SAT",
                phone: "902 15 30 60",
                email: "Devoluciones_PIB@eu.panasonic.com"
            },
            {
                name: "ADM VENTAS / DEVOLUCIONES",
                email: "adminaire@eu.panasonic.com"
            }
        ],
        // downloads: [
        //     {
        //         name: "Politica_Devoluciones_2022_Panasonic_.pdf",
        //         url: "/src/assets/downloads/Politica_Devoluciones_2022_Panasonic_.pdf"
        //     },
        //     {
        //         name: "FORMATO_DEVOLUCION_2022.xls",
        //         url: "/src/assets/downloads/FORMATO_DEVOLUCION_2022.xls"
        //     }
        // ],
        description: "<p>Rellenar plantilla adjunta y solicitar autorización a proveedor:&nbsp;<a href=\"http://adminaire@eu.panasonic.com\" target=\"_blank\" rel=\"noopener\">adminaire@eu.panasonic.com</a></p>"
    },
    {
        id: "philips",
        name: "PHILIPS",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/PHILIPS/philips.png",
        contacts: [
            {
                name: "Jaime Monclús",
                email: "jaimemonclus@gmail.com"
            }
        ],
        // description: "<p class=\"MsoNormal\" style=\"color: #464e5f; font-family: gbregular;\"><span style=\"font-weight: 600; font-family: gmregular !important;\">AUDIO, TELEFONIA, y accesorios:</span></p><p class=\"MsoNormal\" style=\"color: #464e5f; font-family: gbregular;\">&nbsp;</p><p>Se ha de pedir autorización a proveedor. Envíen un email a <a href=\"mailto:jaimemonclus@gmail.com\">jaimemonclus@gmail.com</a> adjuntando tiquet de venta y motivo de la devolución, gracias.</p><p>&nbsp;</p><p>Cuando tengan la autorización, pidan devolución por portal y adjunten tanto el tiquet como la autorización. Recoge RAPITECNIC.</p><div>&nbsp;</div><p class=\"MsoNormal\">&nbsp;</p><p><u>&nbsp;</u></p><p class=\"MsoNormal\">&nbsp;</p>"
    },
    {
        id: "philips-lighting",
        name: "PHILIPS LIGHTING",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/PHILIPS/philips.png",
        contacts: [
            {
                name: "ITZEL PAZ",
                email: "itzel.paz@signify.com"
            },
            {
                name: "SAT",
                phone: "00800 744 54 775"
            }
        ],
        websites: [
            "https://www.lighting.philips.es/contact/contactanos"
        ],
        // description: "<p class=\"MsoNormal\" style=\"background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\"><span style=\"font-size:10.0pt;font-family:gbregular;color:#464E5F\">Los clientes finales pueden solicitar asistencia técnica en garantía en el teléfono&nbsp;</span><b><span style=\"font-size:10.0pt;font-family:gmregular;color:#464E5F\">00800 744 54 775</span></b><span style=\"font-size:10.0pt;font-family:gbregular;color:#464E5F\">&nbsp;.</span><span style=\"font-size:10.0pt;font-family:gbregular;mso-fareast-font-family:&quot;Times New Roman&quot;;color:#464E5F;mso-ligatures:none;mso-fareast-language:ES\"><o:p></o:p></span></p><p class=\"MsoNormal\" style=\"background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\"><span style=\"font-size:10.0pt;font-family:gbregular;color:#464E5F\">o través de&nbsp;<a href=\"https://www.lighting.philips.es/contact/contactanos\" target=\"_blank\" style=\"transition: color 0.15s ease 0s, background-color 0.15s ease 0s, border-color 0.15s ease 0s, box-shadow 0.15s ease 0s;\"><span style=\"color:#0096DB\">https://www.lighting.philips.es/contact/contactanos</span></a><o:p></o:p></span></p>"
    },
    {
        id: "philips-television",
        name: "PHILIPS TELEVISIÓN",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/PHILIPS/philips.png",
        contacts: [
            {
                name: "JAVIER ESCRIBANO",
                email: "javier.escribano@tpv-tech.com"
            },
            {
                name: "SAT",
                phone: "91 349 65 82",
                email: "dealerline.philipstv@tpv-tech.com"
            }
        ],
        websites: [
            "www.philips.es"
        ],
        // description: "<p class=\"MsoNormal\" style=\"background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\"><span style=\"font-size: 10.0pt; font-family: gbregular; color: #464e5f;\">Los clientes finales pueden solicitar asistencia técnica según lineas de negocio:</span></p><p>B2C Televisores, Audio/Video, accesorios IT y Monitores PHILIPS : 518 898 226&nbsp; // B2B 518 898 228</p><p>B2C Monitores AOC:&nbsp; 518 898 229 // B2B 518 898 230</p><p class=\"MsoNormal\" style=\"background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\"><span style=\"font-size: 10.0pt; font-family: gbregular; color: #464e5f;\">Las tiendas pueden solicitar asistencia técnica para productos preventa, de cliente, o en nombre del cliente a través de&nbsp;<a style=\"transition: color 0.15s ease 0s, background-color 0.15s ease 0s, border-color 0.15s ease 0s, box-shadow 0.15s ease 0s;\" href=\"mailto:dealerline.philipstv@tpv-tech.com\"><span style=\"color: #0096db;\">dealerline.philipstv@tpv-tech.com</span>&nbsp;</a>&nbsp;. Enviar siempre Modelo, núm. de serie, fecha de compra, descripción incidencia, datos de contacto y del lugar donde se encuentre el TV.</span></p><p class=\"MsoNormal\" style=\"background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\"><span style=\"font-size: 10.0pt; font-family: gbregular; color: #464e5f;\">PHILIPS TV dispone de una política de cambio en los primeros 15 días desde fecha de compra, en caso de fallo técnico de hardware, a verificar por Servicio Técnico. El proceso se inicia a través del teléfono o email anteriores.</span></p>"
    },
    {
        id: "philips-personal-health",
        name: "PHILIPS-PERSONAL HEALTH",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/PHILIPS/philips.png",
        contacts: [
            {
                name: "Lanaquera Martinez",
                email: "almudena.lanaquera@philips.com"
            }
        ],
        // downloads: [
        //     {
        //         name: "Comunicado_Establecimientos_Nuevo_Proceso_DOA-_Canal_Grupos_de_Compra_Cataluña.pdf",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740503115_Comunicado_Establecimientos_Nuevo_Proceso_DOA-_Canal_Grupos_de_Compra_Cataluña.pdf"
        //     }
        // ],
    },
    // {
    //     id: "pioneer",
    //     name: "PIONEER",
    //     contacts: [
    //         {
    //             name: "Sr. Pedro Sierra",
    //             email: "Pedro.Sierra@aqipa.com"
    //         },
    //         {
    //             name: "DEVOLUCIONES",
    //             email: "returns.es@aqipa.com"
    //         }
    //     ],
    //     // downloads: [
    //     //     {
    //     //         name: "procedimiento_devoluciones_aqipa.pdf",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1740260014_procedimiento_devoluciones_aqipa.pdf"
    //     //     }
    //     // ],
    //     description: "<p>Leer Guía de devolución de producto de AQIPA, recomendaciones, exclusiones y costes logísticos.</p><p><u><strong>RMA, Productos defectuosos (dentro del periodo de la garantía legal).</strong></u></p><p>Enviar solicitud a returns.es@aqipa.com indicando la siguiente información:</p><p>* REFERENCIA / EAN / NÚMERO DE SERIE</p><p>* INDICAR DATOS DE LA RECOGIDA (DIRECCIÓN, TELÉFONO Y PERSONA DE CONTACTO)</p><p>Adjuntar:</p><p>* FACTURA CLIENTE FINAL</p><p>Enviar con EMBALAJES ORIGINALES Y ACCESORIOS.</p><p><strong><u>DOA, producto defectuoso (dentro de los primeros 14 días de su venta).</u></strong></p><p>Enviar solicitud indicando \"devolución DOA\" (misma instrucciones que RMA)</p><p><strong><u>Devolución&nbsp; Productos antiguos, de baja rotación, devoluciones comerciales</u></strong></p><p>Leer Guía de devolución de producto de AQIPA instrucciones. (apartado 3)</p>"
    // },
    {
        id: "princess",
        name: "PRINCESS",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/PRINCESS/princess.png",
        contacts: [
            {
                name: "JESUS MARTINEZ / CIAL-SAT",
                email: "Jesus.Martinez@smartwaresgroup.com"
            }
        ],
        // description: "<p>Graben devolución por portal. Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p><strong>IMPRESCINDIBLE</strong>&nbsp;embalajes y accesorios originales</p>"
    },
    // {
    //     id: "prixton",
    //     name: "PRIXTON",
    //     contacts: [
    //         {
    //             name: "SAT",
    //             email: "infocliente@prixton.com"
    //         }
    //     ],
    //     websites: [
    //         "https://prixton.es/soporte/"
    //     ],
    //     // downloads: [
    //     //     {
    //     //         name: "PROTOCOLO_GARANTÍA_PRIXTON.pdf",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1740260291_PROTOCOLO_GARANTÍA_PRIXTON.pdf"
    //     //     }
    //     // ],
    //     description: "<p>Se tramita directamente directamente a SAT mediante el formulario de contacto en su página web: <a href=\"https://prixton.es/soporte/\" target=\"_blank\" rel=\"noopener\">https://prixton.es/soporte/</a>&nbsp;o&nbsp;a través del correo electrónico <a href=\"http://infocliente@prixton.com\" target=\"_blank\" rel=\"noopener\">infocliente@prixton.com</a></p><p>DOA: 15 DÍAS DESDE LA FECHA DE COMPRA, proveedor resuelve con sustitución.</p><p>RMA: 3 AÑOS DE GARANTÍA A PARTIR DE LOS 15 DÍAS DESDE LA FECHA DE COMPRA, proveedor&nbsp;recoge el producto en el establecimiento, para su revisión, reparación o sustitución por una unidad nueva en caso de no ser posible su reparación.</p><p>&nbsp;</p>"
    // },
    // {
    //     id: "philips-domestic-appliances",
    //     name: "Philips Domestic Appliances",
    //     contacts: [
    //         {
    //             name: "CINTA MORENO",
    //             email: "Cinta.MorenoGomez@versuni.com"
    //         },
    //         {
    //             name: "Atención al Cliente de Versuni",
    //             phone: "91 349 65 80"
    //         }
    //     ],
    //     // downloads: [
    //     //     {
    //     //         name: "post_venta_versuni_philips_hogar.docx",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1741097784_post_venta_versuni_philips_hogar.docx"
    //     //     }
    //     // ],
    //     description: "<p><span style=\"font-family: Aptos, sans-serif; font-size: 11pt;\">PHILIPS – HOGAR / COCINA</span></p><p><span style=\"font-family: Aptos, sans-serif; font-size: 11pt;\"><br></span><span style=\"font-size: 11.0pt; font-family: 'Aptos',sans-serif; mso-ascii-theme-font: minor-latin; mso-fareast-font-family: Aptos; mso-fareast-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: 'Times New Roman'; mso-bidi-theme-font: minor-bidi; mso-ligatures: standardcontextual; mso-ansi-language: ES; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\">Se tramita directamente con el proveedor:&nbsp;</span>se debe derivar siempre al canal de postventa</p><p><span style=\"font-size: 11.0pt; font-family: 'Aptos',sans-serif; mso-ascii-theme-font: minor-latin; mso-fareast-font-family: Aptos; mso-fareast-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: 'Times New Roman'; mso-bidi-theme-font: minor-bidi; mso-ligatures: standardcontextual; mso-ansi-language: ES; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;\">Lea atentamente el documento: \"</span><span style=\"font-family: Aptos, sans-serif;\"><span style=\"font-size: 14.6667px; background-color: #efefef;\">post venta versuni philips hogar\"</span></span></p><p>La Tienda siempre debe indicar al Consumidor el teléfono de Atención al Cliente de Versuni para tramitar cualquier tipo de devolución. Teléfono: 91 349 65 80 (De lunes a viernes de 8:00 a 20:00 h y sábados de 09:00 a 18:00 h).&nbsp;</p><p>* Si el Producto está <strong>dentro de los primeros 15 días desde la fecha de compra</strong>, Versuni aplicará política de canje de acuerdo a las condiciones de <strong>DOA </strong>descritas posteriormente.</p><p>* Si el Producto <strong>supera los primeros 15 días desde la fecha de compra</strong>, se aplicará la <strong>política de reparación</strong> en el Servicio Técnico de Versuni (\"Servicio Técnico\").&nbsp;</p><p>El periodo de garantía es de 3 (tres) años para el Consumidor a partir de la fecha del justificante de compra.<span style=\"font-family: Aptos, sans-serif;\"><span style=\"font-size: 14.6667px; background-color: #efefef;\"><br></span></span></p>"
    // },
    {
        id: "qubo",
        name: "QUBO",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/QUBO/qubo.png",
        contacts: [
            {
                name: "Sr. Xavier Folch",
                phone: "609.480.306",
                email: "xfolch@qubomobile.com"
            },
            {
                name: "SAT",
                phone: "936.110.020",
                email: "sat@qubomobile.com"
            }
        ],
        websites: [
            "www.qubomobile.com"
        ],
        phones: [
            "936.110.020"
        ],
        emails: [
            "info@qubomobile.com"
        ],
        // downloads: [
        //     {
        //         name: "RMA_Solicitud_Reparacion_Qubo.pdf",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740140759_RMA_Solicitud_Reparacion_Qubo.pdf"
        //     }
        // ],
        // description: "<p>Rellenar la plantilla de RMA y enviar por mail al SAT</p>"
    },
    {
        id: "red-bull-racing",
        name: "RED BULL RACING",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/RED BULL RACING/red-bull-racing.jpeg",
        contacts: [
            {
                name: "Daniel Miquel Fernandez",
                phone: "638 396 715",
                email: "daniel.miquel@esprinet.com"
            },
            {
                name: "SAT RED BULL RACING",
                phone: "916 615 052",
                email: "satRB.iberica@esprinet.com"
            }
        ],
        // downloads: [
        //     {
        //         name: "Manual_PostVenta_NILOX_RED_BULL_ALFA_ROMEO_ARGENTO.pptx",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740261882_Manual_PostVenta_NILOX_RED_BULL_ALFA_ROMEO_ARGENTO.pptx"
        //     }
        // ],
        // description: "<div>Lo ha de tramitar directamente cliente FINAL con el SAT.</div><div>&nbsp;</div><div>Lean atentamente el documento \"Manual PostVenta NILOX_RED BULL_ALFA ROMEO_ARGENTO\"</div><div>&nbsp;</div><div>** REDBULL</div><div>E-mail: satRB.iberica@esprinet.com</div><div>&nbsp;</div><div>&nbsp;</div><div>Teléfono Fijo: 916615052&nbsp; Lunes a viernes de 8:30 a 17:30 horas, excepto festivos.</div>"
    },
    // {
    //     id: "reebok",
    //     name: "REEBOK",
    //     contacts: [
    //         {
    //             name: "Daniel Miquel Fernandez",
    //             phone: "638 396 715",
    //             email: "daniel.miquel@esprinet.com"
    //         }
    //     ],
    // },
    {
        id: "remington",
        name: "REMINGTON",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/REMINGTON/remington.png",
        contacts: [
            {
                name: "PRESAT",
                phone: "900 210 878"
            },
            {
                name: "SAT / DEVOLUCIONES",
                email: "dev@eu.spectrumbrands.com"
            }
        ],
    },
    {
        id: "robert-bosch",
        name: "ROBERT BOSCH AGUA CALIENTE-A/A",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/ROBERT BOSCH/robert_bosch.png",
        contacts: [
            {
                name: "PEDRO FERRER MUNOZ / COMERCIAL",
                phone: "629 97 25 41",
                email: "PEDRO.FERRER@es.bosch.com"
            },
            {
                name: "INFORMACIÓN GENERAL USUARIO FINAL",
                phone: "91 175 90 92"
            },
            {
                name: "CALL CENTER TÉCNICO",
                phone: "902 41 00 14"
            },
            {
                name: "CALL CENTER GARANTIAS BOSCH",
                phone: "91 175 90 92"
            },
            {
                name: "CALL CENTER COMERCIAL",
                phone: "902 99 92 19"
            },
            {
                name: "AVISO AVERIAS",
                phone: "91 175 90 92"
            }
        ],
        // description: "<p>&nbsp;</p><p>Se tramita directamente con el proveedor.</p><p>&nbsp;</p><p>#mismo procedimiento para AIRES ACONDICIONADOS</p><p>&nbsp;</p><p>&nbsp;</p><p>** Listado de Teléfonos Directos de servicios técnicos por zona geográfica:&nbsp;</p><p class=\"MsoNormal\">SETESA BARCELONA&nbsp;&nbsp; 93 357 16 00</p><p class=\"MsoNormal\">SETESA VALLÈS, MARESME I BARCELONÈS NORD&nbsp; 93 720 89 10</p><p class=\"MsoNormal\">SETESA BAIX LLOBREGAT 93 680 76 00&nbsp;</p><p class=\"MsoNormal\">SAMADHI VIERKA TARRAGONA&nbsp; 902 409 499&nbsp;</p><p class=\"MsoNormal\">GIRONA PARERA TÈCNICS&nbsp; 972 &nbsp;21 57 62&nbsp;</p><p class=\"MsoNormal\">LLEIDA SAT JUNKERS BOSCH&nbsp;&nbsp; 973 27 06 11&nbsp;</p><p class=\"MsoNormal\">SAT SERVEI GARRAF&nbsp; CORBALAN&nbsp;&nbsp; 666 513 090&nbsp;</p><p class=\"MsoNormal\">SAT ALT PENEDÈS INDOIN&nbsp; 93 770 30 59</p><p class=\"MsoNormal\">SAT CERDANYA&nbsp;&nbsp; 972 881 147</p><p class=\"MsoNormal\">&nbsp;</p>"
    },
    {
        id: "rolser",
        name: "ROLSER",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/ROLSER/rolser.png",
        contacts: [
            {
                name: "TELF. POST-VENTA",
                phone: "965 760 700",
                email: "assistencia@rolser.com"
            }
        ],
        // description: "<p>Se tramita directamente con el proveedor.</p><p>Envíen un correo electrónico con la referencia y el motivo de la devolución y ellos les indicarán como proceder.</p>"
    },
    {
        id: "roomba",
        name: "ROOMBA",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/ROOMBA/roomba.png",
        contacts: [
            {
                name: "POSVENTA",
                email: "irobotserviceeu@irobot.com"
            },
            {
                name: "DEVOLUCIONES",
                email: "devoluciones.es@irobot.com"
            },
            {
                name: "Marino Pool",
                email: "mpool@irobot.com"
            }
        ],
        // description: "<p>&nbsp;</p><p>Se gestiona directamente con proveedor.</p><p>&nbsp;</p><p>Para solicitar una reparación deben enviar un correo electrónico a &nbsp;(<a href=\"mailto:irobotserviceeu@irobot.com\"><strong>irobotserviceeu@irobot.com</strong></a> facilitando la siguiente información:</p><ul><li><strong>Tipo de reparación: En garantía, Fuera de garantía, DOA.</strong></li><li><strong>Número de serie del Robot.</strong></li><li><strong>Factura de compra del cliente final.</strong></li><li><strong>Número de proceso internos del cliente (si procede). </strong></li><li><strong>Dirección de la recogida.</strong></li><li><strong>La avería que presenta el Robot, (Lo más concreta posible, evitar frases como \"no funciona\", \"no carga\" o \"Está roto\"). </strong></li><li><strong>Persona de contacto.</strong></li><li><strong>Direccion de correo eléctronico.</strong></li><li><strong>Número de télefono de contacto.</strong></li></ul><p>Recibirán un correo electrónico de infoTip con el número de reparación, una etiqueta de entrega y las instrucciones para organizar una recogida. &nbsp;Recibirán actualizaciones por correo con el estado de la reparación.</p><p>&nbsp;</p><p>&nbsp;</p><p>Para solicitar una devolución deben enviar correo electrónico a&nbsp; <a href=\"mailto:devoluciones.es@irobot.com\"><strong>devoluciones.es@irobot.com</strong></a> facilitando la siguiente información:</p><ul><li><strong>Tipo de reparación: En garantía, Fuera de garantía, DOA.</strong></li><li><strong>Número de serie del Robot.</strong></li><li><strong>Factura de compra del cliente final.</strong></li><li><strong>Número de proceso internos del cliente (si procede). </strong></li><li><strong>Dirección de la recogida.</strong></li><li><strong>La avería que presenta el Robot, (Lo más concreta posible, evitar frases como \"no funciona\", \"no carga\" o \"Está roto\"). </strong></li><li><strong>Persona de contacto.</strong></li><li><strong>Direccion de correo eléctronico.</strong></li><li><strong>Número de télefono de contacto.</strong></li></ul><p>&nbsp;</p><p>Recibirán un correo electrónico de infoTip con el número asignado, &nbsp;una etiqueta de entrega y las instrucciones para organizar una recogida. &nbsp;Recibirán actualizaciones por correo con el estado.</p>"
    },
    {
        id: "rowenta",
        name: "ROWENTA",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/ROWENTA/rowenta.png",
        contacts: [
            {
                name: "JORGE DEL OJO",
                phone: "670.744.628",
                email: "jdelojo@groupeseb.com"
            },
            {
                name: "DUNIA MARTÍNEZ - stocks y disponibilidad",
                email: "dmartinezt@groupeseb.com"
            }
        ],
        // downloads: [
        //     {
        //         name: "SATs_GrpSEB_2023.xlsx",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740503328_SATs_GrpSEB_2023.xlsx"
        //     }
        // ],

    },
    // {
    //     id: "roy",
    //     name: "ROY",
    //     description: "<p>Graben devolución por portal. Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p><strong>IMPRESCINDIBLE</strong>&nbsp;embalajes y accesorios originales</p>"
    // },
    {
        id: "russell-hobbs",
        name: "RUSSELL HOBBS",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/RUSSELL HOBBS/russell-hobbs.png",
        contacts: [
            {
                name: "PRESAT",
                phone: "900 210 878"
            },
            {
                name: "SAT / DEVOLUCIONES",
                email: "dev@eu.spectrumbrands.com"
            }
        ],
    },
    {
        id: "samsung",
        name: "SAMSUNG",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/SAMSUNG/samsung.png",
        contacts: [
            {
                name: "Noelia Torres / GAMA BLANCA",
                phone: "647711612",
                email: "n.torres@samsung.com"
            },
            {
                name: "Luis Martin Giménez / GAMA MARRÓN",
                phone: "618809515",
                email: "luis.martin@samsung.com"
            },
            {
                name: "SAT",
                email: "grupos.sesa@samsung.com"
            },
            {
                name: "SAT",
                email: "grandesclientes@samsung.com"
            },
            {
                name: "Consulta STOCKS",
                email: "d.cortes@partner.samsung.com"
            }
        ],
        description: "<p><strong>VENDIDO A USUARIO FINAL </strong></p><p>Incidencia Técnica : Menos de 15 días<br>Daño Oculto: Menos de 7 días</p><p>Documentación: Formulario Devolución + Ticket de Venta a usuario final</p><p>Observaciones: Embalaje original en buen estado. Accesorios, manuales y cables completos</p><p>Enviar mail a&nbsp;grupos.sesa@samsung.com con la plantilla rellenada adjunta.</p><p>&nbsp;</p><p><strong>NO VENDIDO A USUARIO FINAL </strong></p><p>Incidencia Técnica: 1 mes desde la fecha de entrega a distribuidor <br>Daño Oculto: 90 días fecha entrega a distribuidor</p><p>Documentación: Formulario Devolución</p><p>Observaciones: Embalaje original en buen estado. Accesorios, manuales y cables completos</p><p>Enviar mail a&nbsp;grupos.sesa@samsung.com con la plantilla rellenada adjunta.</p><p>&nbsp;</p><p class=\"MsoNormal\"><span style=\"color: #1f497d;\">Los compañeros de devoluciones, abren aviso al SAT local, para que este pase por la tienda a verificar la incidencia. (nunca en domicilio de usuario)</span></p><p class=\"MsoNormal\"><span style=\"color: #1f497d;\">El SAT elabora un informe, en caso de ser DOA SI, nos quedamos con el equipo, y enviamos correo indicando que está autorizada la devolución. </span></p><p class=\"MsoNormal\"><span style=\"color: #1f497d;\">Una vez tenemos en nuestras instalaciones el equipo emitimos abono a la sociedad donde SAMSUNG a facturado este equipo.</span></p><p class=\"MsoNormal\"><span style=\"color: #1f497d;\">En caso de ser DOA NO, devolvemos el equipo a la tienda, y enviamos correo indicando el motivo del rechazo de la solicitud DOA.</span></p><p>&nbsp;</p><p class=\"MsoNormal\"><span style=\"color: #1f497d;\">Para abrir aviso de reparación de un equipo si este a sido DOA NO, enviar correo electrónico a: <a href=\"mailto:grandesclientes@samsung.com\">grandesclientes@samsung.com</a> si cumple con los requisitos de reparación en garantía, se abre intervención en SAT local y esta pasa por la tienda a proceder a la reparación.</span></p>"
    },
    {
        id: "samsung-telefonia",
        name: "SAMSUNG TELEFONIA MOVIL",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/SAMSUNG/samsung.png",
        contacts: [
            {
                name: "Maria Tortosa",
                email: "m.tortosa@partner.samsung.com"
            },
            {
                name: "ATENCIÓN AL CLIENTE",
                phone: "911750015"
            },
            {
                name: "POST-VENTA / DOA",
                email: "sesa.return@samsung.com"
            }
        ],
        // downloads: [
        //     {
        //         name: "DOA_IM.pdf",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1741076827_DOA_IM.pdf"
        //     },
        //     {
        //         name: "Procedimiento_posventa_reparacion.pdf",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1741076827_Procedimiento_posventa_reparacion.pdf"
        //     },
        //     {
        //         name: "SOLICITUD_DOA.XLSX",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1741076827_SOLICITUD_DOA.XLSX"
        //     }
        // ],
        // description: "<div>Se tramita directamente con el proveedor.</div><div>&nbsp;</div><div><strong>DOA - Los primeros 15 días naturales desde la fecha de compra</strong></div><div>&nbsp;</div><div>Se tramita directamente con el proveedor, enviar email a <a href=\"http://sesa.return@samsung.com\" target=\"_blank\" rel=\"noopener\">sesa.return@samsung.com</a></div><div>&nbsp;</div><div>La documentación que ha de remitir obligatoriamente para la tramitación es: la plantilla de devolución anexa y copia del ticket o factura de compra entregada al usuario final. En la mencionada plantilla reflejará entre otra información: El Modelo, Nº de serie, IMEI y la incidencia técnica que origina la solicitud de devolución.</div><div>&nbsp;</div><div>SAMSUNG le recoge el producto y lo lleva al servicio SAT, el cual cuando realice la inspección del material emitirá un informe&nbsp; para los equipos que cumplen con los requisitos de devolución.&nbsp;</div><div>&nbsp;</div><div>Si es favorable, hagan llegar la autorización a su gestora y RAPITECNIC hará el seguimiento hasta la recepción del correspondiente abono por parte de SAMSUNG.</div><div>&nbsp;</div><div>Lea el documento adjunto - DOA_IM</div><div>&nbsp;</div><div><strong>SERVICIO POSTVENTA DE REPARACIÓN</strong>, opciones:</div><div>&nbsp;</div><div>1.- ATENCION AL CLIENTE: 911 750 015</div><div>&nbsp;</div><div>2.- RED SERVICIOS TÉCNICOS: localice su servicio técnico más cercano a través de <a href=\"http://www.samsung.com/es/support/servicelocation\" target=\"_blank\" rel=\"noopener\">http://www.samsung.com/es/support/servicelocation</a></div><div>&nbsp;</div><div>3.- Servicio de reparación online Smart Repair(*): <a href=\"https://www.samsung.com/es/support/smart-repair/\">https://www.samsung.com/es/support/smart-repair/</a>&nbsp;(* Limitado a determinadas zonas y modelos)</div><div>&nbsp;</div><div>Lea el documento adjunto - Procedimiento_posventa_reparacion</div>"
    },
    // {
    //     id: "sanfor",
    //     name: "SANFOR",
    //     description: "<p>CONSULTAR CON SU GESTORA</p><p><br></p>"
    // },
    // {
    //     id: "sareba",
    //     name: "SAREBA",
    //     description: "<p>Graben devolución por portal. Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p><strong>IMPRESCINDIBLE</strong>&nbsp;embalajes y accesorios originales</p>"
    // },
    // {
    //     id: "satisfyer",
    //     name: "SATISFYER",
    //     contacts: [
    //         {
    //             name: "Alvaro Ramirez - KPsport",
    //             email: "alvaro.ramirez@kpsport.com"
    //         },
    //         {
    //             name: "Beatriz Fernandez",
    //             email: "bfernandez@kpsport.com"
    //         },
    //         {
    //             name: "SAT",
    //             phone: "935 72 30 21",
    //             email: "sat@kpsport.com"
    //         }
    //     ],
    //     websites: [
    //         "www.satkp.com"
    //     ],
    //     description: "<p>Se tramita directamente con el proveedor.</p><p>Solicitar autorización (RMA / DOA) por la web: <a href=\"http://www.satkp.com\" target=\"_blank\">www.satkp.com</a> ; les pedirán foto del producto fuera de la caja, tiquet de venta del cliente final, número de serie y motivo de la devolución.</p><p>Cuando tengan la autorización de proveedor, hágansela llegar a su gestora para reclamar el correspondiente abono, gracias.</p><p>notas: </p><p>si el producto no tiene número de serie (p.ejemplo satisfayer) pongan N/S</p><p>la foto no debe pesar más de 1GB, si no da error en la tramitación. </p>"
    // },
    // {
    //     id: "segway",
    //     name: "SEGWAY",
    //     contacts: [
    //         {
    //             name: "Sr. Marc Maudes",
    //             phone: "93.122.28.68",
    //             email: "marc.maudes@kpsport.com"
    //         }
    //     ],
    //     websites: [
    //         "www.satkp.com"
    //     ],
    //     description: "<p>Solicitar Autorización (DOA y RMA) a proveedor. </p><p>Ellos les indicarán cómo poder iniciar el envío y la dirección dónde lo deben enviar.</p><p>* Si se trata de una cámara, enviar sin SD, ni batería y con la factura correspondiente.</p>"
    // },
    {
        id: "sennheiser",
        name: "SENNHEISER",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/SENNHEISER/sennheiser.png",
        contacts: [
            {
                name: "Sr. Juan Carlos Puig",
                phone: "680689000",
                email: "jcpuig@magnetron.es"
            },
            {
                name: "SAT",
                email: "postventa@magnetron.es"
            },
            {
                name: "SAT / REPARACIONES",
                email: "reparaciones@magnetron.es"
            }
        ],
        // description: "<p>Se tramita directamente con el proveedor.</p><p>Enviar email y ellos les darán las instrucciones para gestionar la garantía o devolución.&nbsp;</p>"
    },
    {
        id: "shark",
        name: "SHARK",
        contacts: [
            {
                name: "Joaquin Macho Garcia",
                phone: "649483332",
                email: "joaquin@machogarcia.es"
            },
            {
                name: "Miguel Angel Macho Garcia( Delegado Cataluña , Baleares y Aragón)",
                phone: "630388947",
                email: "miguel.macho@telefonica.net"
            },
            {
                name: "Juan Carlos Macho Garcia ( Delegado Cataluña , Baleares y Aragón)",
                phone: "649304606",
                email: "jcmacho@telefonica.net"
            },
            {
                name: "Merche Cavia ( Delegado resto España)",
                phone: "932013777"
            },
            {
                name: "Atención al cliente",
                phone: "932624268",
                email: "sat@riverint.com"
            },
            {
                name: "SAT ( Sr. David Vera)",
                phone: "900839453",
                email: "sat@riverint.com"
            }
        ],
        description: "<p>Se gestiona directamente con proveedor.</p><p>&nbsp;</p><p><strong><u>POSVENTA. Durante los primeros 15 días</u></strong> solicitar al delegado&nbsp; correspondiente según zona, &nbsp;la autorización para cambio al cliente y su posterior recogida del producto defectuoso en tienda. Una vez recogido de la tienda por proveedor, subir comprobante al portal en &nbsp;\"recogidas directas proveedor \"para su abono.</p><p>Requisitos: ticket de hasta 15 días, embalajes originales y quedando excluido el mal uso.</p><p>&nbsp;</p><p><strong><u>Pasados los 15 días o no tener los embalajes y accesorios originales</u></strong><u>,</u>&nbsp;ponerse en contacto con el SAT al tel. 900-839-453 . Para cualquier duda sobre la garantía llamar al teléfono de atención al cliente 93 262 42 68 o por correo a <a href=\"mailto:sat@riverint.com\">sat@riverint.com</a></p><p>&nbsp;</p><p><strong><u>PREVENTA. Contactar con su delegado asignado</u></strong>:</p><p>Cataluña, Baleares y Aragón: <a href=\"mailto:jcmacho@telefonica.net\">jcmacho@telefonica.net</a> o <a href=\"mailto:miguel.macho@telefonica.net\">miguel.macho@telefonica.net</a></p><p>Resto zonas:&nbsp; Merche Cavia 932013777</p>"
    },
    {
        id: "siemens",
        name: "SIEMENS (GAMA BLANCA)",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/SIEMENS/siemens.png",
        contacts: [
            {
                name: "COMERCIAL: Juan Jimenez",
                phone: "629 820 172",
                email: "juan.jimenez@bshg.com"
            },
            {
                name: "DISPONIBILIDAD STOCK",
                phone: "976305700"
            },
            {
                name: "Avisos de reparación CLIENTE FINAL",
                phone: "976305710",
                email: "Cau-siemens@bshg.com"
            },
            {
                name: "Avisos de reparación TIENDA:",
                email: "Benjamin.hormigo@bshg.com"
            }
        ],
    },
    {
        id: "smeg",
        name: "SMEG",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/SMEG/smeg.png",
        contacts: [
            {
                name: "COMERCIAL: Daniel Ortiz",
                phone: "649 83 61 40",
                email: "daniel.ortiz@smeg.es"
            },
            {
                name: "SAT P.A.E. / MICROTECNIC - Centro Reparaciones",
                phone: "952363595 - 935959800",
                email: "asistenciatecnica.crevedel@outlook.es"
            },
            {
                name: "CONSULTA DE STOCK: Montserrat Salazar",
                phone: "93-5650250 EXT 2319",
                email: "m.salazar@smeg.es"
            },
            {
                name: "INCIDENCIAS POST-VENTA",
                phone: "93-5650250 EXT 2330",
                email: "soporte@smeg.es"
            }
        ],
    },
    {
        id: "soehnle",
        name: "SOEHNLE",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/SOEHNLE/soehnle.png",
        contacts: [
            {
                name: "Ignacio de la Órden",
                phone: "607 53 95 11"
            }
        ],
        // description: "<p>Graben devolución por portal. Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p><strong>IMPRESCINDIBLE</strong>&nbsp;embalajes y accesorios originales</p><p>&nbsp;</p><p style=\"color: #464e5f; font-family: gbregular;\">otras marcas:&nbsp;<a class=\"sat-value-search d-flex align-items-center text-dark text-hover-primary font-size-h5 font-weight-bold mr-3\" style=\"background-color: #ffffff; transition: color 0.15s ease 0s, background-color 0.15s ease 0s, border-color 0.15s ease 0s, box-shadow 0.15s ease 0s; font-family: gmregular; color: #212121 !important; margin-right: 0.75rem !important; font-weight: 500 !important; font-size: 1.25rem !important; display: inline !important;\" href=\"https://ventas.candelsa.com/comercial/sats\">LEIFHEIT</a></p>"
    },
    {
        id: "soler-palau",
        name: "SOLER Y PALAU",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/SOLER PALAU/soler_y_palau.png",
        // description: "<p style=\"color: #464e5f; font-family: gbregular;\"><strong><span style=\"font-family: Verdana;\">Marca S&amp;P </span></strong></p><p>Graben devolución por portal, adjunten tiquet de venta a cliente final inferior a 15 dias, y se la validaremos. Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p><strong>IMPRESCINDIBLE</strong> embalajes y accesorios originales y tiquet de venta.</p><p>&nbsp;</p><p><strong>PEGUEN EL TIQUET FUERA DEL PRODUCTO DEFECTUOSO, GRACIAS.</strong></p><p style=\"color: #464e5f; font-family: gbregular;\">&nbsp;</p>"
    },
    {
        id: "sony",
        name: "SONY",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/SONY/sony.png",
        contacts: [
            {
                name: "FRANCISCO TORRES TELLO",
                phone: "639347839",
                email: "francisco.torres@sony.com"
            },
            {
                name: "INFORMACIÓN STOCKS",
                email: "Antonio.Gonzalez@sony.com"
            },
            {
                name: "PREVISIONES",
                email: "sse.siberia.operations@sony.com"
            },
            {
                name: "Call Center / SAT",
                phone: "91 749 63 88"
            }
        ],
        websites: [
            "www.sony.es/support/es/repair/asc"
        ],
    },
    {
        id: "sony-playstation",
        name: "SONY PLAY-STATION",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/SONY/sony.png",
        contacts: [
            {
                name: "Servicio de Atención al Cliente",
                phone: "911147422",
                email: "asistenciadered@es.playstation.com"
            }
        ],
        websites: [
            "https://rma.support.playstation.com/",
            "https://www.playstation.com/es-es/support/hardware/"
        ],
    },
    {
        id: "svan",
        name: "SVAN",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/SVAN/svan.png",
        contacts: [
            {
                name: "Sr. José Manuel Robledano",
                phone: "606 08 61 29",
                email: "jmrobledano@svanelectro.com"
            },
            {
                name: "SAT / DAÑO ESTETICO",
                phone: "722.34.54.31",
                email: "doa2@svanelectro.com"
            },
            {
                name: "SAT / AVERIA",
                phone: "96.324.67.51 / 96.324.67.52",
                email: "avisos@svanelectro.com"
            }
        ],
    },
    {
        id: "taurus",
        name: "TAURUS",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/TAURUS/taurus.png",
        contacts: [
            {
                name: "JESÚN MOTA",
                phone: "661 55 66 86",
                email: "jmota@taurus.es"
            }
        ],
        // description: "<p>Se tramita directamente con el proveedor.&nbsp;</p><p>Pónganse en contacto con el comercial y lo derivarán al SAT.</p>"
    },
    {
        id: "taurus-i",
        name: "TAURUS I",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/TAURUS/taurus.png",
        // description: "<p>Se tramita directamente con el proveedor.&nbsp;</p><p>Pónganse en contacto con el comercial de TAURUS y lo derivarán al SAT.</p>"
    },
    {
        id: "tcl",
        name: "TCL",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/TCL/tcl.png",
        contacts: [
            {
                name: "Pablo González",
                phone: "653569521",
                email: "pablo.gonzalez@tcl.com"
            },
            {
                name: "SAT TELEFONIA / SERVICIO 10",
                phone: "913 587 490",
                email: "gestion.multimarca@servicio10.es"
            },
            {
                name: "THOMPSON TV / CENTRO CONTACTO",
                phone: "910 389 662",
                email: "ESsupport@tcl.com"
            },
            {
                name: "SAT TCL TV / CENTRO CONTACTO",
                phone: "910 389 663",
                email: "ESsupport@tcl.com"
            }
        ],
        websites: [
            "https://tcl.servicio10.es/",
            "www.elyseo.eu",
            "www.tcl.com"
        ],
        // downloads: [
        //     {
        //         name: "TELEVISIÓN_POSVENTA_2022_–_ESPAÑA.pdf",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740261988_TELEVISIÓN_POSVENTA_2022_–_ESPAÑA.pdf"
        //     },
        //     {
        //         name: "1._-user_creation_(1).pdf",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740261988_1._-user_creation_(1).pdf"
        //     },
        //     {
        //         name: "2.-_RMA_CREATION_(1).pdf",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740261988_2.-_RMA_CREATION_(1).pdf"
        //     }
        // ],
    },
    {
        id: "tcl-aire",
        name: "TCL AIRE",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/TCL/tcl.png",
        contacts: [
            {
                name: "Óscar Gundín",
                phone: "618 170 672",
                email: "oscar.gundin@tcl.com"
            },
            {
                name: "TCL HOME SERVICES / SAT",
                phone: "910 389 663 /  961 858 488",
                email: "tm@tmdistribuciones.es"
            }
        ],
        websites: [
            "www.tcl.com/es/es"
        ],
        // downloads: [
        //     {
        //         name: "AIRE_PROTOCOLO_DOA-GARANTIA_TCL_AIRE_2022.pdf",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1741089628_AIRE_PROTOCOLO_DOA-GARANTIA_TCL_AIRE_2022.pdf"
        //     }
        // ],
        // description: "<div>Para REPARACIONES/GARANTIAS se gestiona directamente con SAT de proveedor.&nbsp;</div><div>&nbsp;</div><div>Lea atentamente documento adjunto \"AIRE PROTOCOLO DOA-GARANTA TCL AIRE 2022\"</div>"
    },
    {
        id: "tefal",
        name: "TEFAL",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/TEFAL/tefal.png",
        contacts: [
            {
                name: "JORGE DEL OJO",
                phone: "670.744.328",
                email: "jdelojo@groupeseb.com"
            },
            {
                name: "DUNIA MARTÍNEZ - stocks y disponibilidad",
                email: "dmartinezt@groupeseb.com"
            }
        ],
        // downloads: [
        //     {
        //         name: "SATs_GrpSEB_2023.xlsx",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740503350_SATs_GrpSEB_2023.xlsx"
        //     }
        // ],
    },
    {
        id: "teka",
        name: "TEKA",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/TEKA/teka.png",
        contacts: [
            {
                name: "Ángel Fernandez Surde",
                phone: "615037118",
                email: "anfernandez@teka.com"
            },
            {
                name: "SAT",
                phone: "902111211 - 918204848",
                email: "tekadevoluciones@teka.com"
            },
            {
                name: "DISPONIBILIDAD PRODUCTOS",
                phone: "916613017",
                email: "pedidos@teka.com"
            }
        ],
        websites: [
            "https://www.teka.com/es-es/soporte/solicitar-reparacion/"
        ],
    },
    {
        id: "telecom",
        name: "TELECOM",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/SPC/spc.png",
        contacts: [
            {
                name: "Sr. Jose Carlos Rodriguez",
                phone: "629.32.23.95",
                email: "josecarlos@rdise.e.telefonica.net"
            },
            {
                name: "SAT",
                email: "support@spc.es"
            }
        ],
        emails: [
            "rdise@rdise.e.telefonica.net"
        ],
        // downloads: [
        //     {
        //         name: "Solicitud_DOA_Tablets_y_Moviles_SPC.xls",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740259883_Solicitud_DOA_Tablets_y_Moviles_SPC.xls"
        //     }
        // ],
    },
    // {
    //     id: "thomson",
    //     name: "THOMSON",
    //     contacts: [
    //         {
    //             name: "Manolo Valbuena",
    //             phone: "624 86 93 12",
    //             email: "mvalbuena@grupo-sil.com"
    //         },
    //         {
    //             name: "SAT",
    //             phone: "911 225 681",
    //             email: "hiperservice@hiperservice.com"
    //         }
    //     ],
    //     websites: [
    //         "www.grupowg.com"
    //     ],
    //     // downloads: [
    //     //     {
    //     //         name: "PROTOCOLO_THOMSON.pdf",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1741089658_PROTOCOLO_THOMSON.pdf"
    //     //     }
    //     // ],
    //     description: "<p>Se tramita directamente con proveedor.</p><p>Los usuarios pueden solicitar una reparación de televisores a través de tres&nbsp;<br>modalidades de comunicación: CORREO ELECTRÓNICO, TELÉFONO o FORMULARIO WEB</p><p>Lea \"PROTOCOLO THOMSON\", y siga sus indicaciones dependiendo del tipo de incidencia, gracias.</p>"
    // },
    // {
    //     id: "thomson-informatica",
    //     name: "THOMSON INFORMATICA",
    //     contacts: [
    //         {
    //             name: "Dpto Post Venta Idiomund",
    //             email: "rma@grupo-sil.com"
    //         }
    //     ],
    //     websites: [
    //         "WEB:  http://panel.idiomund.com/login-rma"
    //     ],
    //     description: "<div>Se tramita directamente con el proveedor.</div><div><br></div><div>Gestionen la incidencia por la web de IDIOMUND: <a href=\"http://panel.idiomund.com/login-rma\">http://panel.idiomund.com/login-rma</a><a href=\"http://panel.idiomund.com/login-rma\" target=\"_blank\"></a>&nbsp;(Código: 00962), ellos les darán las instrucciones para gestionar la garantía o devolución.</div>"
    // },
    {
        id: "toshiba",
        name: "TOSHIBA",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/TOSHIBA/toshiba.png",
        // description: "<p><b>TOSHIBA - PRODUCTO INFORMÁTICO:</b><br></p><p>Gestiona directamente cliente final. Toshiba recoge y sustituye directamente a cliente final.</p><p class=\"MsoNormal\"><o:p></o:p></p><p class=\"MsoNormal\"><o:p>&nbsp;</o:p><a href=\"https://www.storrepair.com/toshiba_products/\" style=\"background-color: rgb(255, 255, 255);\">https://www.storrepair.com/toshiba_products/</a></p><p class=\"MsoNormal\"><o:p></o:p></p><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"104\" style=\"width: 78pt;\"><tbody><tr height=\"21\" style=\"height:15.75pt\"></tr></tbody></table>"
    },
    // {
    //     id: "tp-link",
    //     name: "TP-LINK",
    //     contacts: [
    //         {
    //             name: "NEOBYTE / Xavier Ferreres",
    //             phone: "934 254 585 / 934 535 595",
    //             email: "xavi@neobyte.es"
    //         }
    //     ],
    //     description: "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"420\" style=\"width: 315pt;\"><colgroup><col width=\"420\" style=\"mso-width-source:userset;mso-width-alt:15360;width:315pt\"></colgroup><tbody><tr height=\"21\" style=\"height:15.75pt\"><td height=\"21\" class=\"xl64\" width=\"420\" style=\"height:15.75pt;width:315pt\">Se tramita directamente con el proveedor.</td></tr><tr height=\"20\" style=\"height:15.0pt\"><td height=\"20\" style=\"height:15.0pt\">Enviar email y ellos les darán las instrucciones para gestionar la garantía o devolución.</td></tr></tbody></table>"
    // },
    {
        id: "tristar",
        name: "TRISTAR",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/TRISTAR/tristar.png",
        contacts: [
            {
                name: "JESUS MARTINEZ / CIAL-SAT",
                email: "Jesus.Martinez@smartwaresgroup.com"
            }
        ],
        // description: "<p>Graben devolución por portal. Les recogerá RAPITECNIC con nuestra RMA.</p><p><strong>IMPRESCINDIBLE&nbsp;</strong>embalajes y accesorios originales</p>"
    },
    {
        id: "trust",
        name: "TRUST",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/TRUST/trust.png",
        contacts: [
            {
                name: "Juani Delgado",
                email: "juani.delgado@trust.com"
            }
        ],
        // description: "<p>Graben devolución por portal. Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p><strong>IMPRESCINDIBLE</strong>&nbsp;embalajes y accesorios originales</p>"
    },
    {
        id: "ufesa",
        name: "UFESA",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/UFESA/ufesa.png",
        contacts: [
            {
                name: "Iván Puertas",
                phone: "650 86 88 41",
                email: "ivan.puertas@bbtrends.es"
            }
        ],
        // description: "<p>Graben devolución por portal. Les recogerá RAPITECNIC con nuestra RMA.</p><p>&nbsp;</p><p><strong>IMPRESCINDIBLE</strong>&nbsp;embalajes y accesorios originales</p>"
    },
    // {
    //     id: "urban-prime",
    //     name: "URBAN PRIME",
    //     contacts: [
    //         {
    //             name: "Daniel Miquel Fernandez",
    //             phone: "638 396 715",
    //             email: "daniel.miquel@esprinet.com"
    //         }
    //     ],
    {
        id: "vivanco",
        name: "VIVANCO",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/VIVANCO/vivanco.png",
        contacts: [
            {
                name: "Miguel Ángel Medina",
                phone: "671 856 664",
                email: "mmedina@vivanco.es"
            }
        ],
        // description: "<p>Se tramita directamente con el proveedor.</p><p>Enviar email y ellos les darán las instrucciones para gestionar la garantía o devolución.</p><p>&nbsp;</p>"
    },
    // {
    //     id: "vivo",
    //     name: "VIVO",
    //     contacts: [
    //         {
    //             name: "atención al cliente",
    //             phone: "900 670 787",
    //             email: "service@es.vivo.com"
    //         },
    //         {
    //             name: "Servicio técnico - SmartLabs",
    //             phone: "910 052 667",
    //             email: "atencionalcliente@smartlabs.es"
    //         }
    //     ],
    //     websites: [
    //         "www.vivo.com/es",
    //         "www.smartlabs.es"
    //     ],
    //     // downloads: [
    //     //     {
    //     //         name: "Proceso_de_postventa_vivo_Electro_Retail_V1.pptx",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1740260201_Proceso_de_postventa_vivo_Electro_Retail_V1.pptx"
    //     //     }
    //     // ],
    //     description: "<p>Se tramita directamente con el proveedor.</p><p>Lean atentamente doc.: Proceso de postventa vivo_Electro Retail_V1</p><div>&nbsp;</div><p><strong>DOA : dentro de los primeros 15 dias desde su venta a cliente final.</strong></p><p>Los puntos de venta deberán registrarse en el Sistema del SAT para crear un RMA.</p><p>Smartlabs envía transporte para recogida</p><p>Smartlabs envía reporte a VIVO conforme está o no aceptada la devolución, y emite el correspondiente abono si procede.</p><p>&nbsp;</p><p><strong>POSTVENTA / REPARACIONES / CLIENTE FINAL:&nbsp;</strong></p><p>Acudir al punto de venta (tienda) para defectuosos de origen o devoluciones</p><p>Los puntos de venta deberán registrarse en el Sistema del SAT para crear un RMA.</p><p>El punto de venta envía la unidad defectuosa el SAT designado, solicitando la recogida directa o llevándolo a un servicio técnico de la red de asociados.</p><p>** recogida directamente a través de la web de vivo en: <a href=\"https://websatvivo.smartlabs.es/crear\" target=\"_blank\" rel=\"noopener\">https://websatvivo.smartlabs.es/crear</a></p><p>** red de servicios técnicos locales asociados: <a href=\"https://www.vivo.com/es/support/service-center\" target=\"_blank\" rel=\"noopener\">https://www.vivo.com/es/support/service-center</a></p><p>Después de la reparación, el SAT lo devuelve al punto de venta</p><p>El punto de venta avisa al cliente final para que pueda recoger la unidad reparada</p><div>&nbsp;</div><p>&nbsp;</p>"
    // },
    {
        id: "vogels",
        name: "VOGELS",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/VOGELS/vogels.png",
        contacts: [
            {
                name: "Miquel Moreno Cirera",
                phone: "609760235",
                email: "miquel.vogels@gmail.com"
            }
        ],
        websites: [
            "www.vogels.com"
        ],
        // description: "<p class=\"MsoNormal\"><span style=\"mso-fareast-font-family:&quot;Times New Roman&quot;;color:#4472C4\">Se tramita directamente con el proveedor.&nbsp;</span><span style=\"color: rgb(68, 114, 196);\">&nbsp;</span></p><p class=\"MsoNormal\"><o:p></o:p></p><p class=\"MsoNormal\"><span style=\"mso-fareast-font-family:&quot;Times New Roman&quot;;color:#4472C4\">Enviar email con los siguientes requisitos:<u1:p class=\"\"></u1:p></span><o:p></o:p></p><p class=\"MsoNormal\"><span style=\"mso-fareast-font-family:&quot;Times New Roman&quot;;color:#4472C4\">- Modelo</span></p><p class=\"MsoNormal\"><span style=\"color: rgb(68, 114, 196);\">- adjuntar factura de compra</span></p><p class=\"MsoNormal\"><o:p></o:p></p><p class=\"MsoNormal\"><span style=\"mso-fareast-font-family:&quot;Times New Roman&quot;;color:#4472C4\">- motivo de la devolución y fotos<u1:p class=\"\"></u1:p></span><o:p></o:p></p><p class=\"MsoNormal\"><span style=\"mso-fareast-font-family:&quot;Times New Roman&quot;;color:#4472C4\">- dirección de recogida<u1:p class=\"\"></u1:p></span><o:p></o:p></p><p class=\"MsoNormal\"><span style=\"mso-fareast-font-family:&quot;Times New Roman&quot;;color:#4472C4\">&nbsp;</span><o:p></o:p></p><p class=\"MsoNormal\"><span style=\"mso-fareast-font-family:&quot;Times New Roman&quot;;color:#4472C4\">&nbsp;</span><span style=\"color: rgb(68, 114, 196);\">Si procede, autorizarán y les darán núm. De RMA para su seguimiento.</span></p><p class=\"MsoNormal\"><o:p></o:p></p><p class=\"MsoNormal\"><span style=\"mso-fareast-font-family:&quot;Times New Roman&quot;;color:#4472C4\">Recogen ellos directamente por tienda.<u1:p class=\"\"></u1:p></span><o:p></o:p></p><p class=\"MsoNormal\"><span style=\"mso-fareast-font-family:&quot;Times New Roman&quot;;color:#4472C4\">Una vez lo hagan, envíen un email a su gestora con el número de RMA de proveedor y el albarán de la recogida para hacer el seguimiento y reclamar el correspondiente abono a proveedor, gracias.<u1:p class=\"\"></u1:p></span><o:p></o:p></p><p class=\"MsoNormal\"><u1:p class=\"\">&nbsp;</u1:p><o:p></o:p></p>"
    },
    // {
    //     id: "vok",
    //     name: "VOK",
    //     contacts: [
    //         {
    //             name: "Jordi Amorós",
    //             phone: "607363047",
    //             email: "j.amoros@vok-electronics.es"
    //         },
    //         {
    //             name: "SAT/DEVOLUCIONES",
    //             email: "devoluciones@vok-electronics.es"
    //         }
    //     ],
    //     websites: [
    //         "http://www.vok-electronics.es/"
    //     ],
    //     // downloads: [
    //     //     {
    //     //         name: "03_VOK_TRÍPTICO_NORMATIVA_DEVOLUCIÓ.pdf",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1741275483_03_VOK_TRÍPTICO_NORMATIVA_DEVOLUCIÓ.pdf"
    //     //     },
    //     //     {
    //     //         name: "Servicios_Tecnicos_VOK.xlsx",
    //     //         url: "https://api-products.candelsa.com/storage/app/sats/1741275483_Servicios_Tecnicos_VOK.xlsx"
    //     //     }
    //     // ],
    // description: "<p>Se gestiona directamente con proveedor.</p><p>Enviar su solicitud de devolución al correo: <a href=\"mailto:devoluciones@vok-electronics.es\">devoluciones@vok-electronics.es</a> indicando modelo , nº de serie , motivo avería y factura de venta.</p><p>La petición será revisada por VOK y le confirmaran como proceder.</p><p><br><strong>PARA AVERÍAS O REPARACIONES:</strong> pueden encontrar su SAT Oficial más cercano repartidos por la geografía nacional. Ver documento <strong>Servicios Tecnicos VOK</strong></p><p><u>Lea \"03 VOK TRÍPTICO NORMATIVA DEVOLUCIÓ\" (Procedimiento post venta), y siga sus indicaciones dependiendo del tipo de incidencia, gracias.</u></p>"
    // },
    // {
    //     id: "wahl",
    //     name: "WAHL",
    //     contacts: [
    //         {
    //             name: "Joaquin Macho Garcia",
    //             phone: "649483332",
    //             email: "joaquin@machogarcia.es"
    //         },
    //         {
    //             name: "Miguel Angel Macho Garcia( Delegado Cataluña , Baleares y Aragón)",
    //             phone: "630388947",
    //             email: "miguel.macho@telefonica.net"
    //         },
    //         {
    //             name: "Juan Carlos Macho Garcia ( Delegado Cataluña , Baleares y Aragón)",
    //             phone: "649304606",
    //             email: "jcmacho@telefonica.net"
    //         },
    //         {
    //             name: "Merche Cavia ( Delegado resto España)",
    //             phone: "932013777"
    //         },
    //         {
    //             name: "SAT",
    //             phone: "932624268",
    //             email: "sat@riverint.com"
    //         }
    //     ],
    //     description: "<p>Se gestiona directamente con proveedor.</p><p><strong><u>POSVENTA. Durante los primeros 15 días</u></strong> solicitar al delegado&nbsp; correspondiente según zona, &nbsp;la autorización para cambio al cliente y su posterior recogida del producto defectuoso en tienda. Una vez recogido de la tienda por proveedor, subir comprobante al portal en &nbsp;\"recogidas directas proveedor \"para su abono.Requisitos: ticket de hasta 15 días, embalajes originales y quedando excluido el mal uso.</p><p>&nbsp;</p><p><strong><u>Pasados los 15 días o no tener los embalajes y accesorios originales</u></strong><u>,</u>&nbsp;ponerse en contacto con el SAT al tel.932624268 o &nbsp;<a href=\"mailto:sat@riverint.com\">sat@riverint.com</a>, o bien con su delegado de zona.</p><p>&nbsp;</p><p><span style=\"text-decoration: underline;\"><strong>PREVENTA</strong></span>.</p><p>Cataluña, Baleares y Aragón: <a href=\"mailto:jcmacho@telefonica.net\">jcmacho@telefonica.net</a> o <a href=\"mailto:miguel.macho@telefonica.net\">miguel.macho@telefonica.net</a></p><p>Resto zonas:&nbsp; Merche Cavia 932013777</p>"
    // },
    {
        id: "whirlpool",
        name: "WHIRLPOOL",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/WHIRLPOOL/whirlpool.png",
        contacts: [
            {
                name: "Sr. Xavier del Pino Badía",
                phone: "648907430",
                email: "xavier.del.pino@beko.com"
            },
            {
                name: "SAT / REPARACIONES",
                phone: "902 203 204 / 932 382 354",
                email: "avisos_reparacion@whirlpool.com"
            }
        ],
        websites: [
            "https://www.whirlpoolservice.es/"
        ],
        // description: "<table style=\"width: 361pt;\" border=\"0\" width=\"482\" cellspacing=\"0\" cellpadding=\"0\"><colgroup><col style=\"mso-width-source: userset; mso-width-alt: 17123; width: 361pt;\" width=\"482\"> </colgroup><tbody><tr style=\"height: 15.0pt;\"><td class=\"xl65\" style=\"height: 15.0pt; width: 361pt;\" width=\"482\" height=\"20\">Se tramita directamente con el proveedor.</td></tr><tr style=\"height: 15.6pt;\"><td class=\"xl66\" style=\"height: 15.6pt; border-top: none;\" height=\"21\"><p>Le pedirán la fotografía de la etiqueta del modelo y número de serie.&nbsp;</p><p>&nbsp;</p><table style=\"width: 351pt;\" border=\"0\" width=\"468\" cellspacing=\"0\" cellpadding=\"0\"><colgroup><col style=\"mso-width-source: userset; mso-width-alt: 17115; width: 351pt;\" width=\"468\"> </colgroup><tbody><tr style=\"height: 15.75pt;\"><td class=\"xl65\" style=\"height: 15.75pt; width: 351pt;\" width=\"468\" height=\"21\">Para REPARACIONES, los avisos se pueden pasar de varias maneras:</td></tr><tr style=\"height: 15.75pt;\"><td class=\"xl65\" style=\"height: 15.75pt; border-top: none;\" height=\"21\">-Telf. : 902 203204 o bien telf. gratuito: 932382354</td></tr><tr style=\"height: 15.75pt;\"><td class=\"xl65\" style=\"height: 15.75pt; border-top: none;\" height=\"21\">- Por email: avisos_reparacion@whirlpool.com</td></tr><tr style=\"height: 15.75pt;\"><td class=\"xl65\" style=\"height: 15.75pt; border-top: none;\" height=\"21\">- Por Web: https://www.whirlpoolservice.es/&nbsp; , clickar en Nueva asistencia, rellenar el formulario, al final del proceso es posible descargar copia en PDF del aviso.</td></tr></tbody></table></td></tr></tbody></table>"
    },
    {
        id: "winia",
        name: "WINIA",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/WINIA/winia.png",
        contacts: [
            {
                name: "SAT",
                email: "callcenter@svanelectro.com"
            }
        ],
        // downloads: [
        //     {
        //         name: "PLANTILLA_INCIDENCIA_WINIA_(2).xlsx",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1738686157_PLANTILLA_INCIDENCIA_WINIA_(2).xlsx"
        //     },
        //     {
        //         name: "PLANTILLA_INCIDENCIA_WINIA_(2).xlsx",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740503640_PLANTILLA_INCIDENCIA_WINIA_(2).xlsx"
        //     }
        // ],
    },
    {
        id: "wonder",
        name: "WONDER",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/WONDER/logo-wonder.jpg",
        contacts: [
            {
                name: "sr. José Manuel Robledano",
                phone: "606 08 61 29",
                email: "jmrobledano@svanelectro.com"
            },
            {
                name: "SAT / DAÑO ESTETICO",
                phone: "722.34.54.31",
                email: "doa2@svanelectro.com"
            },
            {
                name: "SAT / AVERIA",
                phone: "96.324.67.51 / 96.324.67.52",
                email: "avisos@svanelectro.com"
            }
        ],
        // downloads: [
        //     {
        //         name: "PROTOCOLO_LOGISTICA_INVERSA_SVAN_24_10_22.pdf",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740502122_PROTOCOLO_LOGISTICA_INVERSA_SVAN_24_10_22.pdf"
        //     }
        // ],
        // description: "<p>Se tramita directamente con proveedor:&nbsp;<a href=\"http://doa@svanelectro.com/\" target=\"_blank\" rel=\"noopener\">doa@svanelectro.com</a></p><p>Lea \"Protocolo Logística\" (Procedimiento post venta), y siga sus indicaciones dependiendo del tipo de incidencia, gracias.</p>"
    },
    // {
    //     id: "xgimi",
    //     name: "XGIMI",
    //     websites: [
    //         "https://www.kps-group.com/sat/rma/es/#xgimi-box"
    //     ],
    //     description: "<p>Se tramita directamente con el proveedor.</p><p><span style=\"font-size: 11pt; font-family: Calibri, sans-serif;\">** entre al link de postveta:</span><span style=\"font-size: 11pt; font-family: Calibri, sans-serif;\">&nbsp;</span><a href=\"https://www.kps-group.com/sat/rma/es/#xgimi-box\" style=\"background-color: rgb(255, 255, 255); font-family: Calibri, sans-serif; font-size: 11pt;\">https://www.kps-group.com/sat/rma/es/#xgimi-box</a><span style=\"font-family: Calibri, sans-serif; font-size: 11pt;\">&nbsp;; busque la marca XGIMI y ahí aparecen los pasos a seguir.</span></p><p>Lo puede tramitar directamente cliente final o tienda. No han de volver a RAPITECNIC defectuosos.<span style=\"font-family: Calibri, sans-serif; font-size: 11pt;\"><br></span><br></p><span style=\"font-size:11.0pt;font-family:&quot;Calibri&quot;,sans-serif;mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;mso-ansi-language:ES;mso-fareast-language:EN-US;mso-bidi-language:AR-SA\"></span><u5:p></u5:p>"
    // },
    {
        id: "xiaomi",
        name: "XIAOMI",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/XIAOMI/xiaomi.png",
        // downloads: [
        //     {
        //         name: "Anovo,_manual_instrucciones_ES.pdf",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740260640_Anovo,_manual_instrucciones_ES.pdf"
        //     },
        //     {
        //         name: "ICP-Xiaomi-manual_RMA_PORTAL-ES.pptx",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740260640_ICP-Xiaomi-manual_RMA_PORTAL-ES.pptx"
        //     }
        // ],
        // description: "<p>CONSULTAR CON SU GESTORA</p><p>Pedir autorización según proveedor REGULAR.</p><p>&nbsp;</p><p>SATS oficiales: ANOVO / ICP</p><p>** PATINETES Y PRODUCTOS DE TELEFÓNIA, tramitar directamente con SAT/ANOVO.</p><p>RAPITECNIC no autoriza ninguna devolución sin previa autorización expresa de proveedor.</p><p>&nbsp;</p><p><strong>TV STICK XIAOMI</strong> ( no se puede devolver).&nbsp; Contactar con el Servicio Técnico Oficial de la marca, en este caso ICP, a través de <a href=\"https://logistica3.icp.es/web_icpts/#/\">https://logistica3.icp.es/web_icpts/#/&nbsp;&nbsp;</a></p><p>Deberán darse de alta como usuario previamente si no lo han hecho antes, contactando con &nbsp;<a href=\"mailto:xiaomi.ts@icp.es\">xiaomi.ts@icp.es </a></p><p>y les indicaran el procedimiento a seguir.&nbsp;</p>"
    },
    {
        id: "youin",
        name: "YOUIN",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/YOUIN/youin.png",
        contacts: [
            {
                name: "MANUEL ZARCO",
                phone: "696.077.691",
                email: "mzarcoperez@gmail.com"
            },
            {
                name: "SAT",
                email: "taller@weareyouin.com"
            },
            {
                name: "SAT / DUDAS",
                email: "hi@weareyouin.com"
            }
        ],
        websites: [
            "https://weareyouin.com"
        ],
        // downloads: [
        //     {
        //         name: "Protocolo_SPV_ERSAX_TRADE_2022_-_DOA.docx",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740259719_Protocolo_SPV_ERSAX_TRADE_2022_-_DOA.docx"
        //     },
        //     {
        //         name: "Protocolo_SPV_ERSAX_TRADE_2022_-_RMA.docx",
        //         url: "https://api-products.candelsa.com/storage/app/sats/1740259719_Protocolo_SPV_ERSAX_TRADE_2022_-_RMA.docx"
        //     }
        // ],
        // description: "<p>Se tramita directamente con el proveedor.</p><p>MENOS DE 15 DÍAS (DOA): Enviar email a taller@weareyouin.com, imprescindible&nbsp; adjuntar ticket de venta. Se asignará nºdevolución y se procederá a la recogida del producto directamente en el punto de venta&nbsp;</p><p>MÁS DE 15 DIAS (REPARACIÓN): Acceder a la página web https://weareyouin.com/ apartado Soporte/Taller y solicitar RMA.</p><p>&nbsp;</p>"
    },
    {
        id: "zanussi",
        name: "ZANUSSI",
        logo: "https://bucket-pim.eu-central-1.linodeobjects.com/ZANUSSI/zanussi.png",
        contacts: [
            {
                name: "Israel Tejada Martínez",
                phone: "616 723 866",
                email: "israel.tejada-martinez@electrolux.com"
            },
            {
                name: "SAT",
                phone: "902116388"
            },
            {
                name: "SAT / CAMBIO PUERTA",
                phone: "912186619"
            },
            {
                name: "Atención al Cliente",
                phone: "91.117.80.67"
            }
        ],
        // downloads: [
        //     {
        //         name: "plantilla_Electrolux.xls",
        //         url: "/src/assets/downloads/plantilla_Electrolux.xls"
        //     }
        // ],
        // description: "<p>Se tramita directamente con el proveedor.</p><table style=\"width: 315pt;\" border=\"0\" width=\"420\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr style=\"height: 15.0pt;\"><td class=\"xl65\" style=\"height: 15.0pt; width: 315pt;\" width=\"420\" height=\"20\">Enviar plantilla debidamente cumplimentada</td></tr></tbody></table><p>&nbsp;</p>"
    },
    // {
    //     id: "zte",
    //     name: "ZTE",
    //     logo: "https://bucket-pim.eu-central-1.linodeobjects.com/ZTE/zte.png",
    //     description: "<p>* Ver Procedimiento Adjunto en Plantillas<br></p>"
    // }
];

export default satData;