let respostaServidor; // Variável global para armazenar a resposta do servidor


function login() {
  console.log("iniciou o login")
    const loading = document.getElementById('contneinerLoading');
        loading.style.display = 'flex';

  
    const u = document.getElementById("u").value;
    const s = document.getElementById("s").value;
    fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ u, s }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
         if (data.success) {
          console.log("Login bem-sucedido. Redirecionando...");
   
          window.location.href = "/placa"; 
        } else {
          console.error("Erro:", data.message);
          messageDiv.textContent = data.message;  
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        messageDiv.textContent = "Ocorreu um erro ao processar o login.";  
      });
  }

function enviarDados() {
  const loading = document.getElementById('contneinerLoading');
     loading.style.display = 'flex';


  const inputValor = document.getElementById("inputNumber").value;
  const dateValor = document.getElementById("inputDataValidade").value;
  if (inputValor == "") {
    alert("Digite um Codigo interno ou EAN do produto valido");
  } else {
     fetch("/placa", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputValor, dateValor }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Processar a resposta como JSON
        } else {
          console.log(response.status);
          console.error("Erro ao consultar produto");
        }
      })
      .then((data) => {
        // Acessar a URL da resposta JSON e redirecionar o usuário, se necessário
        window.location.href = data.url;
      })
      .catch((error) => {
        console.error("Erro ao realizar consulta:", error);
      });
  }
}
function sair() {
  const loading = document.getElementById('contneinerLoading');
    
    // Mostrar a animação de carregamento
    loading.style.display = 'flex';


  fetch("/sair", {
    method: "GET",
  })
    .then((response) => {
      if (response.status === 200) {
        // Redirecionar para a página após o logout
        window.location.href = "/";
      } else {
        console.log(response.status);
        console.error("Erro 1 ao realizar o logout");
      }
    })
    .catch((error) => {
      console.log(response.status);
      console.error("Erro 2 ao realizar o logout:", error);
    });
}

function cad() {
  const loading = document.getElementById('contneinerLoading');
    
    // Mostrar a animação de carregamento
    loading.style.display = 'flex';


  fetch("/cadastro", {
    method: "GET",
  })
    .then((response) => {
      if (response.status === 200) {
        // Redirecionar para a página após o logout
        window.location.href = "/cadastro";

      } else {
        console.log(response.status);
        console.error("Erro 1 ao realizar o cadastro");
      }
    })
    .catch((error) => {
      console.log(response.status);
      console.error("Erro 2 ao realizar o cadastro:", error);
      window.location.href = "/cadastro";

    });
}

function placa() {
  const loading = document.getElementById('contneinerLoading');
    
    // Mostrar a animação de carregamento
    loading.style.display = 'flex';


  fetch("/placa", {
    method: "GET",
  })
    .then((response) => {
      if (response.status === 200) {
        console.log(response.status);
        window.location.href = "/placa";

      } else {
        console.log(response.status);
        window.location.href = "/placa";
      }
    })
    .catch((error) => {
      console.log(response.status);
      window.location.href = "/placa";
    });
}

 
async function  cadastrar() {
  const loading = document.getElementById('contneinerLoading');
    // Mostrar a animação de carregamento
    loading.style.display = 'flex';


  const data = {
    info: document.getElementById("info").value,
    ean: document.getElementById("ean").value,
    codint: document.getElementById("codint").value,
  };

  try {
    
    const  response =   await fetch("/cadastro/dados", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
 
    if (response.status == 200) {
      const result = await response.json();
      alert("Cadastro realizado com sucesso")
      window.location.href = "/placa";

    } else {
       alert("Erro ao Cadastrar!")
      window.location.href = "/cadastro";


    }
  } catch (error) {
    alert("Erro ao enviar dados:", error)
    console.error("Erro ao enviar dados:", error);
 
  }
} 

 