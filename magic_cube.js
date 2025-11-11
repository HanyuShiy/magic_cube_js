class Orientation {
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }

    rotateX(angle) {
        const oldY = this.y;
        const oldZ = this.z;
        this.y = Math.round(oldY * Math.cos(angle) - oldZ * Math.sin(angle));
        this.z = Math.round(oldY * Math.sin(angle) + oldZ * Math.cos(angle));
    }

}

let Orientations = {
    FRONT_ORIENTATED: Object.freeze(new Orientation(1, 0, 0)),
    BACK_ORIENTATED: Object.freeze(new Orientation(-1, 0, 0)),
    TOP_ORIENTATED: Object.freeze(new Orientation(0, 0, 1)),
    BOTTOM_ORIENTATED: Object.freeze(new Orientation(0, 0, -1)),
    LEFT_ORIENTATED: Object.freeze(new Orientation(0, -1, 0)),
    RIGHT_ORIENTATED: Object.freeze(new Orientation(0, 1, 0)),
};
Orientations.X_AXIS = Orientations.FRONT_ORIENTATED;
Orientations.Y_AXIS = Orientations.RIGHT_ORIENTATED;
Orientations.Z_AXIS = Orientations.TOP_ORIENTATED;

Object.freeze(Orientations);

class Position {
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }

    rotateX(angle) {
        const oldY = this.y;
        const oldZ = this.z;
        this.y = oldY * Math.cos(angle) - oldZ * Math.sin(angle);
        this.z = oldY * Math.sin(angle) + oldZ * Math.cos(angle);
    }
}

const Colors = Object.freeze({
    RED: 'R', ORANGE: 'O', BLUE: 'B', GREEN: 'G', WHITE: 'W', YELLOW: 'Y', EMPTY: '_'
})

class Cubelet {
    constructor(x, y, z) {
        this.position = new Position(x, y, z)
    }

    rotateXClockwise(angle) {
        this.position.rotateX(angle)
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

    rotateXClockwise(angle) {
        this.orientation.rotateX(angle)
    }
}

class Layer {
    constructor(contains, axis_vec) {
        this.contains = contains
        this.axis = axis_vec
    }

    getAxis() {
        return this.axis
    }
}

const Layers = Object.freeze({
    FRONT_LAYER: new Layer(colored_cubelet =>
            colored_cubelet.cubelet.position.x === 1,
        Orientations.X_AXIS),
    BACK_LAYER: new Layer(colored_cubelet =>
            colored_cubelet.cubelet.position.x === -1,
        Orientations.X_AXIS),
    TOP_LAYER: new Layer(colored_cubelet =>
            colored_cubelet.cubelet.position.z === 1,
        Orientations.Z_AXIS),
    BOTTOM_LAYER: new Layer(colored_cubelet =>
            colored_cubelet.cubelet.position.z === -1,
        Orientations.Z_AXIS),
    LEFT_LAYER: new Layer(colored_cubelet =>
            colored_cubelet.cubelet.position.y === -1,
        Orientations.Y_AXIS),
    RIGHT_LAYER: new Layer(colored_cubelet =>
            colored_cubelet.cubelet.position.y === 1,
        Orientations.Y_AXIS)
})

class ColoredCubelet {
    constructor(x, y, z) {
        this.cubelet = new Cubelet(x, y, z)
        this.faces = [new CubeletFace(Orientations.FRONT_ORIENTATED), new CubeletFace(Orientations.BACK_ORIENTATED), new CubeletFace(Orientations.TOP_ORIENTATED), new CubeletFace(Orientations.BOTTOM_ORIENTATED), new CubeletFace(Orientations.LEFT_ORIENTATED), new CubeletFace(Orientations.RIGHT_ORIENTATED)]
    }

    coloring(orientation, color) {
        this.faces.forEach((face) => {
            if (face.orientation === orientation) {
                face.coloring(color)
            }
        })
    }

    getFaceOn(orientation) {
        for (const face of this.faces) {
            if (face.orientation === orientation) {
                return face.color
            }
        }
    }

    rotateAround(axis, angle) {
        if (axis === Orientations.X_AXIS) {
            this.rotateXClockwise(angle)
        }
    }

    rotateXClockwise(angle) {
        this.cubelet.rotateXClockwise(angle)
        this.faces.forEach((face) => {
            face.rotateXClockwise(angle)
        })

    }
}

class Face {
    constructor(colors) {
        this.colors = colors
    }

