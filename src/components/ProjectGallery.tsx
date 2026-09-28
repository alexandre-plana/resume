import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@primer/octicons-react'
import type { ProjectImage } from '../types'
import styles from '../App.module.css'

interface ProjectGalleryProps {
  images: ProjectImage[]
  previousLabel: string
  nextLabel: string
  showLabel: string
}

const resolveImageSrc = (src: string) => {
  if (/^(?:https?:|data:|blob:)/.test(src)) return src
  return `${import.meta.env.BASE_URL}${src.replace(/^\/+/, '')}`
}

export function ProjectGallery({ images, previousLabel, nextLabel, showLabel }: ProjectGalleryProps) {
  const [activeSource, setActiveSource] = useState(images[0]?.src ?? '')
  const [failedSources, setFailedSources] = useState<string[]>([])
  const usableImages = images.filter((image) => !failedSources.includes(image.src))
  const selectedIndex = Math.max(0, usableImages.findIndex((image) => image.src === activeSource))
  const selectedImage = usableImages[selectedIndex]

  if (!selectedImage) return null

  const selectRelativeImage = (offset: number) => {
    const nextIndex = (selectedIndex + offset + usableImages.length) % usableImages.length
    setActiveSource(usableImages[nextIndex].src)
  }

  const discardImage = (src: string) => {
    setFailedSources((current) => (current.includes(src) ? current : [...current, src]))
  }

  return (
    <div className={styles.projectGallery}>
      <div className={styles.projectGalleryViewport}>
        <img
          className={styles.projectGalleryMainImage}
          src={resolveImageSrc(selectedImage.src)}
          alt={selectedImage.alt}
          loading="lazy"
          decoding="async"
          onError={() => discardImage(selectedImage.src)}
        />

        {usableImages.length > 1 && (
          <>
            <button
              type="button"
              className={`${styles.projectGalleryArrow} ${styles.projectGalleryArrowPrevious}`}
              aria-label={previousLabel}
              onClick={() => selectRelativeImage(-1)}
            >
              <ChevronLeftIcon size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`${styles.projectGalleryArrow} ${styles.projectGalleryArrowNext}`}
              aria-label={nextLabel}
              onClick={() => selectRelativeImage(1)}
            >
              <ChevronRightIcon size={18} aria-hidden="true" />
            </button>
            <span className={styles.projectGalleryCounter} aria-live="polite">
              {selectedIndex + 1} / {usableImages.length}
            </span>
          </>
        )}
      </div>

      {usableImages.length > 1 && (
        <div className={styles.projectGalleryRail}>
          {usableImages.map((image, index) => (
            <button
              type="button"
              key={image.src}
              className={`${styles.projectGalleryThumbnail} ${index === selectedIndex ? styles.projectGalleryThumbnailActive : ''}`}
              aria-label={`${showLabel} ${image.alt}`}
              aria-pressed={index === selectedIndex}
              onClick={() => setActiveSource(image.src)}
            >
              <img
                src={resolveImageSrc(image.src)}
                alt=""
                loading="lazy"
                decoding="async"
                onError={() => discardImage(image.src)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
