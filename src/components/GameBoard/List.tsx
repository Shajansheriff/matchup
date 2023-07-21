import { cn, shuffle } from "@/lib/utils";
import { ComponentType, FC, ReactElement, ReactNode, useState } from "react";
import * as Switch from "@radix-ui/react-switch";

export const ListItem = ({
  value,
  disabled,
  checked,
  completed,
  ...props
}: {
  value: string;
  completed: boolean;
} & Switch.SwitchProps) => {
  return (
    <Switch.Root
      key={value}
      value={value}
      disabled={disabled}
      checked={checked}
      className={cn(
        "min-h-[48px] rounded-md px-8",
        "w-full inline-flex items-center justify-center rounded-md text-sm font-medium",
        "transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-80",
        "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        checked && "border-primary",
        disabled && "bg-accent text-accent-foreground"
        // completed && color,
        // completed && "text-white font-bold"
      )}
      {...props}
    >
      <li className="w-full">{value}</li>
    </Switch.Root>
  );
};

interface Props {
  data: string[];
  children: (data: string[]) => ReactElement;
}
export const List: React.FunctionComponent<Props> = ({ data, children }) => {
  return <ul className="space-y-3 flex flex-col">{children(data)}</ul>;
};

type WithShuffle = <T>(component: ComponentType<T>) => ReactElement;

export function withShuffle<T>(Component: ComponentType<Props>) {
  return function WithShuffled({ data, ...props }: Props) {
    const [items] = useState(() => shuffle(data));
    return <Component data={items} {...props} />;
  };
}

export const ShuffledList = withShuffle(List);
