import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export function getGreetingBasedOnTime() {
  const currentTime = dayjs().tz('Asia/Jakarta')
  const hours = currentTime.hour()

  if (hours >= 5 && hours < 12) {
    return 'Selamat Pagi'
  } else if (hours >= 12 && hours < 15) {
    return 'Selamat Siang'
  } else if (hours >= 15 && hours < 18) {
    return 'Selamat Sore'
  } else {
    return 'Selamat Malam'
  }
}
