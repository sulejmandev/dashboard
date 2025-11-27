'use client';

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
export function DeleteProduct({ id }) {
  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      toast.success('تم حدف المنتج بنجاح');
      window.location.reload();
    } catch (error: any) {
      toast.error(error.message || 'حدث خطأ أثناء حدف المنتج');
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
