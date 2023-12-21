// Your code here

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: [],
      }
    }  

function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord)
}


function createTimeInEvent(employee, datestamp) {
    const { date, hour } = parseDate(datestamp)
    employee.timeInEvents.push(
        { type: "TimeIn", hour, date}
        )
    return employee
}

function createTimeOutEvent(employee, datestamp) {
    const { date, hour } = parseDate(datestamp)
    employee.timeOutEvents.push(
        { type: "TimeOut", hour, date}
        )
    return employee
}

function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date).hour
    const timeOut = employee.timeOutEvents.find(event => event.date === date).hour
    return (timeOut- timeIn) /100
}

function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date)
    return hoursWorked * employee.payPerHour
}

function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date)
    return datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employee, date), 0)
}

function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0)
}

//Make sure to Parse date and hour
function parseDate(datestamp) {
    const [date, hour] = datestamp.split(' ')
    return { date, hour: parseInt(hour, 10)}
}