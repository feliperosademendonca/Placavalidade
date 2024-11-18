import { Html, Head, Main, NextScript } from "next/document";

function Document() {

    return(
    <Html>
        <Head>
            <meta charset="utf-8"/>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="css/style.css" />
            <link rel="stylesheet" href="css/print.css" />
            <link rel="stylesheet" href="css/mobile.css" />
            <link rel="shortcut icon" href="img/icon.png" type="image/x-icon"/>
            <script src="/scripts/index.js"></script>
            <script src="/scripts/table.js"></script>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonimous"/>
            <link href="https://fonts.googleapis.com/css2?family=Libre+Barcode+EAN13+Text&display=swap" rel="stylesheet"/>
        </Head>
        <body> 

            <Main/>
 
            <NextScript/>

 
        </body>
       
    </Html>
);
}

export default Document