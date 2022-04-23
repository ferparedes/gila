import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { NodeDirection } from '../shared/enums/NodeDirection.enum'
import { ShapeType } from '../shared/enums/ShapeType.enum'
import ShapeDialog from './ShapeDialog'

describe('ShapeDialog', () => {

  describe('render', () => {

    it('should render draw component', () => {
      const onClose = jest.fn();
      const onAdd = jest.fn();
      const open = true;
      const direction = NodeDirection.Right;
      const sourceNode = { id: 0, type: ShapeType.Default, prev: null, next: null };
      const component = render(<ShapeDialog onClose={onClose} onAdd={onAdd} open={open} direction={direction} sourceNode={sourceNode} />)

      expect(component).toBeDefined();
    })

  })

})