class Orientation {

    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }
}

// new Orientation(1, 1, 2)
//
//
// let orientation = {
//     x: 0,
//     y: 0,
//     z: 0,
// };
//
// Object.defineProperty(orientation, 'cubelet_face_orientation', {
//     get() {
//         return `(${this.x},${this.y},${this.z})`
//     },
//     set(value) {
//         [this.x, this.y, this.z] = value.split(" ")
//     }
// });
//
// alert(orientation.cubelet_face_orientation);
//
// for (let key in orientation) alert(key);

let a = new Orientation(1,2,4)

console.log(a)
