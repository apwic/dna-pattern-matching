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
                console.log("Pattern found at index " + (i - m + 1));
                return 100;
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
        console.log("Pattern found at index " + (i - j));
        return 100;
    }else{
        console.log("Pattern not found");
        m = text.length;
        n = pattern.length;
        let per = brute_levenshtein(text, pattern);
        return per;
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
    if (i > m-1){
        return -1;
    }
    do {
        if (text[i] == pattern[j]){
            if (j == 0){
                console.log("Pattern found at index " + (i));
                return 100;
            }
            i--;
            j--;
        }else{
            var lo = last[text[i]];
            i = i + m - Math.min(j, 1 + lo);
            j = m - 1;
        }
    } while (i <= n-1 && j >= 0);
    let per = brute_levenshtein(text, pattern);
    return per;
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

// Bonus (using Levenshtein)
function levenshtein(S1, S2) {
    var m = S1.length;
    var n = S2.length;
    var dp = Create2DArray(m+1);
    for (var i = 0; i <= m; i++) {
        dp[i][0] = i;
    }
    for (var j = 0; j <= n; j++) {
        dp[0][j] = j;
    }
    var cost;
    for (var i = 1; i <= m; i++) {
        for (var j = 1; j <= n; j++) {
            if (S1.charAt(i - 1) == S2.charAt(j - 1)) {
                cost = 0;
            } else {
                cost = 1;
            }
            dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
        }
    }
    return (m - dp[m][n]);
}

function brute_levenshtein(S1, S2) {
    // Brute force + levenshtein
    var m = S1.length;
    var n = S2.length;
    var temp;
    var lcs = 0;
    for (var i = 0; i <= m-n; i++) {
        temp = levenshtein(S1.substring(i, i+n), S2);
        console.log(S1.substring(i, i+n) + " : " + S2 + " = " + temp);
        if (temp > lcs) {
            lcs = temp;
            console.log("LCS : " + S1.substring(i, i+n));
        }
    }
    return (lcs/n)*100;
}

// // Implement Bonus
function Create2DArray(rows) {
    var arr = [];
  
    for (var i=0;i<rows;i++) {
      arr[i] = [];
    }
  
    return arr;
}

let pattern = "AGAGAGAGAGAGAG";
let text = "ACGTAGCTAGCTACGGTTAGCTA";

let result = kmpMatch(text, pattern);
console.log(result);

result = boyerMooreMatch(text, pattern);
console.log(result);