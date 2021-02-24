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
        $("#container").append(`<div class="timeSlot"><p>${displayText}</p></div>`)
    })
}








$(document).ready(()=>{
    const date = getCurrentDate()
    console.log("document loaded",date)
    updateDateDisplay()
    createTimeUiElements()
}) 



