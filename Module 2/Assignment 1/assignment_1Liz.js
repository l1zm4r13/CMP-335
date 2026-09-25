function validateANDcheck() {

    // place the values in the form into variables
    let theNewWord = document.forms["palindromeForm"]["newWord"].value;
    let theNewNumber = document.forms["palindromeForm"]["newNumber"].value;
    let theCaseOption = document.querySelector('input[name="caseOption"]:checked').value;

    // save the original word for displaying the result
    let originalWord = theNewWord;

    // make the word lowercase if case insensitive is selected
    if (theCaseOption == "insensitive") {theNewWord = theNewWord.toLowerCase();}

    // validate that something was entered as a word
    if (theNewWord == "") {
        // no word was entered so tell the user
        alert("Please enter a word.");
        return false;}

    else if ((theNewNumber != 1) && (theNewNumber != 2) && (theNewNumber != 3)) {
        // a 1, 2, or 3 was not entered, so tell the user
        alert("Please enter a number between 1 and 3.");
        // clear the incorrect number
        document.forms["palindromeForm"]["newNumber"].value = "";
        return false;}

    else {
        //use algorithm 1 to check if the word is a palindrome
        if (theNewNumber == 1) {let result = checkPalindrome1(theNewWord);
            // create an object for the palindrome result
            let palindromeResult = {word: originalWord, algorithm: theNewNumber, caseOption: theCaseOption, isPalindrome: result};
            //check for the word for palindrome with algorithm 1 and add it to the list 
            if (palindromeResult.isPalindrome == true) {document.getElementById("algorithm1Results").innerHTML +="<li>" + palindromeResult.word + " - Palindrome</li>";}
            else {document.getElementById("algorithm1Results").innerHTML +="<li>" + palindromeResult.word + " - Not a Palindrome</li>";}
        }

        //use algorithm 2 to check if the word is a palindrome
        else if (theNewNumber == 2) {let result = checkPalindrome2(theNewWord);
            //create an object for the palindrome result 
            let palindromeResult = {word: originalWord, algorithm: theNewNumber, caseOption: theCaseOption, isPalindrome: result};
            //check for the word for palindrome with algorithm 2 and add it to the list
            if (palindromeResult.isPalindrome == true) {document.getElementById("algorithm2Results").innerHTML +="<li>" + palindromeResult.word + " - Palindrome</li>";}
            else {document.getElementById("algorithm2Results").innerHTML +="<li>" + palindromeResult.word + " - Not a Palindrome</li>";}
        }

        // use algorithm 3 to check if the word is a palindrome
        else if (theNewNumber == 3) {let result = checkPalindrome3(theNewWord);
        // create an object for the palindrome result
        let palindromeResult = {word: originalWord, algorithm: theNewNumber, caseOption: theCaseOption, isPalindrome: result};
        // check the word for palindrome with algorithm 3 and add it to the list
        if (palindromeResult.isPalindrome == true) {document.getElementById("algorithm3Results").innerHTML +="<li>" + palindromeResult.word + " - Palindrome</li>";}
        else {document.getElementById("algorithm3Results").innerHTML +="<li>" + palindromeResult.word + " - Not a Palindrome</li>";}
        }
    }
}

function checkPalindrome1(word) {

    //declare variables to hold the start and end of the word
    let start = 0;
    let end = word.length - 1;

    // loop through the word, comparing the first and last letters, then the second and second to last letters, etc.
    while (start < end) {
        if (word[start] != word[end]) {return false;}
        // if the letters match, move the start and end pointers closer to the middle of the word
        start++;
        end--;
    } 

    // if the loop completes without finding any mismatched letters, the word is a palindrome
    return true;
}

function checkPalindrome2(word) {
    // check if the word is the same forwards and backwards
    return word == word.split("").reverse().join("");
}

function checkPalindrome3(word) {
    // if there is only one or no characters left, it is a palindrome
    if (word.length <= 1) {return true;}
    
    // if the first and last characters do not match, it is not a palindrome
    if (word[0] != word[word.length - 1]) {return false;}

    // remove the first and last characters and check again
    return checkPalindrome3(word.slice(1, -1));
}
