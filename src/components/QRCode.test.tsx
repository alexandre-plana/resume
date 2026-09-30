import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { QRCode } from './QRCode'

describe('QRCode', () => {
  it('renders a translated alt text and a local image source', () => {
    render(<QRCode url="https://alexandre-plana.github.io/resume/" language="fr" />)

    const image = screen.getByRole('img', { name: 'QR code du CV en ligne' })
    expect(image).toHaveAttribute('src')
    expect(image.getAttribute('src')).not.toMatch(/^https?:\/\//)
  })
})
