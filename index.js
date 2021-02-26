const start = 9
const end = 17
const storage = window.localStorage

const getCurrentDate = () => {
    const date = moment().format("dddd, MMMM Do YYYY")
    return date
}

const updateDateDisplay = () => {
    $("#currentDay").html(getCurrentDate())
}

const createTimeBlocks = () => {
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


const saveItem = (index, event) => {
    localStorage.setItem(`${index}-event`, event)
    console.log("saved item at index", `${index}-event`)
}


const loadItems = () => {
    let items = []
    for (let i = 0; i < end - start; i++){
        let item = localStorage.getItem(`${i.toString()}-event`)
        console.log("get item", `${i.toString()}-event`)
        if (!item){
            item = "no event"
        }
        items.push(item)
    } 
    console.log("items",items)
    return items
}



const createTimeUiElements = () => {
    const timeBlocks = createTimeBlocks()
    const events = loadItems()
    timeBlocks.forEach((timeBlock, index) =>{
        const displayText = timeBlock.format("hh a")
        const now = moment()
        const event = events[index]
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
        $("#container").append(
            `<div class=${className}>
                <p class="dateDisplay">${displayText}</p>
                <input id=${index} value="${event}" class=${inputClassName}></input>
                <div class="save">
                    <span style="font-size: 48px; color:black;">
                        <i class="fas fa-save"></i>
                    </span>
                </div>
            </div>`
        )
    })
}


const observeInputs = () => {
    for (let i = 0; i < end - start; ++i){
        const input = $(`#${i}`)
        console.log("input",input)
        input[0].onchange = (event) => {
            console.log("log event",event.target.value)
            const value = event.target.value
            saveItem(i.toString(), value)
            console.log("save item", value)
            console.log("saved items", loadItems())
        }
        console.log("observable input", input)
    }

}







$(document).ready(()=>{
    const date = getCurrentDate()
    console.log("document loaded",date)
    loadItems()
    updateDateDisplay()
    createTimeUiElements()
    observeInputs()
}) 



