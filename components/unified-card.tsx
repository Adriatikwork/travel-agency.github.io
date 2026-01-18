"use client"

import { Star, Clock, Tag } from "lucide-react"
import { getImagePath } from "@/lib/image-path"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface Badge {
  text: string
  color: "yellow" | "green" | "blue"
}

interface UnifiedCardProps {
  // Image
  image: string
  imageAlt: string

  // Badges (top-left)
  badges?: Badge[]

  // Rating (top-right)
  rating?: number

  // Location/Destination (appears at bottom of image)
  location?: string

  // Content
  title: string
  subtitle?: string
  description?: string

  // Tags
  tags?: string[]

  // Footer
  duration: number
  durationLabel: string
  price: number
  currency: string
  priceLabel: string

  // Optional CTA button
  ctaButton?: ReactNode

  // Hover overlay (optional)
  hoverContent?: ReactNode

  // Click handler
  onClick?: () => void

  // Additional class names
  className?: string
}

export function UnifiedCard({
  image,
  imageAlt,
  badges = [],
  rating,
  location,
  title,
  subtitle,
  description,
  tags = [],
  duration,
  durationLabel,
  price,
  currency,
  priceLabel,
  ctaButton,
  hoverContent,
  onClick,
  className,
}: UnifiedCardProps) {
  return (
    <div
      className={cn(
        "group relative bg-card rounded-2xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full max-w-[380px] mx-auto",
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      {/* Image Header */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={getImagePath(image)}
          alt={imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Badges - Top Left */}
        {badges.length > 0 && (
          <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
            {badges.map((badge, idx) => (
              <span
                key={idx}
                className={cn(
                  "px-3 py-1 text-xs font-semibold rounded-full",
                  badge.color === "yellow" && "bg-yellow-400 text-gray-900",
                  badge.color === "green" && "bg-green-500 text-white",
                  badge.color === "blue" && "bg-[#38b6ff] text-white flex items-center gap-1",
                )}
              >
                {badge.color === "blue" && <Tag className="w-3 h-3" />}
                {badge.text}
              </span>
            ))}
          </div>
        )}

        {/* Rating - Top Right */}
        {rating && (
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-900">{rating}</span>
          </div>
        )}

        {/* Location - Bottom of Image */}
        {location && (
          <div className="absolute bottom-3 left-4 text-white text-sm font-medium drop-shadow-lg">{location}</div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-5">
        {/* Main Content */}
        <div className="flex-shrink-0">
          <h3 className="text-xl font-bold text-foreground group-hover:text-sky-600 transition-colors line-clamp-2 text-balance leading-tight mb-2">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground italic line-clamp-1 text-pretty leading-relaxed mb-2">
              {subtitle}
            </p>
          )}
          {description && (
            <div className="text-sm text-foreground/80 leading-relaxed text-pretty line-clamp-2">{description}</div>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 flex-shrink-0">
            {tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 bg-sky-100 text-sky-700 text-xs font-medium rounded-full capitalize"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Spacer to push footer to bottom */}
        <div className="flex-grow" />

        {/* Footer - Duration & Price */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 mt-4 flex-shrink-0">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">
              {duration} {durationLabel}
            </span>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground font-medium">{priceLabel}</div>
            <div className="text-xl font-bold text-sky-600">
              {currency}
              {price}
            </div>
          </div>
        </div>

        {/* Optional CTA Button */}
        {ctaButton && <div className="pt-3 flex-shrink-0">{ctaButton}</div>}
      </div>

      {/* Hover Overlay (optional) */}
      {hoverContent && (
        <div className="absolute inset-0 bg-gradient-to-t from-sky-600/95 to-sky-500/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          {hoverContent}
        </div>
      )}
    </div>
  )
}
