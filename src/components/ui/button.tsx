import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent bg-clip-padding font-semibold tracking-tight whitespace-nowrap transition-all duration-150 ease-out outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-45 not-disabled:hover:-translate-y-px [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // DS: primary
        default:
          "bg-brand text-[var(--text-on-accent)] border-brand shadow-[var(--shadow-xs)] hover:bg-brand-hover hover:border-brand-hover",
        // DS: secondary
        secondary:
          "bg-surface-2 text-ink border-line-strong hover:bg-surface-3 hover:border-[var(--navy-600)]",
        // DS: ghost
        ghost:
          "bg-transparent text-ink-2 border-transparent hover:bg-surface-2 hover:text-ink",
        // DS: danger
        destructive:
          "bg-cost text-[var(--text-on-accent)] border-cost hover:bg-[var(--cost-strong)] hover:border-[var(--cost-strong)]",
        link: "text-brand border-transparent underline-offset-4 hover:underline hover:translate-y-0",
      },
      size: {
        sm: "h-7 px-2.5 text-xs",
        default: "h-9 px-3.5 text-sm",
        lg: "h-11 px-5 text-base",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  render,
  nativeButton,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      render={render}
      // When rendered as a Link/anchor, it is not a native <button>.
      nativeButton={nativeButton ?? !render}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
