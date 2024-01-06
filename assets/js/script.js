function setCurrentDay() {
    const today = dayjs();
    $("#currentDay").text(today.format("dddd, MMMM DD"));      
}

const currentHour = dayjs().format("HH");

function initialisePage() {
    setCurrentDay();

    const timetableEl = $("#timetable");

    for (var i = 10; i < 21; i++) {
        timetableEl.append(createRow(i, "", currentHour));
    }
}

// conditional formatting (past, present)
// localStorage

function createRow(rowHour, savedText) {
    var newRow = $("<div>").addClass("row");

    var hourCol = $("<div>").addClass("col hour").text(formatHourNumber(rowHour));
    var textCol = $("<textarea>").addClass("col").text(savedText);
    var btnCol = $("<button>").addClass("col saveBtn").text("Save");

    newRow.append(hourCol, textCol, btnCol);

    return newRow;
}


function formatHourNumber(hourNumber) {
    var hourString = "";

    if (hourNumber > 12) {
        hourNumber -= 12;
        hourString = hourNumber.toString() + "PM";
    } else if (hourNumber == 12) {
        hourString = 12 + "PM";
    } else if (hourNumber  == 0) {
        hourString = 12 + "AM";
    } else {
        hourString = hourNumber.toString() + "AM";
    }

    return hourString;
}

initialisePage();