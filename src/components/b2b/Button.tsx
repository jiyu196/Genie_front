import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
}

export default function Button({
                                   variant = 'primary',
                                   className,
                                   ...props
                               }: ButtonProps) {
    return (
        <button
            className={clsx(
                'rounded-full px-6 py-3 text-sm font-medium transition cursor-pointer',
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
