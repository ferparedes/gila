import { Box } from '@mui/material';
import React from 'react';
import NodeShape from '../NodeShape/NodeShape';
import { NodeDirection } from '../shared/enums/NodeDirection.enum';
import INodeShape from '../shared/interfaces/NodeShape.interface';

interface NodeShapesProps {
  onDelete: (id: number) => void;
  onAddNode: (shape: INodeShape, direction: NodeDirection) => void,
  shapes: INodeShape[];
}

function NodeShapes({ shapes, onDelete, onAddNode }: NodeShapesProps) {
  return (
    <Box
      sx={{ overflowX: 'auto', display: 'flex', flexDirection: 'row', overflow: 'auto', paddingY: '80px', paddingX: '50px', justifyContent: 'center safe' }}
      className="NodeShapes"
    >
      {shapes.map((shape, index) => {
        return <NodeShape nodeShape={shape} key={`node-shape-${index}`} onDelete={onDelete} onAddNode={onAddNode} />
      })}
    </Box>
  );
}

export default NodeShapes;
