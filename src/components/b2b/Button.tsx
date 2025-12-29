import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

    variant?: ButtonVariant;
    size?: ButtonSize;
}

export default function Button({
                                   variant = 'primary',
                                   size = 'md',
                                   className,
                                   ...props
                               }: ButtonProps) {
    return (
        <button
            className={clsx(
                'rounded-full font-medium transition cursor-pointer',
                size === 'md' && 'px-6 py-3 text-sm',
                size === 'sm' && 'px-5 py-[7px] text-sm leading-none rounded-full',
                variant === 'primary' &&
                'bg-[#19344e] text-[#F4F6FF] hover:bg-[#19344e]',
                variant === 'secondary' &&
                'border border-[#19344e] text-[#19344e] hover:bg-[#F4F6FF]',
                className
            )}
            {...props}
        />
    );
}
