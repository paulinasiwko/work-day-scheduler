const currentHour = dayjs().format("HH");

function setCurrentDay() {
    const today = dayjs();
    $("#currentDay").text(today.format("dddd, MMMM DD"));      
}

function initialisePage() {
    setCurrentDay();

    const timetableEl = $("#timetable");
    const userInput = getLocalStorageInfo();

    for (let i = 9; i <= 17; i++) {
        const rowObject = userInput.find((element) => element.hour === i);
        let text = "";
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
    
    const newRow = $("<div>").addClass("row");
    const hourCol = $("<div>").addClass("col-sm-1 hour").text(formatHourNumber(rowHour));
    const textCol = $("<textarea>").addClass("col-sm-9").text(savedText);
    const btnCol = $("<button>").addClass("col-sm-1 saveBtn");
    const deleteCol = $("<button>").addClass("col-sm-1 deleteBtn");

    const saveIcon = $("<i>").addClass("fas fa-save");
    const deleteIcon = $("<i>").addClass("fas fa-trash");

    btnCol.on("click", function(e) {
        e.preventDefault();

        const hourText = getLocalStorageInfo();
        const rowElement = hourText.find((element) => element.hour === rowHour);

        if (rowElement != undefined) {
            rowElement.text = textCol.val();
        } else {
            hourText.push({
                hour: rowHour,
                text: textCol.val()
            })
        }

        localStorage.setItem("hourText", JSON.stringify(hourText));
    });

    deleteCol.on("click", function(e) {
        e.preventDefault();

        const savedData = getLocalStorageInfo();
        const rowToDelete = savedData.find((element) => element.hour === rowHour);

        if (rowToDelete != undefined) {
            rowToDelete.text = "";
            localStorage.setItem("hourText", JSON.stringify(savedData));
            location.reload();
        } 

    })

    newRow.append(hourCol, textCol, btnCol, deleteCol);
    btnCol.append(saveIcon);
    deleteCol.append(deleteIcon);

    return newRow;
}


function formatHourNumber(hourNumber) {
    let hourString = "";

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

function getLocalStorageInfo() {
    return JSON.parse(localStorage.getItem("hourText")) || [];
}

initialisePage();