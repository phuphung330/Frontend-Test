//RGB to Hex Convention
export function rgb(r: number, g: number, b: number): string {
    // Your code here
    return [r, g, b].reduce((result: string, num: number) => {
        if (num < 0) {
            return result + "00"
        }
        if (num > 255) {
            return result + "FF"
        }
        let hex = num.toString(16)
        if (hex.length % 2) {
            hex = hex + "0"
        }
        return result + hex
    }, "").toUpperCase()
}

console.log(rgb(255, 255, 255))
console.log(rgb(255,255,300));
console.log(rgb(0,0,0));
console.log(rgb(148,0,211));


