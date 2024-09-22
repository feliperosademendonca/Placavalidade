require("dotenv").config();

function processarDatas(dataValidade) {

  

  console.log("chamou ProcessarDatas " + dataValidade);

  if (!dataValidade) {
    console.log("Por favor, insira uma data válida.");
    return;
  }

  const selectedDate = new Date(dataValidade);
  const currentDate = new Date();

  if (isNaN(selectedDate)) {
    console.log("Por favor, insira uma data válida.");
    return;
  }

  const currentDateyear = currentDate.getFullYear();
  const currentDatemonth = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Months are zero-based
  const currentDateday = ("0" + currentDate.getDate()).slice(-2);
  const currentDatehoras = ("0" + currentDate.getHours()).slice(-2);
  const currentDateminutos = ("0" + currentDate.getMinutes()).slice(-2);
  const currentDatesegundos = ("0" + currentDate.getSeconds()).slice(-2);
  const currentDateFormatada = `${currentDateday}/${currentDatemonth}/${currentDateyear}`;
  const horaFormatada = `${currentDatehoras}:${currentDateminutos}:${currentDatesegundos}`;
  const dataAtualCompleta = `${currentDateFormatada} ${horaFormatada} `;

  // Adjust the time of the dates to ensure proper comparison
  selectedDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  const differenceInTime = selectedDate.getTime() - currentDate.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  console.log(`A diferença é de ${differenceInDays} dia(s).`);

  const selectedDateDateyear = selectedDate.getFullYear();
  const selectedDateDatemonth = ("0" + (selectedDate.getMonth() + 1)).slice(-2); // Months are zero-based
  const selectedDateDateday = ("0" + selectedDate.getDate()).slice(-2);
  const selectedDateFormatada = `${selectedDateDateday}/${selectedDateDatemonth}/${selectedDateDateyear}`;

  const dataMenos10 = new Date(selectedDate);
  dataMenos10.setDate(dataMenos10.getDate() - 10);

  const newYear = dataMenos10.getFullYear();
  const newMonth = ("0" + (dataMenos10.getMonth() + 1)).slice(-2); // Months are zero-based
  const newDay = ("0" + dataMenos10.getDate()).slice(-2);

  const newDate = `${newDay}/${newMonth}/${newYear}`;

  const datas = {
    novaData: newDate,
    novoAno: newYear,
    novoMes: newMonth,
    novoDia: newDay,
    diasParaVencer: differenceInDays,
    dataAtualCompleta: dataAtualCompleta,
    dataDeRecebimento: currentDateFormatada, //dia de hoje
    dataDeValidade: selectedDateFormatada,
  };

  return datas;
}

module.exports = { processarDatas };
