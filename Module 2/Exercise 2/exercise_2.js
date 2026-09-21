async function getBaconipsum() {
  // first build the API call string by starting with the URL
  let apiString = "https://baconipsum.com/api/";
  // next add the parameters to the string using the drop down lists
  let theNewParagraphs = document.getElementById("newParagraphs").value;
  let theMeatType = document.querySelector('input[name="meatType"]:checked').value;
  let theCipher = document.getElementById("cipher").value;
  apiString = apiString + "?type=" + theMeatType + "&paras=" + theNewParagraphs;
  alert(apiString);  // show the API string

  // now make the API call to the web service using the string and store what is returned in response
  let response = await fetch(apiString);

  // finally, print the response in the various formats
  document.getElementById("myRawData").innerHTML = "";   // clear what was previously shown
  document.getElementById("myFormattedData").innerHTML = "";   // clear what was previously shown
  document.getElementById("myEncryptedData").innerHTML = "";  // clear what was previously shown

  let jsonData = await response.json();  // read the response as JSON
  
  // stringify and print out the JSON object in the RawData section
  document.getElementById("myRawData").innerHTML = JSON.stringify(jsonData);
 
  // loop through the JSON object one paragraph at a time and print each in the FormattedData section
  for (let para in jsonData) {   
    // display the original formatted paragraph
    document.getElementById("myFormattedData").innerHTML += "<p>" + jsonData[para] + "</p>";

    // encrypt the paragraph
    let encryptedParagraph;
    // check if caesar was selected and call the appropriate function
    if (theCipher == "caesar") {encryptedParagraph = encrypt(jsonData[para]);}
    // check if reverse was selected and call the appropriate function
    else if (theCipher == "reverse") {encryptedParagraph = reverseEncrypt(jsonData[para]);}

    // display the encrypted paragraph
    document.getElementById("myEncryptedData").innerHTML += "<p>" + encryptedParagraph + "</p>";
    }
  return true;
}

// encrypt function that takes a string and returns the encrypted string
function encrypt(text) {
    let encryptedText = "";
    // loop through the string one character at a time
    for (let i = 0; i < text.length; i++) {let character = text[i];
        // check if the character is a lowercase letter and if so, shift it by 3 places 
        if (character >= "a" && character <= "z") {let code = character.charCodeAt(0);
            code = code + 3;
            if (code > 122) {code = code - 26;}
            character = String.fromCharCode(code);
        }
        // check if the character is an uppercase letter and if so, shift it by 3 places
         else if (character >= "A" && character <= "Z") {let code = character.charCodeAt(0);
            code = code + 3;
            if (code > 90) {code = code - 26;}
        character = String.fromCharCode(code);
        }
         // add the character to the encrypted string
        encryptedText += character;
    }
    // return the encrypted string
    return encryptedText;
}

// reverseEncrypt function that takes a string and returns the reversed string
function reverseEncrypt(text) {
     let words = text.split(" ");
    let encryptedText = "";
    // loop through the array of words and reverse each word
    for (let i = 0; i < words.length; i++) {
        // get the current word and reverse it
        let word = words[i];
        let reversedWord = "";
        // loop through the word backwards and add each character to the reversed word
         for (let j = word.length - 1; j >= 0; j--) {reversedWord += word[j];}
        // add the reversed word to the encrypted string
        encryptedText += reversedWord;
        // add a space after each word except the last one
        if (i < words.length - 1) {encryptedText += " ";}
    }
    // return the encrypted string
    return encryptedText;
}