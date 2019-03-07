// Try to use Date.now instead of creating a new date everytime we call now()
const now = Date.now || (() => {return new Date().getTime()})

export default now
