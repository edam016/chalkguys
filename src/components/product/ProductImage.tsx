import { useState } from 'react';
import type { ShopifyImage } from '../../types/shopify';

interface ProductImageProps {
  images: ShopifyImage[];
  productTitle: string;
}

export function ProductImage({ images, productTitle }: ProductImageProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentImage = images[selectedIndex];

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-surface flex flex-col items-center justify-center text-text-secondary">
        <svg viewBox="0 0 120 120" className="w-20 h-20 opacity-15">
          <polygon points="60,15 105,100 15,100" fill="currentColor" />
        </svg>
        <p className="mt-3 text-sm font-light">No image available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="aspect-square overflow-hidden bg-surface">
        <img
          src={currentImage.url}
          alt={currentImage.altText || productTitle}
          className="w-full h-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.url}
              onClick={() => setSelectedIndex(i)}
              aria-label={img.altText || `Product image ${i + 1}`}
              className={`shrink-0 w-16 h-16 overflow-hidden border cursor-pointer transition-colors duration-300 ${
                i === selectedIndex ? 'border-accent' : 'border-white/10 hover:border-white/20'
              }`}
            >
              <img
                src={img.url}
                alt={img.altText || `${productTitle} ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
