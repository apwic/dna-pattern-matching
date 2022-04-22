// Input
let penyakit = "AGTCAACGTTGCATGTCGCATGATGCATGAGAGCT"
let text = "ACGTTGCATGTCGCATGATACATGAGAGCT";

// Regex
let pattern = /^[ACGT]+$/g;
let result = text.match(pattern);
if (result != null && result[0].length == text.length) {
    console.log("ACGT");
    console.log(result);
} else {
    console.log("Not ACGT");
}

// KMP Algorithm
function kmpMatch(text, pattern){
    var n = text.length;
    var m = pattern.length;
    var i = 0;
    var j = 0;
    var next = pattern.length > 0 ? computeFailure(pattern) : [];
    while(i < n && j < m){
        if(text[i] == pattern[j]){
            if (j == m - 1){
                return i - m + 1;
            }
            i++;
            j++;
        }else if (j > 0){
            j = next[j - 1];
        }else{
            i++;
        }
    }
    if(j == m){
        return i - j;
    }else{
        return -1;
    }
}

function computeFailure(pattern){
    var m = pattern.length;
    var next = new Array(m);
    next[0] = 0;
    var i = 1;
    var j = 0;
    while(i < m){
        if(pattern[j] == pattern[i]){
            next[i] = j + 1;
            j++;
            i++;
        }else if (j > 0){
            j = next[j - 1];
        }else{
            next[i] = 0;
            i++;
        }
    }
    return next;
}

// Boyer-Moore Algorithm
function boyerMooreMatch(text, pattern){
    var n = text.length;
    var m = pattern.length;
    var i = m-1;
    var j = m-1;
    var last = buildLast(pattern);
    if (i > n-1){
        return -1;
    }
    do {
        if (text[i] == pattern[j]){
            if (j == 0){
                return i;
            }
            i--;
            j--;
        }else{
            var lo = last[text[i]];
            i = i + m - Math.min(j, 1 + lo);
            j = m - 1;
        }
    } while (i <= n-1 && j >= 0);
    return -1;
}

function buildLast(pattern){
    var last = new Array(128);
    for (var i = 0; i < 128; i++){
        last[i] = -1;
    }
    for (var i = 0; i < pattern.length; i++){
        last[pattern[i]] = i;
    }
    return last;
}

let posn = kmpMatch(penyakit, text);
if (posn == -1){
    console.log("Not found");
} else {
    console.log("Found at " + posn);
}

posn = boyerMooreMatch(penyakit, text);
if (posn == -1){
    console.log("Not found");
} else {
    console.log("Found at " + posn);
}