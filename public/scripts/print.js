function pdf() {
  let estilo = ` 
* {
  margin: 0px;
  padding: 0px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

  table {

      height:198mm ;
      width:295mm;

      gap: 0px;
      border-collapse: collapse;
      text-align: center;
      background-color: white;
    }

    tr,
    th,
    td,
    thead {
      text-align: center;
      border: 1px solid #000;
      gap: 0px;
      border-collapse: collapse;
      margin: 0px;
      height: 0px;
    }

    /*estilo tabela*/

    th {
      font-size: 0.7em;
      background-color: orange;
      color: #222;
    }

    #a0,
    #b0 {
      font-size: 0.8em;
      background-color: white;
    }

    #a1 {
      font-size: 8em;
      background-color: white;
      max-height: 500px;
      line-height: 0.8;
      margin: 5px;
    }

    #a3,
    #a5 {
      background-color: white;
      font-size: 1.5em;
      font-weight: bold;
    }


    #b2 {
      width: 800px;
      font-size: 20em;
      font-weight: bold; 

    }
    #b3 {
      font-size: 2em;
      font-weight: bold;
    }

    #a6{
      font-size: 2em;

    }

    .libre-barcode-ean13-text-regular {
      font-family: "Libre Barcode EAN13 Text", system-ui;
      font-weight: 400;
      font-style: normal;
    }

    #dataValidade {
      font-size: 4em;
      font-weight: bold;
    }

    footer {
      position: fixed;
      left: 50%;
      transform: translate(-40%);
      opacity: 20%;
      bottom: 5px;
      font-size: 0.8em;
      text-align: center;
    }

    footer:hover {
      position: fixed;
      left: 50%;
      opacity: 100%;

      bottom: 5px;
      font-size: 0.8em;
      text-align: center;
      transition: 500ms ease;
    }

`;
  const table = document.getElementById("tb").innerHTML;

  const win = window.open("", "", "height=2480,width=3508 ");
  win.document.write(' <html "> <head>');
  win.document.write(" <title>tete impressão pdf </title> <style>");
  win.document.write(estilo);
  win.document.write("</style></head><body>");
  win.document.write("<table>", table, "</table>");
  win.document.write(" </body></html>");

  win.print();
}
