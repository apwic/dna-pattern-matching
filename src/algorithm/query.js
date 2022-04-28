let text = "How are you doing today?";
let dateRegex = /[1-31]/g;
let monthRegex = /[Jj]anuari|[Ff]ebruari|[Mm]aret|[Aa]pril|[Mm]ei|[Jj]uni|[Jj]uli|[Aa]gustus|[Ss]eptember|[Oo]ktober|[Nn]ovember|[Dd]esember/g;
let yearRegex = /[0-9][0-9][0-9][0-9]/g;
let nameRegex = /^[A-Za-z]+/g;

// Type
// 0. Format Salah
// 1. Tanggal
// 2. Tanggal - Nama Penyakit
// 3. Nama Penyakit
function monthToInt(month) {
  if (month === "Januari"){
    return "01";
  } else if (month === "Februari"){
    return "02";
  } else if (month === "Maret"){
    return "03";
  } else if (month === "April"){
    return "04";
  } else if (month === "Mei"){
    return "05";
  } else if (month === "Juni"){
    return "06";
  } else if (month === "Juli"){
    return "07";
  } else if (month === "Agustus"){
    return "08";
  } else if (month === "September"){
    return "09";
  } else if (month === "Oktober"){
    return "10";
  } else if (month === "November"){
    return "11";
  } else if (month === "Desember"){
    return "12";
  }
}

function parseString(array){
    const myArray = array.split(" ");

    // Kasus tanggal aja
    if (myArray.length == 3){
        let date = myArray[0];
        let month = myArray[1];
        let year = myArray[2];
        let query = [];
        console.log(date + " " + month + " " + year);
        let dateReg = date.match(dateRegex);
        let monthReg = month.match(monthRegex);
        monthReg = monthToInt(monthReg[0]);
        let yearReg = year.match(yearRegex);
        if (dateReg != null && monthReg != null && yearReg != null){
            return {type: 1, tanggal: yearReg + "-" + monthReg + "-" + date, penyakit: null};
        } 
    }

    // Kasus tanggal dan nama penyakit
    if (myArray.length >= 4){
        let date = myArray[0];
        let month = myArray[1];
        let year = myArray[2];
        let name = "";
        for (let i = 3; i < myArray.length; i++){
            name += myArray[i];
            if (i != myArray.length - 1){
                name += " ";
            }
        }
        console.log(date + " " + month + " " + year);
        console.log(name);
        let dateReg = date.match(dateRegex);
        let monthReg = month.match(monthRegex);
        monthReg = monthToInt(monthReg[0]);
        let yearReg = year.match(yearRegex);
        if (dateReg != null && monthReg != null && yearReg != null){
            return {type: 2, tanggal: yearReg + "-" + monthReg + "-" + date, penyakit: name};
        } 
    }
    
    // Kasus penyakit
    let name = "";
    for (let i = 0; i < myArray.length; i++){
        name += myArray[i];
        if (i != myArray.length - 1){
            name += " ";
        }
    }

    let nameReg = name.match(nameRegex);
    if(nameReg != null){
        console.log(nameReg);
        console.log(name);
        return {type: 3, tanggal: null, penyakit: name};
    }

    // Kasus format salah
    return {type: 0, tanggal: null, penyakit: null};
}

module.exports = {parseString};