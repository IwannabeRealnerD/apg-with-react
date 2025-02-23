import { FunctionComponent, HTMLAttributes, ReactNode } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { globalCn } from "@/utils/globalCn";

interface SharedToggleProps
  extends HTMLAttributes<HTMLInputElement>,
    VariantProps<typeof toggleWrapperVariants>,
    VariantProps<typeof toggleSizeVariants> {
  helperText?: ReactNode;
  label: ReactNode;
  labelDirection?: "left" | "right";
}
const toggleWrapperVariants = cva("flex", {
  defaultVariants: { labelDirection: "right" },
  variants: {
    labelDirection: {
      left: "flex-row-reverse",
      right: "flex-row",
    },
  },
});

const toggleSizeVariants = cva(
  "relative flex flex-row items-center rounded-full bg-gray-300 transition-colors duration-500 group-has-[input:checked]:bg-blue-500",
  {
    defaultVariants: { size: "sm" },
    variants: {
      size: {
        lg: "h-7 w-14 group-has-[input:checked]:*:translate-x-[28px]",
        md: "h-6 w-11 group-has-[input:checked]:*:translate-x-5",
        sm: "h-5 w-10 group-has-[input:checked]:*:translate-x-5",
      },
    },
  }
);

const innerButtonVariants = cva("absolute rounded-full bg-white transition-transform duration-500", {
  defaultVariants: { size: "sm" },
  variants: {
    size: {
      lg: "left-[3px] top-[3px] size-5.5",
      md: "left-[3px] top-[3px] size-4.5",
      sm: "left-[3px] top-[3px] size-3.5",
    },
  },
});
const labelVariants = cva("font-medium text-gray-900", {
  defaultVariants: { size: "sm" },
  variants: {
    labelDirection: {
      left: "text-left",
      right: "text-right",
    },
    size: {
      lg: "text-lg",
      md: "text-base",
      sm: "text-sm",
    },
  },
});
const helperTextVariants = cva("font-normal text-gray-500", {
  defaultVariants: { size: "sm" },
  variants: {
    labelDirection: {
      left: "text-left",
      right: "text-right",
    },
    size: {
      lg: "text-sm",
      md: "text-sm",
      sm: "text-xs",
    },
  },
});

export const SharedToggle: FunctionComponent<SharedToggleProps> = (props) => {
  const { helperText, label, labelDirection, size, ...restProps } = props;
  return (
    <label className="group flex cursor-pointer items-center">
      <input className="peer sr-only" role="switch" type="checkbox" {...restProps} />
      <div
        className={globalCn(
          "gap-2",
          toggleWrapperVariants({
            labelDirection,
          })
        )}
      >
        <div>
          {label && (
            <p
              className={globalCn(
                labelVariants({
                  labelDirection,
                  size,
                })
              )}
            >
              {label}
            </p>
          )}
          {helperText && (
            <p
              className={globalCn(
                helperTextVariants({
                  labelDirection,
                  size,
                })
              )}
            >
              {helperText}
            </p>
          )}
        </div>
        <div className={globalCn(toggleSizeVariants({ size }))}>
          <div className={globalCn(innerButtonVariants({ size }))}>
            <div className="absolute inset-0 rounded-full bg-white"></div>
          </div>
        </div>
      </div>
    </label>
  );
};
