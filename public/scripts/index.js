

function sair() {
  const loading = document.getElementById("contneinerLoading");

  // Mostrar a animação de carregamento
  loading.style.display = "flex";

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
  const loading = document.getElementById("contneinerLoading");

  // Mostrar a animação de carregamento
  loading.style.display = "flex";

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
/*
function placa() {
  const loading = document.getElementById("contneinerLoading");

  // Mostrar a animação de carregamento
  loading.style.display = "flex";

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
*/
async function cadastrar() {
  const loading = document.getElementById("contneinerLoading");
  // Mostrar a animação de carregamento
  loading.style.display = "flex";

  const data = {
    info: document.getElementById("info").value,
    ean: document.getElementById("ean").value,
    codint: document.getElementById("codint").value,
  };

  try {
    const response = await fetch("/cadastro/dados", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status == 200) {
      const result = await response.json();
      alert("Cadastro realizado com sucesso");
      window.location.href = "/placa";
    } else {
      alert("Erro ao Cadastrar!");
      window.location.href = "/cadastro";
    }
  } catch (error) {
    alert("Erro ao enviar dados:", error);
    console.error("Erro ao enviar dados:", error);
  }
}
