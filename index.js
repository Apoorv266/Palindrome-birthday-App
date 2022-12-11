function reverseString(str) {
    var listofChars = str.split("");
    var reverseListofChar = listofChars.reverse();
    var reversedString = reverseListofChar.join("");
    return reversedString;
}

function isStringPalindrome(str) {
    var reversedString = reverseString(str)
    return str === reversedString;
}

function getDateAsString(date) {

    var dateInStr = { day: "", month: "", year: "" };

    if (date.day < 10) {
        dateInStr.day = "0" + date.day;
    } else {
        dateInStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateInStr.month = "0" + date.month;
    } else {
        dateInStr.month = date.month.toString();
    }

    dateInStr.year = date.year.toString();
    return dateInStr;
}

function getDateInAllFormats(date) {
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yyddmm = date.year.slice(-2) + date.day + date.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkPalindromeForAllDateFormats(date) {
    var dateFormatList = getDateInAllFormats(date);
    var palindromeList = [];

    for (var i = 0; i < dateFormatList.length; i++) {
        var result = isStringPalindrome(dateFormatList[i]);
        palindromeList.push(result);
    }
    return palindromeList;
}

function inLeapYear(year) {
    if (year % 400 === 0) return true;

    if (year % 100 === 0) return false;

    if (year % 4 === 0) return true;

    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // if month if february
    if (month === 2) {
        if (inLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++
            }
        } else {
            if (day > 28) {
                day = 1;
                month++
            }
        }
    }
    else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++
        }
    }
    if (month > 12) {
        month = 1;
        year++
    }
    return {
        day: day,
        month: month,
        year: year
    }
}

function getPrevDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month == 3 && day == 0) {
        if (inLeapYear(year)) {
            day = 29;
            month--
        }
        else {
            day = 28;
            month--
        }
    }
    else {
        if (day == 0) {
            day = daysInMonth[(month - 1) - 1]
            month--
        }

        if (month == 0) {
            month = 12
            day = 31
            year--
        }
    }
    return {
        day: day,
        month: month,
        year: year
    }
}


function getNextPalindromeDate(date) {

    var nextDate = getNextDate(date);
    var ctr = 0;

    while (1) {
        ctr++;
        var dateStr = getDateAsString(nextDate);
        var resultList = checkPalindromeForAllDateFormats(dateStr);

        for (let i = 0; i < resultList.length; i++) {
            if (resultList[i]) {
                return [ctr, nextDate];
            }
        }
        nextDate = getNextDate(nextDate);
    }
}



function getPreviousPalindromeDate(date) {
    var previousDate = getPrevDate(date);
    var ctr = 0;

    while (1) {
        ctr++;
        var dateStr = getDateAsString(previousDate);
        var resultList = checkPalindromeForAllDateFormats(dateStr);

        for (let i = 0; i < resultList.length; i++) {
            if (resultList[i]) {
                return [ctr, previousDate];
            }
        }
        previousDate = getPrevDate(previousDate);
    }
}


// var date = {
//     day: 1,
//     month: 11,
//     year: 2020
// }

// console.log(getNextDate(date))
// console.log(getNextPalindromeDate(date))

var bdayInput = document.querySelector("#bday-input");
var showBtn = document.querySelector("#show-btn");
var resultDiv = document.querySelector("#result");


function clickHandler(e) {
 
    var bdayString = bdayInput.value;
  
    if (bdayString !== "") {
      var date = bdayString.split("-");
      var yyyy = date[0];
      var mm = date[1];
      var dd = date[2];
  
      var date = {
        day: Number(dd),
        month: Number(mm),
        year: Number(yyyy),
      };
  
      var dateStr = getDateAsString(date);
      var list = checkPalindromeForAllDateFormats(dateStr);
      var isPalindrome = false;
  
      for (let i = 0; i < list.length; i++) {
        if (list[i]) {
          isPalindrome = true;
          break;
        }
      }
  
      if (!isPalindrome) {
        const [ctr1, nextDate] = getNextPalindromeDate(date);
        const [ctr2, prevDate] = getPreviousPalindromeDate(date);
  
        if (ctr1 > ctr2) {
          resultDiv.innerText = `The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${ctr2} days.`;
        } else {
          resultDiv.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr1} days.`;
        }
      } else {
        resultDiv.innerText = "Yay! Your birthday is palindrome!";
      }
    }
  }

showBtn.addEventListener("click", clickHandler)