function printPdf() {

  const { jsPDF } = window.jspdf;
  const element = document.getElementById('tb');
  alert("Gerando PDF para impressão...");
  domtoimage.toPng(element)
  
    .then(dataUrl => {
      const pdf = new jsPDF();
      alert(dataUrl)

      const imgWidth = 210; // Largura da página A4 em mm
      const imgHeight = (element.offsetHeight * imgWidth) / element.offsetWidth;
      alert(pdfBlob)

      pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight);
      alert( )

      // Gera o conteúdo do PDF como um blob
      const pdfBlob = pdf.output('blob');
      // Cria um URL para o blob e abre em uma nova aba
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const printWindow = window.open(pdfUrl, '_blank');
      alert(pdfBlob)

      // Aguarda a janela carregar e dispara o comando de impressão
      printWindow.onload = function () {
        printWindow.print();
      };
      alert(pdfBlob)

    })
    .catch(error => {
      console.error('Erro ao gerar PDF:', error);
      alert(pdfBlob)

    });
    alert("fim")

}
