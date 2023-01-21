export default function toDate(d: number){
    const date = new Date(d)

    return {
        minutes: date.toLocaleString('en-us', {minute: '2-digit'}),
        hour: date.getHours(),
        day: date.getDay(),
        month: date.getMonth(),
        year: date.getFullYear()
    }

}