    print() {
        this.colors.forEach((color) => {
            console.log(color)
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
            new ColoredCubelet(-1, 0, 1),]
        this.coloring()
    }

    coloring() {
        this.cubelets.forEach((cubelet) => {
            if (Layers.FRONT_LAYER.contains(cubelet)) cubelet.coloring(Orientations.FRONT_ORIENTATED, Colors.RED)
            if (Layers.BACK_LAYER.contains(cubelet)) cubelet.coloring(Orientations.BACK_ORIENTATED, Colors.ORANGE)
            if (Layers.TOP_LAYER.contains(cubelet)) cubelet.coloring(Orientations.TOP_ORIENTATED, Colors.WHITE)
            if (Layers.BOTTOM_LAYER.contains(cubelet)) cubelet.coloring(Orientations.BOTTOM_ORIENTATED, Colors.YELLOW)
            if (Layers.LEFT_LAYER.contains(cubelet)) cubelet.coloring(Orientations.LEFT_ORIENTATED, Colors.GREEN)
            if (Layers.RIGHT_LAYER.contains(cubelet)) cubelet.coloring(Orientations.RIGHT_ORIENTATED, Colors.BLUE)
        })
    }


    getFront() {
        let front = Array.from({length: 3}, () => Array(3).fill(Colors.EMPTY))
        for (const colored_cubelet of this.cubelets) {
            if (Layers.FRONT_LAYER.contains(colored_cubelet)) {
                const y = colored_cubelet.cubelet.position.y + 1
                const z = colored_cubelet.cubelet.position.z + 1

                front[y][z] = colored_cubelet.getFaceOn(Orientations.FRONT_ORIENTATED)
            }
        }
        return new Face(front)
    }

    getBack() {
        let back = Array.from({length: 3}, () => Array(3).fill(Colors.EMPTY))
        for (const colored_cubelet of this.cubelets) {
            if (Layers.BACK_LAYER.contains(colored_cubelet)) {
                const y = colored_cubelet.cubelet.position.y + 1
                const z = colored_cubelet.cubelet.position.z + 1

                back[y][z] = colored_cubelet.getFaceOn(Orientations.BACK_ORIENTATED)
            }
        }
        return new Face(back)
    }

    getLeft() {
        let left = Array.from({length: 3}, () => Array(3).fill(Colors.EMPTY))
        for (const colored_cubelet of this.cubelets) {
            if (Layers.LEFT_LAYER.contains(colored_cubelet)) {
                const z = colored_cubelet.cubelet.position.z + 1
                const x = colored_cubelet.cubelet.position.x + 1

                left[z][x] = colored_cubelet.getFaceOn(Orientations.LEFT_ORIENTATED)
            }
        }
        return new Face(left)
    }

    getRight() {
        let right = Array.from({length: 3}, () => Array(3).fill(Colors.EMPTY))
        for (const colored_cubelet of this.cubelets) {
            if (Layers.RIGHT_LAYER.contains(colored_cubelet)) {
                const z = colored_cubelet.cubelet.position.z + 1
                const x = colored_cubelet.cubelet.position.x + 1

                right[z][x] = colored_cubelet.getFaceOn(Orientations.RIGHT_ORIENTATED)
            }
        }
        return new Face(right)
    }

    getTop() {
        let top = Array.from({length: 3}, () => Array(3).fill(Colors.EMPTY))
        for (const colored_cubelet of this.cubelets) {
            if (Layers.TOP_LAYER.contains(colored_cubelet)) {
                const y = colored_cubelet.cubelet.position.y + 1
                const x = colored_cubelet.cubelet.position.x + 1

                top[x][y] = colored_cubelet.getFaceOn(Orientations.TOP_ORIENTATED)
            }
        }
        return new Face(top)
    }

    getBottom() {
        let bottom = Array.from({length: 3}, () => Array(3).fill(Colors.EMPTY))
        for (const colored_cubelet of this.cubelets) {
            if (Layers.BOTTOM_LAYER.contains(colored_cubelet)) {
                const y = colored_cubelet.cubelet.position.y + 1
                const x = colored_cubelet.cubelet.position.x + 1

                bottom[x][y] = colored_cubelet.getFaceOn(Orientations.BOTTOM_ORIENTATED)
            }
        }
        return new Face(bottom)
    }

    rotateClockwise(layer, angle, steps) {
        for (let i = 0; i < steps; i++) {
            for (let colored_cubelet of this.cubelets) {
                if (layer.contains(colored_cubelet)) {
                    colored_cubelet.rotateAround(layer.getAxis(), angle)
                }
            }
        }
    }


}


let a = new ColoredCubelet(1, 1, 0)
let b = new Cube()
b.rotateClockwise(Layers.FRONT_LAYER, Math.PI / 2, 1)
console.log(Layers.FRONT_LAYER.contains(a))
b.getFront().print()
b.getBack().print()
b.getLeft().print()
b.getRight().print()
b.getTop().print()
b.getBottom().print()
