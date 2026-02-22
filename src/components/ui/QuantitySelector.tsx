interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export function QuantitySelector({ quantity, onChange, min = 1, max = 99, disabled = false }: QuantitySelectorProps) {
  return (
    <div className="inline-flex items-center border border-white/10 bg-surface/50 min-h-[44px]">
      <button
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={disabled || quantity <= min}
        className="px-3 py-3 text-text-secondary hover:text-chalk disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="px-3 py-3 min-w-[2.5rem] text-center font-medium tabular-nums text-chalk text-sm">
        {quantity}
      </span>
      <button
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={disabled || quantity >= max}
        className="px-3 py-3 text-text-secondary hover:text-chalk disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
