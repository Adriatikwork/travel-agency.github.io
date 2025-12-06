"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
  currentIndex: number
  onNavigate: (index: number) => void
  destinationName: string
}

export function ImageModal({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
  destinationName,
}: ImageModalProps) {
  const nextImage = () => {
    onNavigate((currentIndex + 1) % images.length)
  }

  const prevImage = () => {
    onNavigate((currentIndex - 1 + images.length) % images.length)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") nextImage()
    if (e.key === "ArrowLeft") prevImage()
    if (e.key === "Escape") onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-7xl w-[95vw] h-[90vh] p-0 overflow-hidden bg-black/95 border-0"
        onKeyDown={handleKeyDown}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-sm"
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 z-50 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-black/60 hover:bg-black/80 text-white p-4 rounded-full backdrop-blur-sm transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-black/60 hover:bg-black/80 text-white p-4 rounded-full backdrop-blur-sm transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Main Image */}
          <div className="w-full h-full flex items-center justify-center p-8">
            <img
              src={images[currentIndex]}
              alt={`${destinationName} - ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-black/60 backdrop-blur-sm p-2 rounded-full">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => onNavigate(index)}
                className={`w-16 h-16 rounded-lg overflow-hidden transition-all ${
                  currentIndex === index
                    ? "ring-4 ring-white scale-110"
                    : "ring-2 ring-white/30 opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

