function Pesquisa(){
    return(
        <>  
        <title>Placa de Validade RM / Placa</title>
 
        <div id="tudo">
            <table id="tb">
                <tr id="t0"><th id="a0">Info Impressão</th> <td id="b0">xx/xx/xxxx as xx:xx:xx</td></tr>
                <tr><th id="a1" colspan='2'> info</th></tr>
                <tr ><th id="a2">CÓDIGO DO PRODUTO</th> <th id="b1">MÊS/ANO</th></tr>
                <tr><td id="a3"> </td> <td id="b2"rowspan='8'>xx</td></tr>
                <tr><th id="a4">CÓDIGO EAN</th> </tr>
                <tr><td id="a5"> </td> </tr>
                <tr ><td id="a6">  </td></tr>
                <tr><th id="a7">DATA DO RECEBIMENTO</th> </tr>
                <tr><td id="a8"> </td> </tr>
                <tr><th id="a9" >DATA DE VALIDADE</th> </tr>
                <tr><td id="dataValidade">xx/xx/xx</td> </tr>
                <tr><th id="a11">DIAS PARA VENCER</th> <td id="b3" rowspan="4">xxxx</td> </tr>
                <tr><td id="a12">xx/xx/xx</td> </tr>
                <tr><th id="a13">CONFERENTE</th> </tr>
                <tr><td id="a14">xxx</td> </tr>
            </table>
        </div>
 
        </>
    )
}

export default Pesquisa;