import moment from 'moment'

export function getDate(date, str) {
    let ment = moment(date)
    let y = ment.year()
    let M = ment.month() + 1
    let d = ment.date()
    return y + str + M + str + d
}

export function getTime(date) {
    let ment = moment(date)
    let h = ment.hour() < 10 ? '0' + ment.hour() : ment.hour()
    let m = ment.minute() < 10 ? '0' + ment.minute() : ment.minute()
    let s = ment.second() < 10 ? '0' + ment.second() : ment.second()
    return h + ":" + m + ":" + s
}