const isFalsy = (value) => value === 0 ? false : !value

export const CleanObj = (object) => {
    const result = { ...object }
    console.log(result);
    Object.keys(result).forEach(key => {
        const value = result[key]
        if (isFalsy(value)) {
            delete result[key]
        }
    })
    return result
}