import { ShapeType } from "../../enums/ShapeType.enum";
import './ShapeElement.scss';

interface ShapeElementProps {
  handleClick?: (shape: ShapeType) => void,
  shape: ShapeType
};

function ShapeElement({ shape, handleClick }: ShapeElementProps) {

  const handleOnClick = (shape: ShapeType) => {
    if (handleClick instanceof Function) {
      handleClick(shape);
    }
  };

  return (
    <div className="shape-element-wrap">
      <div onClick={() => handleOnClick(shape)} className={`shape-element ${shape}`}></div>
    </div>
  )
}

export default ShapeElement;