import { Link } from '@tanstack/react-router';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

export default function ChooseItemDialog({
  itemName = 'item',
  description,
  table,
  open,
  onClose,
  notFoundText = 'Cannot find the item you are looking for? Click here to add it.',
  notFoundLink = '/',
}: {
  itemName?: string;
  description?: string;
  table: React.ReactNode;
  open: boolean;
  onClose: () => void;
  notFoundText?: string;
  notFoundLink?: string;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className='max-h-[80vh] w-full sm:max-w-[90%] md:max-w-3xl lg:max-w-4xl'>
        <DialogHeader>
          <DialogTitle>
            Choose <span className='capitalize'>{itemName}</span>
          </DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className='max-h-100 w-full overflow-auto'>{table}</div>
        <DialogFooter className='text-muted-foreground mt-4 text-sm'>
          <Link
            to={notFoundLink}
            className='hover:underline'
          >
            {notFoundText}
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
