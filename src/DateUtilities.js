const DateUtilities = {
    pad: (value, length) => {
        while (value.length < length)
            value = "0" + value;
        return value;
    },

    clone: (date) =>
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds())
    ,

    toString: (date) =>
        date.getFullYear() + "-" + DateUtilities.pad((date.getMonth() + 1).toString(), 2) + "-" + DateUtilities.pad(date.getDate().toString(), 2)
    ,

    toDayOfMonthString: (date) =>
        DateUtilities.pad(date.getDate().toString(),2)
    ,

    toMonthAndYearString: (date) => {
        const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
        return months[date.getMonth()] + " " + date.getFullYear()
    },

    moveToDayOfWeek: function (date, dayOfWeek) {
        while (date.getDay() !== dayOfWeek)
            date.setDate(date.getDate() - 1)
        return date
    },

    isSameDay: (first, second) =>
        first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate()
    ,

    isBefore: (first, second) =>
        first.getTime() < second.getTime()
    ,

    isAfter: (first, second) =>
        first.getTime() > second.getTime()
    ,
}

export default DateUtilities