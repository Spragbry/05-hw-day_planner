const getCurrentDate = () => {
    const date = moment().format("dddd, MMMM Do YYYY")
    return date
}

const updateDateDisplay = () => {
    $("#currentDay").html(getCurrentDate())
}

const createTimeBlocks = () => {
    const start = 9
    const end = 17
    const timeBlocks = []
    const now = moment()
    for (let i = start; i <= end; i++ ) {
        let time = now.clone()
        time.hours(i)
        time.minutes(0)
        time.seconds(0)
        timeBlocks.push(time)
    } 
    return timeBlocks 
}

const createTimeUiElements = () => {
    const timeBlocks = createTimeBlocks()
    timeBlocks.forEach((timeBlock)=>{
        const displayText = timeBlock.format("hh a")
        const now = moment()
        let className = null
        let inputClassName = null
        const hour = now.get("hour")
        const blockHour = timeBlock.get("hour")
        if (hour == blockHour){
            className = "timeSlotPresent"
            inputClassName = "inputPresent"
        } else if (blockHour > hour){
            className = "timeSlotFuture"
            inputClassName = "inputFuture"
        } else {
            className = "timeSlotPast"
            inputClassName = "inputPast"
        }
        $("#container").append(`<div class=${className}><p class="dateDisplay">${displayText}</p><input class=${inputClassName}></input></div>`)
    })
}








$(document).ready(()=>{
    const date = getCurrentDate()
    console.log("document loaded",date)
    updateDateDisplay()
    createTimeUiElements()
}) 



