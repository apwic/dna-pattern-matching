let text = "How are you doing today?";
let dateRegex = /[1-31]/g;
let monthRegex = /Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember/g;
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
// let contoh = "13 April 2022"
// let contoh2 = "13 April 2022 Penyakit"
// let contoh3 = "Penyakit"
// let contoh4 = "Penyakit Parah Banget"
// let contoh5 = "13 April 2022 Penyakit Parah Banget"
// let contoh6 = "Apasih35"
// let contoh7 = "3729347"

// let hasil = parseString(contoh);
// console.log("Input 1 = " + contoh);
// console.log(hasil);
// console.log("Contoh 1 = " + hasil + "\n\n");

// hasil = parseString(contoh2);
// console.log("Input 2 = " + contoh2);
// console.log(hasil);
// console.log("Contoh 2 = " +hasil + "\n\n");

// hasil = parseString(contoh3);
// console.log("Input 3 = " + contoh3);
// console.log("Contoh 3 = " +hasil + "\n\n");

// hasil = parseString(contoh4);
// console.log("Input 4 = " + contoh4);
// console.log("Contoh 4 = " +hasil + "\n\n");

// hasil = parseString(contoh5);
// console.log("Input 5 = " + contoh5);
// console.log("Contoh 5 = " +hasil + "\n\n");

// hasil = parseString(contoh6);
// console.log("Input 6 = " + contoh6);
// console.log("Contoh 6 = " +hasil + "\n\n");

// hasil = parseString(contoh7);
// console.log("Input 7 = " + contoh7);
// console.log("Contoh 7 = " +hasil + "\n\n");