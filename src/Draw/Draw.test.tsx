import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Draw from './Draw'

describe('Draw', () => {

  describe('render', () => {

    it('should render draw component', () => {
      const component = render(<Draw />)
            
      expect(component).toBeDefined();
    })

    it('should show a start button', () => {
      render(<Draw />)

      fireEvent.click(screen.getByText('Comenzar'))

      expect(screen.getByText('Comenzar')).toBeInTheDocument()
    })

  })
})