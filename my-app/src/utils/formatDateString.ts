
export const formatDateString = (dateStr: string) => {
    const date = new Date(Number(dateStr))
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()
    return `${year}/${month}/${day} ${hour}:${min}:${sec}`
}