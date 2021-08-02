'use strict'

var gUserNum = 16;
var gNums = createNums(gUserNum);
var gCount = 1;
var gTimerInterval = 10;
var gInterval;

// function init() {
//     renderBoard(gNums);
//     gNums = createNums(gUserNum);
//     gCount = 1;
// }

function init(num) {
    closeModal();
    gUserNum = num;
    gNums = createNums(num);
    renderBoard(gNums);
    clearInterval(gInterval);
    var gameTimer = document.querySelector('.timer span');
    gameTimer.innerText = '';
}
 
function chooseDifficulty(dataDif) {
    switch (dataDif) {
        case 16:
            init(dataDif);
        case 25:
            init(dataDif);
        case 36:
            init(dataDif);
    }
}


function renderBoard(nums) {

    gCount = 1;
    var gameCounter = document.querySelector('.next span');
    gameCounter.innerText = gCount;
    var strHTML = '';
    for (var i = 0; i < Math.sqrt(gUserNum); i++) {
        strHTML += '<tr>';
        for (var j = 0; j < Math.sqrt(gUserNum); j++) {
            strHTML += `<td onclick="cellClicked(this)">${drawNum(nums)}</td>`
        }
        strHTML += '</tr>';
    }
    var elBloard = document.querySelector('.board');
    elBloard.innerHTML = strHTML;

}

function cellClicked(elCell) {
    var currCellText = +elCell.innerText;
    var gameCounter = document.querySelector('.next span');
    if (currCellText === gCount) {
        elCell.classList.add('clicked');
        gCount++;
        gameCounter.innerText = gCount;
    }
    if (gCount === 2) {
        var currTime = Date.now();
        gInterval = setInterval(function () {
            var time1 = currTime
            var time2 = Date.now();
            var msTimeDiff = time2 - time1;
            var timeDiffStr = new Date(msTimeDiff).toISOString().slice(14, -1);
            var gameTimer = document.querySelector('.timer span');
            gameTimer.innerText = timeDiffStr;
        }, 10)
    }
    if (gCount > gUserNum) {
        gameCounter.innerText = '🤪';
        clearInterval(gInterval);
        openModal();
    }
}


function openModal() {
    // Todo: show the modal and schedule its closing
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'block';
}

function closeModal() {
    // Todo: hide the modal
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
}

// Util functions

function createNums(length) {
    var nums = [];
    for (var i = 1; i <= length; i++) {
        nums.push(i);
    }
    return nums;
}

function drawNum() {
    var idx = getRandomInt(0, gNums.length)
    var num = gNums[idx]
    gNums.splice(idx, 1)
    return num
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is inclusive and the minimum is inclusive 
}
