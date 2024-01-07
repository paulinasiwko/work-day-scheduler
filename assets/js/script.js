function setCurrentDay() {
    const today = dayjs();
    $("#currentDay").text(today.format("dddd, MMMM DD"));      
}

const currentHour = dayjs().format("HH");

function initialisePage() {
    setCurrentDay();

    const timetableEl = $("#timetable");
    const userInput = JSON.parse(localStorage.getItem("hourText")) || [];

    for (var i = 9; i < 21; i++) {
        var rowObject = userInput.find((element) => element.hour === i);
        var text = "";
        if (rowObject != null || rowObject != undefined) {
            text = rowObject.text;
        }

        if (currentHour - i > 0) {
            timetableEl.append(createRow(i, text).addClass("past"));
        } else if (currentHour - i == 0) {
            timetableEl.append(createRow(i, text).addClass("present")); 
        } else {
            timetableEl.append(createRow(i, text).addClass("future"));
        }
    }
}


function createRow(rowHour, savedText) {
    
    var newRow = $("<div>").addClass("row");
    var hourCol = $("<div>").addClass("col-sm-1 hour").text(formatHourNumber(rowHour));
    var textCol = $("<textarea>").addClass("col-sm-10").text(savedText);
    var btnCol = $("<button>").addClass("col-sm-1 saveBtn");

    var saveIcon = $("<i>").addClass("fas fa-save");

    btnCol.on("click", function(e) {
        e.preventDefault();

        const hourText = JSON.parse(localStorage.getItem("hourText")) || [];

        var a = hourText.find((element) => element.hour === rowHour);

        if (a != undefined) {
            a.text = textCol.val();
        } else {
            hourText.push({
                hour: rowHour,
                text: textCol.val()
            })
        }

        localStorage.setItem("hourText", JSON.stringify(hourText));
    })

    newRow.append(hourCol, textCol, btnCol);
    btnCol.append(saveIcon);

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