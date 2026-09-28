import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { Tabs } from './Tabs'
import { useAppStore } from '../store/appStore'

describe('Tabs', () => {
  afterEach(() => {
    cleanup()
    window.history.replaceState({}, '', '/')
  })

  beforeEach(() => {
    useAppStore.setState({ activeTab: 'overview' })
  })

  it('supports roving keyboard focus and separate activation with Enter', async () => {
    const user = userEvent.setup()
    render(<Tabs />)

    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(3)
    expect(tabs[0]).toHaveAttribute('id', 'tab-overview')
    expect(tabs[0]).toHaveAttribute('aria-controls', 'panel-overview')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    expect(tabs[1]).toHaveAttribute('id', 'tab-formations')
    expect(tabs[1]).toHaveAttribute('aria-controls', 'panel-formations')

    tabs[0].focus()
    await user.keyboard('{ArrowRight}')
    expect(tabs[1]).toHaveFocus()
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{Enter}')
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false')
  })

  it('activates the focused tab with Space and supports Home and End', () => {
    render(<Tabs />)

    const tabs = screen.getAllByRole('tab')
    tabs[1].focus()
    fireEvent.keyDown(tabs[1], { key: ' ' })
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')

    fireEvent.keyDown(tabs[1], { key: 'Home' })
    expect(tabs[0]).toHaveFocus()
    fireEvent.keyDown(tabs[0], { key: 'End' })
    expect(tabs[2]).toHaveFocus()
  })

  it('removes only a recognized project hash while preserving the path and query', () => {
    window.history.pushState({}, '', '/resume/profile?view=compact#personal-project-4')
    useAppStore.setState({ activeTab: 'personal' })
    render(<Tabs />)

    fireEvent.click(screen.getByRole('tab', { name: /aperçu/i }))

    expect(window.location.pathname).toBe('/resume/profile')
    expect(window.location.search).toBe('?view=compact')
    expect(window.location.hash).toBe('')
  })

  it('moves the roving tab stop when activeTab changes externally', () => {
    render(<Tabs />)

    act(() => {
      useAppStore.getState().setActiveTab('personal')
    })

    const tabs = screen.getAllByRole('tab')
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true')
    expect(tabs.filter((tab) => tab.getAttribute('tabindex') === '0')).toEqual([tabs[2]])
  })

  it('keeps a manually moved focus target while focus remains in the tablist', () => {
    render(<Tabs />)

    const tabs = screen.getAllByRole('tab')
    tabs[0].focus()
    fireEvent.keyDown(tabs[0], { key: 'ArrowRight' })

    act(() => {
      useAppStore.getState().setActiveTab('personal')
    })

    expect(tabs[1]).toHaveFocus()
    expect(tabs[1]).toHaveAttribute('tabindex', '0')
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true')
  })
})
