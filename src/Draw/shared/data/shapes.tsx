import IShape from "../interfaces/Shape.interface";
import { ShapeType } from "../enums/ShapeType.enum";

const shapes: IShape[] = [
  { type: ShapeType.Circle },
  { type: ShapeType.Square },
  { type: ShapeType.Triangle }
];

export default shapes;