export const calculateTime = (_date) => {
    const date = new Date(_date)
    const now = new Date()
    let difference = (now.getTime() - date.getTime())/1000
    if(difference < 60) {
        return Math.floor(difference) + ' s ago'
    } else {
        difference = difference / 60
        if(difference < 60) {
            let value = Math.floor(difference)
            return value + ` min${value === 1 ? '': 's'} ago`
        } else {
            difference = difference / 60
            if(difference < 24) {
                let value = Math.floor(difference)
                return value + ` hour${value === 1 ? '': 's'} ago`
            } else {
                difference = difference / 24
                if(difference < 30) {
                    let value = Math.floor(difference)
                    return value + ` day${value === 1 ? '': 's'} ago`
                } else {
                    difference = difference / 30
                    if(difference < 12) {
                        let value = Math.floor(difference)
                        return value + ` month${value === 1 ? '': 's'} ago`
                    } else {
                        let value = Math.floor(difference)
                        return value + ` month${value === 1 ? '': 's'} ago`
                    }
                }
            }
        }
    }
}