class Orientation {
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }
}

const FRONT_ORIENTATED = new Orientation(1, 0, 0)
const BACK_ORIENTATED = new Orientation(-1, 0, 0)
const TOP_ORIENTATED = new Orientation(0, 0, 1)
const BOTTOM_ORIENTATED = new Orientation(0, 0, -1)
const LEFT_ORIENTATED = new Orientation(0, -1, 0)
const RIGHT_ORIENTATED = new Orientation(0, 1, 0)

class Position {
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }
}

const Colors = ['R', 'O', 'B', 'G', 'W', 'Y']

class Cubelet {
    constructor(x, y, z) {
        this.position = new Position(x, y, z)
    }
}

class CubeletFace {
    constructor(orientation, color) {
        this.orientation = orientation
        this.color = color
    }
}

class Layer {
    constructor(contains) {
        this.contains = new Function(contains)
    }
}

class ColoredCubelet {
    constructor(faces, x, y, z) {
        this.cubelet = new Cubelet(x, y, z)
        faces = {
            // 6 CubeletFace initialized with Orientations
        }
    }
}

class Cube {
    constructor() {
        // 26 ColoredCubelets
    }
}

let color = 'R'
let a = new CubeletFace(1, 1, 1, 'R')

console.log(a)