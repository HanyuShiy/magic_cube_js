class Orientation {
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }
}

const Orientations = Object.freeze({
        FRONT_ORIENTATED: new Orientation(1, 0, 0),
        BACK_ORIENTATED: new Orientation(-1, 0, 0),
        TOP_ORIENTATED: new Orientation(0, 0, 1),
        BOTTOM_ORIENTATED: new Orientation(0, 0, -1),
        LEFT_ORIENTATED: new Orientation(0, -1, 0),
        RIGHT_ORIENTATED: new Orientation(0, 1, 0),
    }
)

class Position {
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }
}

const Colors = Object.freeze({
    RED: 'R',
    ORANGE: 'O',
    BLUE: 'B',
    GREEN: 'G',
    WHITE: 'W',
    YELLOW: 'Y',
    EMPTY: '_'
})

class Cubelet {
    constructor(x, y, z) {
        this.position = new Position(x, y, z)
    }
}

class CubeletFace {
    constructor(orientation) {
        this.orientation = orientation
        this.color = Colors.EMPTY
    }

    coloring(color) {
        this.color = color
    }
}

class Layer {
    constructor(contains) {
        this.contains = contains
    }
}

const Layers = Object.freeze({
    FRONT_LAYER: new Layer((colored_cubelet) => {
        if (colored_cubelet.cubelet.position.x === 1) return true
    }),
    BACK_LAYER: new Layer((colored_cubelet) => {
        if (colored_cubelet.cubelet.position.x === -1) return true
    }),
    TOP_LAYER: new Layer((colored_cubelet) => {
        if (colored_cubelet.cubelet.position.z === 1) return true
    }),
    BOTTOM_LAYER: new Layer((colored_cubelet) => {
        if (colored_cubelet.cubelet.position.z === 1) return true
    }),
    LEFT_LAYER: new Layer((colored_cubelet) => {
        if (colored_cubelet.cubelet.position.y === -1) return true
    }),
    RIGHT_LAYER: new Layer((colored_cubelet) => {
        if (colored_cubelet.cubelet.position.y === 1) return true
    })
})

class ColoredCubelet {
    constructor(x, y, z) {
        this.cubelet = new Cubelet(x, y, z)
        this.faces = [
            new CubeletFace(Orientations.FRONT_ORIENTATED),
            new CubeletFace(Orientations.BACK_ORIENTATED),
            new CubeletFace(Orientations.TOP_ORIENTATED),
            new CubeletFace(Orientations.BOTTOM_ORIENTATED),
            new CubeletFace(Orientations.LEFT_ORIENTATED),
            new CubeletFace(Orientations.RIGHT_ORIENTATED)
        ]
    }

    coloring(orientation, color) {
        this.faces.forEach((face, index) => {
            if (face.orientation === orientation) {
                face.coloring(color)
            }
        })
    }
}

class Cube {
    constructor() {
        this.cubelets = [
            new ColoredCubelet(1, 0, 0),
            new ColoredCubelet(1, 1, 0),
            new ColoredCubelet(1, -1, 0),
            new ColoredCubelet(1, 1, 1),
            new ColoredCubelet(1, 1, -1),
            new ColoredCubelet(1, -1, 1),
            new ColoredCubelet(1, -1, -1),
            new ColoredCubelet(-1, 0, 0),
            new ColoredCubelet(-1, 1, 0),
            new ColoredCubelet(-1, -1, 0),
            new ColoredCubelet(-1, 1, 1),
            new ColoredCubelet(-1, 1, -1),
            new ColoredCubelet(-1, -1, 1),
            new ColoredCubelet(-1, -1, -1),
            // new ColoredCubelet(0,0,0),
            new ColoredCubelet(0, 1, 0),
            new ColoredCubelet(0, -1, 0),
            new ColoredCubelet(0, 1, 1),
            new ColoredCubelet(0, 1, -1),
            new ColoredCubelet(0, -1, 1),
            new ColoredCubelet(0, -1, -1),
            new ColoredCubelet(0, 0, 1),
            new ColoredCubelet(0, 0, -1),
            new ColoredCubelet(1, 0, -1),
            new ColoredCubelet(-1, 0, -1),
            new ColoredCubelet(1, 0, 1),
            new ColoredCubelet(-1, 0, 1),
        ]
        this.coloring()
    }

    coloring() {
        this.cubelets.forEach((cubelet) => {
            if (Layers.FRONT_LAYER.contains(cubelet)) cubelet.coloring(Orientations.FRONT_ORIENTATED, Colors.RED)
            if (Layers.BACK_LAYER.contains(cubelet)) cubelet.coloring(Orientations.BACK_ORIENTATED, Colors.ORANGE)
            if (Layers.TOP_LAYER.contains(cubelet)) cubelet.coloring((Orientations.TOP_ORIENTATED, Colors.WHITE))
            if (Layers.BOTTOM_LAYER.contains(cubelet)) cubelet.coloring((Orientations.BOTTOM_ORIENTATED, Colors.YELLOW))
            if (Layers.LEFT_LAYER.contains(cubelet)) cubelet.coloring((Orientations.LEFT_ORIENTATED, Colors.GREEN))
            if (Layers.RIGHT_LAYER.contains(cubelet)) cubelet.coloring((Orientations.RIGHT_ORIENTATED, Colors.BLUE))
        })
    }
}


let a = new ColoredCubelet(1, 1, 0)
let b = new Cube()
console.log(Layers.FRONT_LAYER.contains(a))
