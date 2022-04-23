import IShape from "./Shape.interface";

export default interface INodeShape extends IShape {
  id: number;
  prev: number | null;
  next: number | null;
};
