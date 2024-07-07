document.addEventListener("DOMContentLoaded", () => {
  function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    console.log(urlParams.get(name));

    return urlParams.get(name);
  }

  // Obter o valor do parâmetro 'ean'
  const ean = getParameterByName("ean");

  if (ean) {
    console.log(`EAN recebido: ${ean}`);

    // Renderiza o código de barras
    JsBarcode("#barcode", ean);

    // Adiciona uma mensagem de sucesso ao DOM
    document.getElementById("a6").innerHTML(ean);
  } else {
    console.error("EAN não fornecido");
    document.getElementById("a6").textContent = "EAN não fornecido";
  }
});
