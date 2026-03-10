import { Checkbox } from '@/components/atoms';
import { cn } from '@/lib/utils';

export const FilterCheckboxOption = ({
  label,
  amount,
  checked = false,
  onCheck = () => null,
  disabled = false,
  ...props
}: {
  label: string;
  amount?: number;
  checked?: boolean;
  onCheck?: (option: string) => void;
  disabled?: boolean;
  'data-testid'?: string;
}) => {
  return (
    <label
      className={cn(
        'flex gap-2 items-center cursor-pointer',
        disabled && '!cursor-default'
      )}
      onClick={() => (disabled ? null : onCheck(label))}
      {...props}
    >
      <Checkbox checked={checked} disabled={disabled} />
      <p
        className={cn(
          'text-xs !font-normal',
          checked && '!font-semibold',
          disabled && 'text-disabled'
        )}
      >
        {label}{' '}
        {amount !== undefined && (
          <span className='text-[10px] text-gray-400 !font-light ml-1'>
            ({amount})
          </span>
        )}
      </p>
    </label>
  );
};
