'use client';
export const dynamic = 'force-dynamic';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import deleteProduct from '@/hooks/deleteProduct';
import { toast } from 'sonner';

interface DeleteProductProps {
  id: string;
}

export function DeleteProduct({ id }: DeleteProductProps) {
  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      toast.success('تم حذف المنتج بنجاح');
      window.location.reload();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('حدث خطأ أثناء حذف المنتج');
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">حذف</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>هل أنت متأكد من حذف هذا المنتج؟</DialogTitle>
          <DialogDescription>
            لا يمكنك استرجاع هذا المنتج بعد حذفه
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              إغلاق
            </Button>
          </DialogClose>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            تأكيد
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
