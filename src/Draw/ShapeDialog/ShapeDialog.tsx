import { DialogContent, Stack } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import ShapeElement from '../shared/components/ShapeElement/ShapeElement';
import shapes from '../shared/data/shapes';
import { NodeDirection } from '../shared/enums/NodeDirection.enum';
import INodeShape from '../shared/interfaces/NodeShape.interface';
import IShape from '../shared/interfaces/Shape.interface';

interface ShapeDialogProps {
  onClose: () => void,
  onAdd: (newShape: INodeShape, sourceNode: INodeShape, direction: NodeDirection) => void,
  open: boolean,
  direction: NodeDirection,
  sourceNode: INodeShape
};

function ShapeDialog({ onClose, onAdd, open, direction, sourceNode }: ShapeDialogProps) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {

    if (open) {
      setSelected(false);
    }

  }, [open]);

  const handleClose = (): void => {
    onClose();
  };

  const handleClickShape = (shape: IShape) => {
    if (selected) {
      return;
    }

    setSelected(true);

    onAdd({
      id: 0,
      type: shape.type,
      prev: NodeDirection.Right === direction ? sourceNode.id : null,
      next: NodeDirection.Left === direction ? sourceNode.id : null
    }, sourceNode, direction);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ textAlign: 'center', paddingBottom: '20px' }}>Selecciona una figura para agregar</DialogTitle>
      <DialogContent>
        <Stack className="NodeShapes" direction="row" spacing={2}>
          {shapes.map((shape, index) => {
            return (<div key={`dialog-shape-option-${index}`} className="cursor-pointer"><ShapeElement handleClick={() => handleClickShape(shape)} shape={shape.type} /></div>);
          })}
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default ShapeDialog;