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

const Colors = ['R', 'O', 'B', 'G', 'W', 'Y', 'E']

class Cubelet {
    constructor(x, y, z) {
        this.position = new Position(x, y, z)
    }
}

class CubeletFace {
    constructor(orientation) {
        this.orientation = orientation
        this.color = undefined
    }

    coloring() {

    }
}

class Layer {
    constructor(contains) {
        this.contains = new Function(contains)
    }
}

class ColoredCubelet {
    constructor(x, y, z) {
        this.cubelet = new Cubelet(x, y, z)
        this.faces = [
            new CubeletFace(FRONT_ORIENTATED, 'E'),
            new CubeletFace(BACK_ORIENTATED, 'E'),
            new CubeletFace(TOP_ORIENTATED, 'E'),
            new CubeletFace(BOTTOM_ORIENTATED, 'E'),
            new CubeletFace(LEFT_ORIENTATED, 'E'),
            new CubeletFace(RIGHT_ORIENTATED, 'E')
        ]
    }

    coloring() {

    }
}

class Cube {
    constructor() {
        this.cubelets = [
            new ColoredCubelet(1,0,0),
            new ColoredCubelet(1,1,0),
            new ColoredCubelet(1,-1,0),
            new ColoredCubelet(1,1,1),
            new ColoredCubelet(1,1,-1),
            new ColoredCubelet(1,-1,1),
            new ColoredCubelet(1,-1,-1),
            new ColoredCubelet(-1,0,0),
            new ColoredCubelet(-1,1,0),
            new ColoredCubelet(-1,-1,0),
            new ColoredCubelet(-1,1,1),
            new ColoredCubelet(-1,1,-1),
            new ColoredCubelet(-1,-1,1),
            new ColoredCubelet(-1,-1,-1),
            // new ColoredCubelet(0,0,0),
            new ColoredCubelet(0,1,0),
            new ColoredCubelet(0,-1,0),
            new ColoredCubelet(0,1,1),
            new ColoredCubelet(0,1,-1),
            new ColoredCubelet(0,-1,1),
            new ColoredCubelet(0,-1,-1),

            new ColoredCubelet(0,0,1),
            new ColoredCubelet(0,0,-1),
            new ColoredCubelet(1,0,-1),
            new ColoredCubelet(-1,0,-1),
            new ColoredCubelet(1,0,1),
            new ColoredCubelet(-1,0,1),
        ]
    }
}

let color = 'R'
let a = new CubeletFace(1, 1, 1, 'R')

console.log(a)