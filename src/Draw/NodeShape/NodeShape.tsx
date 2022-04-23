import AddIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import ShapeElement from "../shared/components/ShapeElement/ShapeElement";
import { NodeDirection } from "../shared/enums/NodeDirection.enum";
import INodeShape from "../shared/interfaces/NodeShape.interface";
import './NodeShape.scss';

interface NodeShapesProps {
  onDelete: (id: number) => void;
  onAddNode: (shape: INodeShape, direction: NodeDirection) => void,
  nodeShape: INodeShape;
}

function NodeShape({ nodeShape, onDelete, onAddNode }: NodeShapesProps) {
  const getId = (nodeShape: INodeShape): number => {
    return nodeShape.id || 0;
  };

  return (
    <Box className="NodeShape" sx={{
      width: 152
    }}>
      <div className="shape-element-wrap">
        <ShapeElement shape={nodeShape.type} />
      </div>
      <div className="tools">
        <IconButton className="tool delete" aria-label="delete" size="large" onClick={() => onDelete(getId(nodeShape))}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
        <Box className="add-wrap left" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <IconButton onClick={() => onAddNode(nodeShape, NodeDirection.Left)} className="tool add" aria-label="add left" size="large" sx={{ p: 0 }}>
            <AddIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Box className="add-wrap right" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <IconButton onClick={() => onAddNode(nodeShape, NodeDirection.Right)} className="tool add" aria-label="add right" size="large" sx={{ p: 0 }}>
            <AddIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </div>
    </Box>
  );
}

export default NodeShape;