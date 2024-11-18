import { createGlobalStyle } from "styled-components"; 
export default createGlobalStyle` 

@font-face {
  font-family: 'ean13';
  src: url('fonts/ean13.woff') format('woff'),
       url('fonts/ean13.ttf') format('truetype');
  font-weight: normal; /* Ou 'bold' se necessário */
}

* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  text-transform: uppercase;
}

body {
  background-color: #8dbbe8;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 16px;
}

#tudo {
  min-width: 300px;
}

h1 {
  background-color: #004080;
  color: #fff;
  text-align: center;
}

#divFormLogin {
  display: flex;
  justify-items: center;
  align-items: center;
  /*background-color: aqua;*/
  width: 100%;
  height: 90vh;
  padding: 5px;
  top: 5px;
}

form {
  /* background-color: rgb(16, 58, 58);*/
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  width: 320px;
  min-width: 320px;
  margin: auto;
  text-align: center;
}

#u,
#s {
   text-align: center;
}

#btnLogin,
button {
  font-size: 1em;
  font-weight: bolder;
  padding: 3px;
  margin: auto;
  margin-top: 1em;
  border: #004080 1px solid;
  box-shadow: inset 1px 1px 1px #fff;
  width: 217px;
  background-color: orange;
  color: #004080;
  text-align: center;
  border-radius: 3px;
}

#btnLogin:active {
  display: block;
  font-size: 0.8em;
  padding: 2px;
  margin: auto;
  margin-top: 7px;
  border: #ffffff 2px solid;
  width: 215px;
  background-color: #004080;
  color: #fff;
  text-align: center;
  border-radius: 1px;
  transition: 70ms;
}

#buttons {
  display: inline-block;
  max-width: 350px;
  min-width: 330px;
  max-width: 350px;
  margin-top: 10px;
  margin: auto;
}

#buttons > button {
  max-width: 150px;
  margin: 5px;
  align-items: center;
  justify-content: center;
  padding: 5px;
  justify-items: center;
}

::placeholder {
  padding: 5px;
  text-align: center;
}

#inputForm {
  padding: 5%;
  font-size: 1.1em;
}

#eanOuCodigo {
  margin: auto;
  height: 30px;
  border-radius: 3px;
}

#InputdataValidade,
#eanOuCodigo {
  display: block;
  height: 30px;
  margin-top: 2%;
}

#inputForm > button {
  margin-top: 5%;
  height: 30px;
  width: 100px;
  justify-content: space-around;
}

/*daqui pra baixo é a tabela de visualização*/
table {
  width: 100vw;
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
  font-size: 10em;
  font-weight: bold;
}
#b3 {
  font-size: 2em;
  font-weight: bold;
}

 #a6{
  transform: scaleX(4);

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
  `
 
