import { useState } from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Dialog } from './Dialog'

afterEach(() => cleanup())

const DialogHarness = ({ onClosed = () => undefined }: { onClosed?: () => void }) => {
  const [open, setOpen] = useState(false)
  const close = () => {
    setOpen(false)
    onClosed()
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>Open</button>
      {open && (
        <Dialog labelledBy="dialog-title" onClose={close}>
          <h2 id="dialog-title">Details</h2>
          <button type="button" data-dialog-initial-focus onClick={close}>Close</button>
          <button type="button">Last action</button>
        </Dialog>
      )}
    </>
  )
}

const SingleControlDialogHarness = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>Open single</button>
      {open && (
        <Dialog labelledBy="single-dialog-title" onClose={() => setOpen(false)}>
          <h2 id="single-dialog-title">Single action</h2>
          <button type="button" data-dialog-initial-focus>Only action</button>
        </Dialog>
      )}
    </>
  )
}

describe('Dialog', () => {
  it('moves focus inside and restores the opener', async () => {
    const user = userEvent.setup()
    render(<DialogHarness />)
    const opener = screen.getByRole('button', { name: 'Open' })
    await user.click(opener)
    expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus()
    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(opener).toHaveFocus()
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    const onClosed = vi.fn()
    render(<DialogHarness onClosed={onClosed} />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    await user.keyboard('{Escape}')
    expect(onClosed).toHaveBeenCalledOnce()
  })

  it('wraps focus in both directions', async () => {
    const user = userEvent.setup()
    render(<DialogHarness />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    await user.tab({ shift: true })
    expect(screen.getByRole('button', { name: 'Last action' })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus()
  })

  it('does not close when its content is clicked', async () => {
    const user = userEvent.setup()
    const onClosed = vi.fn()
    render(<DialogHarness onClosed={onClosed} />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    await user.click(screen.getByRole('dialog'))
    expect(onClosed).not.toHaveBeenCalled()
  })

  it('closes when the overlay itself is clicked', async () => {
    const user = userEvent.setup()
    const onClosed = vi.fn()
    render(<DialogHarness onClosed={onClosed} />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    await user.click(screen.getByTestId('dialog-overlay'))
    expect(onClosed).toHaveBeenCalledOnce()
  })

  it('traps focus with a single control', async () => {
    const user = userEvent.setup()
    render(<SingleControlDialogHarness />)
    await user.click(screen.getByRole('button', { name: 'Open single' }))
    await user.tab()
    expect(screen.getByRole('button', { name: 'Only action' })).toHaveFocus()
  })

  it('restores body scrolling after close', async () => {
    const user = userEvent.setup()
    document.body.style.overflow = 'auto'
    render(<DialogHarness />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(document.body.style.overflow).toBe('hidden')
    await user.keyboard('{Escape}')
    expect(document.body.style.overflow).toBe('auto')
  })
})
