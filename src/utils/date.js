import moment from 'moment'

export function formatAll(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
}