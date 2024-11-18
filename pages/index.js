 
import GlobalStyle from "./styles/style "
import { login } from "../public/scripts/index";
function Index () {

    return(

          <>


        <title>Placa de Validade RM / login</title>
        <GlobalStyle/>
        <div id="tudo">
        <h1>Placa de Validade RM</h1>
        <div id="divFormLogin">
            <form id="loginForm" onsubmit="return false;">
            <input type="text" id="u" placeholder="NOME" />
            <input type="password" name="" id="s" placeholder="SENHA" />
            <button type="submit" onClick={login} id="btnLogin">LOGIN</button>
            </form>
        </div>
        </div>
        
      
          </>

    )
}


 export default Index;