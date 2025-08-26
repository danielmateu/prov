export default function plantillaHTML(content) {
    const template = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-micro-com:office:office" lang="ES">
      <head>
      <meta charset="UTF-8">
      <meta content="width=device-width, initial-scale=1" name="viewport">
      <meta name="x-apple-disable-message-reformatting">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta content="telephone=no" name="format-detection">
      <title>Nueva plantilla de correo electr%C3%B3nico 2023-12-21</title>
      <style type="text/css">
      .rollover:hover .rollover-first {
        max-height:0px!important;
        display:none!important;
      }
      .rollover:hover .rollover-second {
        max-height:none!important;
        display:block!important;
      }
      .rollover span {
        font-size:0px;
      }
      u + .body img ~ div div {
        display:none;
      }
      #outlook a {
        padding:0;
      }
      span.MsoHyperlink, span.MsoHyperlinkFollowed {
        color:inherit;
        mso-style-priority:99;
      }
      a.es-button {
        mso-style-priority:100!important;
        text-decoration:none!important;
      }
      a[x-apple-data-detectors] {
        color:inherit!important;
        text-decoration:none!important;
        font-size:inherit!important;
        font-family:inherit!important;
        font-weight:inherit!important;
        line-height:inherit!important;
      }
      .es-desk-hidden {
        display:none;
        float:left;
        overflow:hidden;
        width:0;
        max-height:0;
        line-height:0;
        mso-hide:all;
      }
      .es-button-border:hover > a.es-button {
        color:#ffffff!important;
      }
    @media only screen and (max-width:600px) {.es-m-p0r { padding-right:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0r { padding-right:0px!important } *[class="gmail-fix"] { display:none!important } p, a { line-height:150%!important } h1, h1 a { line-height:120%!important } h2, h2 a { font-size:16px!important; line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important } h1 { font-size:30px!important; text-align:center } h2 { font-size:16px!important; text-align:center } h3 { font-size:20px!important; text-align:center } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:16px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover span, .es-m-txt-c .rollover span, .es-m-txt-l .rollover span { line-height:0!important; font-size:0!important } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:20px!important; line-height:120%!important } a.es-button, button.es-button, .es-button-border { display:block!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .adapt-img { width:100%!important; height:auto!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .es-social td { padding-bottom:10px } .h-auto { height:auto!important } .es-text-8596, .es-text-8596 p, .es-text-8596 a, .es-text-8596 h1, .es-text-8596 h2, .es-text-8596 h3, .es-text-8596 h4, .es-text-8596 h5, .es-text-8596 h6, .es-text-8596 ul, .es-text-8596 ol, .es-text-8596 li, .es-text-8596 span, .es-text-8596 sup, .es-text-8596 sub, .es-text-8596 u, .es-text-8596 b, .es-text-8596 strong, .es-text-8596 em, .es-text-8596 i { font-size:10px!important } .es-text-3852, .es-text-3852 p, .es-text-3852 a, .es-text-3852 h1, .es-text-3852 h2, .es-text-3852 h3, .es-text-3852 h4, .es-text-3852 h5, .es-text-3852 h6, .es-text-3852 ul, .es-text-3852 ol, .es-text-3852 li, .es-text-3852 span, .es-text-3852 sup, .es-text-3852 sub, .es-text-3852 u, .es-text-3852 b, .es-text-3852 strong, .es-text-3852 em, .es-text-3852 i { font-size:10px!important } }
    @media screen and (max-width:384px) {.mail-message-content { width:414px!important } }
    </style>
      </head>
      <body class="body" style="width:100%;height:100%;padding:0;Margin:0">
      <div dir="ltr" class="es-wrapper-color" lang="ES" style="background-color:#FFFFFF"><!--[if gte mso 9]>
                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                    <v:fill type="tile" color="#ffffff"></v:fill>
                </v:background>
            <![endif]-->
        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none" style="border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FFFFFF">
          <tr>
          <td valign="top" style="padding:0;Margin:0">
            <table cellpadding="0" cellspacing="0" class="es-header" align="center" role="none" style="border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
              <tr>
              <td align="center" style="padding:0;Margin:0">
                <table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0" cellspacing="0" role="none" style="border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                  <tr>
                  <td class="esdev-adapt-off" align="left" style="padding:20px;Margin:0">
                    <table cellpadding="0" cellspacing="0" class="esdev-mso-table" role="none" style="border-collapse:collapse;border-spacing:0px;width:600px">
                      <tr>
                      <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                        <table cellpadding="0" cellspacing="0" class="es-left" align="left" role="none" style="border-collapse:collapse;border-spacing:0px;float:left">
                          <tr>
                          <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:260px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="border-collapse:collapse;border-spacing:0px">
                              <tr>
                              <td align="left" style="padding:0;Margin:0;font-size:0px"><a target="_blank" style="text-decoration:underline;color:#926B4A;font-size:14px;display:block" width="160" title="Logo" alt="Logo" href="https://rapitecnic.com/"><img src="https://images.rapitecnic.com/template/logoV.png" alt="Logo" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none" width="160" title="Logo" height="111"></a></td>
                              </tr>
                            </table></td>
                          </tr>
                        </table></td>
                      </tr>
                    </table></td>
                  </tr>
                  <tr>
                  <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-right:20px;padding-left:20px">
                    <table cellpadding="0" cellspacing="0" width="100%" role="none" style="border-collapse:collapse;border-spacing:0px">
                      <tr>
                      <td valign="top" style="padding:0;Margin:0;width:600px">
                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="border-collapse:collapse;border-spacing:0px">
                            ${content}
                        </table>
                      </td>
                      </tr>
                    </table></td>
                  </tr>
                </table></td>
              </tr>
            </table>
            <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
              <tr>
              <td align="center" style="padding:0;Margin:0">
                <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" role="none" style="border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                  <tr>
                  <td align="left" style="padding:0;Margin:0;padding-right:20px;padding-left:20px">
                    <table cellpadding="0" cellspacing="0" width="100%" role="none" style="border-collapse:collapse;border-spacing:0px">
                      <tr>
                      <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="border-collapse:collapse;border-spacing:0px">
                          <tr>
                          <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0">
                            <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px">
                              <tr>
                              </tr>
                            </table></td>
                          </tr>
                        </table></td>
                      </tr>
                    </table></td>
                  </tr>
                </table></td>
              </tr>
            </table>
            <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
              <tr>
              <td align="center" bgcolor="#9a4785" style="padding:0;Margin:0;background-color:#9a4785">
                <table bgcolor="#9a4785" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;background-color:#9a4785;width:600px" role="none">
                  <tr>
                  <td align="left" style="padding:15px;Margin:0">
                    <table cellpadding="0" cellspacing="0" width="100%" role="none" style="border-collapse:collapse;border-spacing:0px">
                      <tr>
                      <td align="left" style="padding:0;Margin:0;width:570px">
                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="border-collapse:collapse;border-spacing:0px">
                          <tr>
                          <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0">
                            <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="border-collapse:collapse;border-spacing:0px">
                              <tr>
                              <td align="center" valign="top" class="es-m-p0r" style="padding:0;Margin:0;padding-right:20px"><a target="_blank" href="https://www.instagram.com/rapitecnicserviciointegral/" style="text-decoration:underline;color:#926B4A;font-size:14px"><img title="Instagram" src="https://images.rapitecnic.com/template/instagramLogo.png" alt="Inst" height="32" width="32" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                              <td align="center" valign="top" class="es-m-p0r" style="padding:0;Margin:0;padding-right:20px"><a target="_blank" href="https://www.facebook.com/Rapitecnic/" style="text-decoration:underline;color:#926B4A;font-size:14px"><img title="Facebook" src="https://images.rapitecnic.com/template/facebookLogo.png" alt="Fb" height="32" width="32" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                              <td align="center" valign="top" class="es-m-p0r" style="padding:0;Margin:0;padding-right:20px"><a target="_blank" href="https://www.youtube.com/channel/UCCSg5F-7nNv9vObzE8p0Ecw" style="text-decoration:underline;color:#926B4A;font-size:14px"><img title="Youtube" src="https://images.rapitecnic.com/template/youtubeLogo.png" alt="Yt" height="32" width="32" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                              <td align="center" valign="top" class="es-m-p0r" style="padding:0;Margin:0;padding-right:20px"><a target="_blank" href="https://www.tiktok.com/@rapitecnicsl/" style="text-decoration:underline;color:#926B4A;font-size:14px"><img title="TikTok" src="https://images.rapitecnic.com/template/tiktokLogo.png" alt="Tt" height="32" width="32" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                              <td align="center" valign="top" style="padding:0;Margin:0"><a target="_blank" href="https://www.linkedin.com/company/rapitecnic/" style="text-decoration:underline;color:#926B4A;font-size:14px"><img title="Linkedin" src="https://images.rapitecnic.com/template/linkedinLogo.png" alt="In" height="32" width="32" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                              </tr>
                            </table></td>
                          </tr>
                          <tr>
                          <td align="center" class="es-m-txt-c es-text-3852" style="padding:5px;Margin:0"><p style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;letter-spacing:0;color:#ffffff;font-size:9px">Rapitecnic Servicio Integral S.L - B-66443854</p><p style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;letter-spacing:0;color:#ffffff;font-size:9px">Web: <a style="text-decoration:underline;color:#fbaf89;font-size:9px" target="_blank" href="https://rapitecnic.com/">rapitecnic.com</a></p></td>
                          </tr>
                        </table></td>
                      </tr>
                    </table></td>
                  </tr>
                </table></td>
              </tr>
            </table>
            <table cellpadding="0" cellspacing="0" class="es-footer" align="center" role="none" style="border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:#E3CDC1;background-repeat:repeat;background-position:center top">
              <tr>
              <td align="center" bgcolor="#ffffff" style="padding:0;Margin:0;background-color:#ffffff">
                <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" role="none">
                  <tr>
                  <td align="left" style="padding:20px;Margin:0">
                    <table cellpadding="0" cellspacing="0" width="100%" role="none" style="border-collapse:collapse;border-spacing:0px">
                      <tr>
                      <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="border-collapse:collapse;border-spacing:0px">
                          <tr>
                          <td align="center" class="es-infoblock made_with" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0px"><a target="_blank" href="https://rapitecnic.com/" style="text-decoration:underline;color:#CCCCCC;font-size:12px"><img src="https://images.rapitecnic.com/template/logo.png" alt="" width="180" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none" height="48"></a></td>
                          </tr>
                          <tr>
                          <td align="center" class="es-m-txt-c es-text-8596" style="padding:15px;Margin:0"><p style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;letter-spacing:0;color:#666666;font-size:9px">Aquest correu electrònic i qualsevol arxiu adjunt són confidencials i destinats exclusivament per a l'ús de l'individu o entitat a la qual estan dirigits. Si ha rebut aquest correu electrònic per error, si us plau notifiqui-ho al remitent immediatament i elimini aquest correu del seu sistema.</p></td>
                          </tr>
                        </table></td>
                      </tr>
                    </table></td>
                  </tr>
                </table></td>
              </tr>
            </table></td>
          </tr>
        </table>
      </div>
      </body>
    </html>
    `

    return template
}