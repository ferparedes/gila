import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import React, { useEffect, useState } from 'react';
import './Draw.scss';
import NodeShapes from './NodeShapes/NodeShapes';
import ShapeDialog from './ShapeDialog/ShapeDialog';
import { NodeDirection } from './shared/enums/NodeDirection.enum';
import { ShapeType } from './shared/enums/ShapeType.enum';
import INodeShape from './shared/interfaces/NodeShape.interface';

function Draw() {
  const defaultNodeShape: INodeShape = { id: 0, type: ShapeType.Default, prev: null, next: null };
  const [shapes, setShapes] = useState<INodeShape[]>([]);
  const [nodes, setNodes] = useState<INodeShape[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<number>(1);
  const [direction, setDirection] = useState<NodeDirection>(NodeDirection.Default);
  const [sourceNode, setSourceNode] = useState<INodeShape>(defaultNodeShape);
  const [lastNodeAdded, setLastNodeAdded] = useState<number>(0);

  useEffect(() => {
    setNodes(sortShapes());
  }, [shapes]);

  const handleClickAddShape = () => {
    setOpen(true);
  };

  const setNextId = () => {
    setCurrentId(currentId + 1);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const getNodeFromSourceNode = (sourceNode: INodeShape, type: string): INodeShape | null => {
    const node = shapes.find(shape => shape.id === (type === 'next' ? sourceNode.next : sourceNode.prev));
    return node || null;
  }

  const getNextNode = (sourceNode: INodeShape): INodeShape | null => {
    return getNodeFromSourceNode(sourceNode, 'next');
  }

  const getPrevNode = (sourceNode: INodeShape): INodeShape | null => {
    return getNodeFromSourceNode(sourceNode, 'prev');
  }

  const handleSelectShape = (shape: INodeShape, direction: NodeDirection) => {
    setSourceNode(shape);
    setDirection(direction);
    handleClickAddShape();
  };

  const updateLinkFromSourceNodeToRight = (newNode: INodeShape, sourceNode: INodeShape) => {
    if (sourceNode.next) {
      const nextNodeFromSourceNode = getNextNode(sourceNode);

      if (nextNodeFromSourceNode) {
        nextNodeFromSourceNode.prev = newNode.id;
        newNode.next = nextNodeFromSourceNode.id;
      }
    }

    sourceNode.next = newNode.id;
    newNode.prev = sourceNode.id;
  };

  const updateLinkFromSourceNodeToLeft = (newNode: INodeShape, sourceNode: INodeShape) => {
    if (sourceNode.prev) {
      const prevNodeFromSourceNode = getPrevNode(sourceNode);

      if (prevNodeFromSourceNode) {
        prevNodeFromSourceNode.next = newNode.id;
        newNode.prev = prevNodeFromSourceNode.id;
      }
    }

    sourceNode.prev = newNode.id;
    newNode.next = sourceNode.id;
  };

  const linkNewNode = (newNode: INodeShape, sourceNode: INodeShape, direction: NodeDirection) => {
    switch (direction) {
      case NodeDirection.Right:
        updateLinkFromSourceNodeToRight(newNode, sourceNode);
        break;
      case NodeDirection.Left:
        updateLinkFromSourceNodeToLeft(newNode, sourceNode);
        break;
      default:
    }
  };

  const handleAddShape = (newNode: INodeShape, sourceNode: INodeShape, direction: NodeDirection) => {
    newNode.id = currentId;
    setLastNodeAdded(newNode.id);

    if (sourceNode.type !== ShapeType.Default) {
      linkNewNode(newNode, sourceNode, direction);
    }

    setShapes([...shapes, newNode]);
    setNextId();
    handleClose();
  };

  const updateLinksNodeDeleted = (idDeleted: number) => {
    const currentNode = shapes.find(shape => shape.id === idDeleted) || defaultNodeShape;

    if (currentNode.next) {
      const nextNodeFromCurrentNode = getNextNode(currentNode);

      if (nextNodeFromCurrentNode) {
        nextNodeFromCurrentNode.prev = currentNode.prev;
      }
    }

    if (currentNode.prev) {
      const prevNodeFromCurrentNode = getPrevNode(currentNode);

      if (prevNodeFromCurrentNode) {
        prevNodeFromCurrentNode.next = currentNode.next;
      }
    }
  };

  const handleRemoveShape = (id: number) => {
    const index = shapes.findIndex(shape => shape.id === id);
    updateLinksNodeDeleted(id);
    let result = shapes.slice();
    result.splice(index, 1);
    setShapes(result);
    clearAddMode();
  };

  const clearAddMode = () => {
    setSourceNode(defaultNodeShape);
    setDirection(NodeDirection.Default);
  };

  const sortShapes = (): INodeShape[] => {
    const defaultNodes: INodeShape[] = [];

    if (shapes.length === 0) {
      return defaultNodes;
    }

    const nodes: INodeShape[] = [];
    const headNode: INodeShape = shapes.find(shape => !shape.prev) || defaultNodeShape;
    let node: INodeShape = headNode;

    while (node.id > 0) {
      nodes.push(node);
      node = shapes.find(shape => shape.id === node.next) || defaultNodeShape;
    }

    return nodes;
  };

  return (
    <div className="Draw">
      <CssBaseline />
      <Box sx={{ textAlign: 'center' }}>
        {shapes.length > 0
          ? <NodeShapes shapes={nodes} onDelete={handleRemoveShape} onAddNode={handleSelectShape} />
          : <Button variant="contained" onClick={handleClickAddShape}>Comenzar</Button>
        }
      </Box>
      <ShapeDialog open={open} onClose={handleClose} onAdd={handleAddShape} direction={direction} sourceNode={sourceNode} />
    </div>
  )
}

export default Draw;