let low;
let high;
let numbers = [];

function setRange() {

    low = Number(document.getElementById("low").value);
    high = Number(document.getElementById("high").value);

    if (low >= high) {alert("The low value must be less than the high value.");
        return;
    }

    numbers = [];

    // Reset the list of accepted numbers,the mean, median, and mode results
    let numberList = document.getElementById("numberList");
    numberList.innerHTML = "Numbers:";

    let meanResult = document.getElementById("meanResult");
    meanResult.innerHTML = "Mean:";

    let medianResult = document.getElementById("medianResult");
    medianResult.innerHTML = "Median:";

    let modeResult = document.getElementById("modeResult");
    modeResult.innerHTML = "Mode:";

    alert("Range set from " + low + " to " + high);
}

function addNumber() {

    let newNumber =
        Number(document.getElementById("newNumber").value);

    if (newNumber < low || newNumber > high) {alert("The number must be between " + low + " and " + high);
        return;
    }

    numbers.push(newNumber);

    // Update the list of accepted numbers
    let numberList = document.getElementById("numberList");
    numberList.innerHTML = "Numbers: " + numbers.join(", ");

    // Update the mean
    let meanResult = document.getElementById("meanResult");
    meanResult.innerHTML = "Mean: " + calculateMean();

    // Update the median
    let medianResult = document.getElementById("medianResult");
    medianResult.innerHTML = "Median: " + calculateMedian();

    // Update the mode
    let modeResult = document.getElementById("modeResult");
    modeResult.innerHTML = "Mode: " + calculateMode();

    alert("Number added: " + newNumber);
}

function calculateMean() {

    let total = 0;

    for (let i = 0; i < numbers.length; i++) {total = total + numbers[i];}

    let mean = total / numbers.length;

    return mean;
}

function calculateMedian() {

    let sortedNumbers = numbers.slice();

    sortedNumbers.sort(function(a, b) {return a - b;});

    let middle = Math.floor(sortedNumbers.length / 2);

    if (sortedNumbers.length % 2 == 1) {return sortedNumbers[middle];}

    else {return (sortedNumbers[middle - 1] + sortedNumbers[middle]) / 2;}
}

function calculateMode() {

    let counts = {};
    let mode;
    let highestCount = 0;
    let modeCount = 0

    for (let i = 0; i < numbers.length; i++) {let number = numbers[i];

        if (counts[number]) {counts[number]++;}

        else {counts[number] = 1;}

        if (counts[number] > highestCount) {highestCount = counts[number]; mode = number; modeCount = 1;}

        else if (counts[number] == highestCount) {modeCount++;}
    }

    if (highestCount == 1 || modeCount > 1) {return "No mode";}

    return mode;
}