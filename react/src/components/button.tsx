import type { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'font-semibold leading-none px-5 rounded-lg transition-colors duration-300 flex items-center gap-2 justify-center',
  variants: {
    variant: {
      primary: 'text-lime-950 bg-lime-300 hover:bg-lime-500',
      secondary: 'text-zinc-200 bg-zinc-800 hover:bg-zinc-700'
    },
    size: {
      small: 'py-2',
      medium: 'py-3',
      full: 'py-3 w-full',
    }
  },

  defaultVariants: {
    variant: 'primary',
    size: 'medium'
  }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  children: ReactNode
}

export function Button({ children, variant, size, ...props }: ButtonProps) {
  return (
    <button {...props} className={buttonVariants({ variant, size })}>
      {children}
    </button>
  )
}