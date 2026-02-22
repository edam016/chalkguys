import type { ProductVariant } from '../../types/shopify';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onSelect: (variant: ProductVariant) => void;
}

export function VariantSelector({ variants, selectedVariant, onSelect }: VariantSelectorProps) {
  if (variants.length === 1 && variants[0].title === 'Default Title') {
    return null;
  }

  const optionGroups = new Map<string, string[]>();
  for (const variant of variants) {
    for (const opt of variant.selectedOptions) {
      if (!optionGroups.has(opt.name)) {
        optionGroups.set(opt.name, []);
      }
      const values = optionGroups.get(opt.name)!;
      if (!values.includes(opt.value)) {
        values.push(opt.value);
      }
    }
  }

  return (
    <div className="space-y-4">
      {Array.from(optionGroups).map(([name, values]) => (
        <div key={name}>
          <label className="block text-xs font-light text-text-secondary mb-2 tracking-widest uppercase">
            {name}
          </label>
          <div className="flex flex-wrap gap-2">
            {values.map((value) => {
              const isSelected = selectedVariant.selectedOptions.some(
                (o) => o.name === name && o.value === value
              );
              const matchingVariant = variants.find((v) =>
                v.selectedOptions.some((o) => o.name === name && o.value === value)
              );
              const isAvailable = matchingVariant?.availableForSale ?? false;

              return (
                <button
                  key={value}
                  onClick={() => {
                    if (matchingVariant) onSelect(matchingVariant);
                  }}
                  disabled={!isAvailable}
                  className={`px-4 py-2 border text-sm font-light transition-colors duration-300 cursor-pointer disabled:cursor-not-allowed ${
                    isSelected
                      ? 'border-accent bg-accent/20 text-chalk font-medium'
                      : isAvailable
                        ? 'border-white/10 hover:border-white/20 text-text-secondary hover:text-chalk'
                        : 'border-white/5 text-text-secondary opacity-30 line-through'
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
