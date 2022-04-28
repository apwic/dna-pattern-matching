let text = "How are you doing today?";
let dateRegex = /[1-31]/g;
let monthRegex = /[Jj]anuari|[Ff]ebruari|[Mm]aret|[Aa]pril|[Mm]ei|[Jj]uni|[Jj]uli|[Aa]gustus|[Ss]eptember|[Oo]ktober|[Nn]ovember|[Dd]esember/g;
let yearRegex = /[0-9][0-9][0-9][0-9]/g;
let nameRegex = /^[A-Z][a-z]+/g;

// Type
// 0. Format Salah
// 1. Tanggal
// 2. Tanggal - Nama Penyakit
// 3. Nama Penyakit
function monthNumber(month){
    if (month == January){
        return 1;
    } else if (month == February){
        return 2;
    } else if (month == March){
        return 3;
    } else if (month == April){
        return 4;
    } else if (month == May){
        return 5;
    } else if (month == June){
        return 6;
    } else if (month == July){
        return 7;
    } else if (month == August){
        return 8;
    } else if (month == September){
        return 9;
    } else if (month == October){
        return 10;
    } else if (month == November){
        return 11;
    } else if (month == December){
        return 12;
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
        let yearReg = year.match(yearRegex);
        if (dateReg != null && monthReg != null && yearReg != null){
            console.log(dateReg);
            console.log(monthReg);
            console.log(yearReg);
            return 1;
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
        let yearReg = year.match(yearRegex);
        if (dateReg != null && monthReg != null && yearReg != null){
            console.log(dateReg);
            console.log(monthReg);
            console.log(yearReg);
            console.log(date + " " + month + " " + year);
            console.log(name);
            return 2;
        } 
    }
    
    // Kasus penyakit
    let name ="";
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
        return 3;
    }

    // Kasus format salah
    return 0;
}

let contoh = "13 april 2022"
let contoh2 = "13 April 2022 Penyakit"
let contoh3 = "Penyakit"
let contoh4 = "Penyakit Parah Banget"
let contoh5 = "13 April 2022 Penyakit Parah Banget"
let contoh6 = "Apasih35"
let contoh7 = "3729347"

let hasil = parseString(contoh);
console.log("Input 1 = " + contoh);
console.log("Contoh 1 = " + hasil + "\n\n");

hasil = parseString(contoh2);
console.log("Input 2 = " + contoh2);
console.log("Contoh 2 = " +hasil + "\n\n");

hasil = parseString(contoh3);
console.log("Input 3 = " + contoh3);
console.log("Contoh 3 = " +hasil + "\n\n");

hasil = parseString(contoh4);
console.log("Input 4 = " + contoh4);
console.log("Contoh 4 = " +hasil + "\n\n");

hasil = parseString(contoh5);
console.log("Input 5 = " + contoh5);
console.log("Contoh 5 = " +hasil + "\n\n");

hasil = parseString(contoh6);
console.log("Input 6 = " + contoh6);
console.log("Contoh 6 = " +hasil + "\n\n");

hasil = parseString(contoh7);
console.log("Input 7 = " + contoh7);
console.log("Contoh 7 = " +hasil + "\n\n");