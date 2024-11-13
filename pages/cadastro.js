function Cadastro () {

    return(
        <>
        <title>Placa - Validade / Cadastro de Produto</title>

       
        <div id="tudo">
            <h1>CADASTRO DE PRODUTO</h1>
            <div id="divFormCadastro">
            <form id="buttons">
                <input type="text" id="ean" placeholder="EAN" />
                <input type="text" id="codint" placeholder="Código interno" />
                <input
                type="textarea"
                id="info"
                maxlength="250"
                placeholder="Descrição do Produto"
                />

                <div id="msg"></div>
            </form>
            <button onclick="cadastrar()">Cadastrar</button>
            <button onclick="placa()">Placa</button>
            <button onclick="sair()">Sair</button>
            </div>
        </div>
    
        </>
    )
}

export default Cadastro