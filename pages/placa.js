function Placa (){
    return(
        <>
        <title>Placa de Validade RM / Placa</title>
            <div id="tudo">
                <form id="inputForm">
                    <input
                    type="number"
                    id="inputNumber"
                    maxlength="13"
                    placeholder="EAN ou Código Interno"
                    />
                    <input type="date" id="inputDataValidade" />
                    <div id="buttons">
                    <button type="button" onclick="enviarDados()">Gerar Placa</button>
                    <button id="printButton" onclick=" print()">Imprimir</button>
                    <button onclick="cad()">Cadastro</button>
                    <button onclick="sair()">Sair</button>
                    </div>
                </form>
                <div>
                    <table id="tb">
                        <tr id="t0"><th id="a0">Info Impressão</th><td id="b0"> </td></tr>
                        <tr><th id="a1" colspan="2"> </th></tr>
                        <tr><th id="a2">CÓDIGO DO PRODUTO</th> <th id="b1">MÊS/ANO</th></tr>
                        <tr><td id="a3"> </td>
                        <td id="b2" rowspan="8"> </td></tr>
                        <tr><th id="a4">CÓDIGO EAN</th></tr>
                        <tr><td id="a5"> </td></tr>
                        <tr ><td id="a6"class="libre-barcode-ean13-text-regular"> </td></tr>
                        <tr><th id="a7">DATA DO RECEBIMENTO</th></tr>
                        <tr><td id="a8"> </td></tr>
                        <tr><th id="a9">DATA DE VALIDADE</th></tr>
                        <tr><td id="dataValidade"> </td></tr>
                        <tr><th id="a11">DIAS PARA VENCER</th>
                        <td id="b3" rowspan="4"> </td></tr>
                        <tr><td id="a12"> </td></tr>
                        <tr><th id="a13">CONFERENTE</th></tr>
                        <tr><td id="a14"> </td></tr>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Placa