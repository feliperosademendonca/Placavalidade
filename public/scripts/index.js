function sair() {
  alert("sair");
  const loading = document.getElementById("contneinerLoading");

  // Mostrar a animação de carregamento
  loading.style.display = "flex";

  // Remover um item específico do localStorage
  localStorage.removeItem("authToken"); // Substitua "nomeDoItem" pelo nome do seu item
  window.location = "/";
  // Caso queira fazer mais alguma ação antes de redirecionar ou concluir, adicione aqui.
}
