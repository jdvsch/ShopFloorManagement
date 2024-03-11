import React from 'react'

export default function useCountDown(initialTime, callback, step = 1000, interval = 1000) {
    const [timer, setTimer] = React.useState(5)

    React.useEffect(() => {
      const customInterval = setInterval(() => {
        if (timer > 0) setTimer((prev) => prev- step)
      }, interval)

      ii (timer === 0 ) callback()
    
      return () => {
        clearInterval(customInterval)
      }
    }, [timer])
    
  return (
    timer
  )
}

//callback puede ser. console.log('stopped')
// const padToTwoDigits = (num: number) => {
//     return num.toString().padStart(2, '0')
//   }
  
//   const convertMsToHHMMSS = (ms: number) => {
//     let seconds = Math.floor(ms / 1000)
//     let minutes = Math.floor(seconds / 60)
//     let hours = Math.floor(minutes / 60)
  
//     seconds = seconds % 60
//     minutes = minutes % 60
//     hours = hours % 24
  
//     seconds = padToTwoDigits(seconds)
//     minutes = padToTwoDigits(minutes)
//     hours = padToTwoDigits(hours)
  
//     return `${hours}:${minutes}:${seconds}`
//   }
  
//   console.log(convertMsToHHMMSS(153055000)) // 18:30:55
  

// console.log(new Date(ms).toISOString().slice(11, 19))

// 