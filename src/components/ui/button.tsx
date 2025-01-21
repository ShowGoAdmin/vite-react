import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-0 ease-in-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-black border border-gray-700 text-white hover:border-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:rounded-full",
        outline:
          "bg-black border border-gray-700 text-white hover:border-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:rounded-full",
        secondary:
          "bg-black border border-black text-white hover:border-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:rounded-full",
        ghost: "hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-white hover:rounded-full",
        link: "text-white underline-offset-0 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-xd px-30 text-xs",
        lg: "h-10 rounded-xl px-10",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };