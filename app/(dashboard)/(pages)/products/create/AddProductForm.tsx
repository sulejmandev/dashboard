'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, ProductType } from '@/validations/product.schema';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';

import { toast } from 'sonner';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import UploadImg from '@/components/upload-img';
import { useUploadThing } from '@/lib/uploadthing';
import { createProductAction } from '../actions';

export default function AddProductForm() {
  const form = useForm<ProductType>({
    resolver: zodResolver(productSchema),
  });

  const [files, setFiles] = useState<File[] | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filePreview, setFilePreview] = useState<string | undefined>(undefined);

  const { startUpload } = useUploadThing('imageUploader');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setOpenDialog(true);

    const data = form.getValues();

    // رفع الصورة
    let imageUrl = '';
    if (files && files.length > 0) {
      const uploaded = await startUpload(files);
      if (uploaded?.[0]?.ufsUrl) {
        imageUrl = uploaded[0].ufsUrl;
      }
    }

    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value as string);
      });

      formData.append('img', imageUrl);

      // 🚀 Server Action مباشرة (بدون fetch)
      await createProductAction(formData);

      toast.success('تم إضافة المنتج بنجاح');

      setOpenDialog(false);
      form.reset();
      setFiles(null);
      setFilePreview(undefined);

      router.push('/products');
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error('حدث خطأ أثناء إضافة المنتج', {
          description: err.message,
        });
      }
      setOpenDialog(false);
    }
  }

  return (
    <div dir="rtl" className="w-full">
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="flex flex-col items-center justify-center gap-4 py-10">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              .... جاري إضافة المنتج
            </DialogTitle>
          </DialogHeader>

          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </DialogContent>
      </Dialog>

      <form className="px-8 py-6 space-y-8" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold mt-1">إضافة منتج جديد</h1>
          <Button className="bg-primary" type="submit">
            إضافة المنتج
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* LEFT SIDE – deleted redundant comments */}
          <div className="xl:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card className="rounded-xl shadow-sm border bg-white">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-lg font-semibold">المعلومات الأساسية</h2>

                <div className="space-y-2">
                  <Label>اسم المنتج</Label>
                  <Input {...form.register('name')} className="h-12" required />
                </div>

                <div className="space-y-2">
                  <Label>الوصف</Label>
                  <Textarea
                    {...form.register('description')}
                    className="min-h-[130px]"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card className="rounded-xl shadow-sm border bg-white">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-lg font-semibold">السعر والمخزون</h2>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <Label>السعر</Label>
                    <Input
                      {...form.register('price')}
                      className="h-12"
                      required
                    />
                  </div>

                  <div>
                    <Label>السعر القديم</Label>
                    <Input {...form.register('oldPrice')} className="h-12" />
                  </div>

                  <div>
                    <Label>العرض</Label>
                    <Input {...form.register('offer')} className="h-12" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category & Weight */}
            <Card className="rounded-xl shadow-sm border bg-white">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-lg font-semibold">الفئة والوزن</h2>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>الفئة</Label>
                    <Select
                      value={form.watch('category')}
                      onValueChange={(v) =>
                        form.setValue('category', v as ProductType['category'])
                      }
                    >
                      <SelectTrigger className="h-12 w-60">
                        <SelectValue placeholder="اختر الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="العروض">العروض</SelectItem>
                        <SelectItem value="العسل العضوي">
                          العسل العضوي
                        </SelectItem>
                        <SelectItem value="خلطات العسل">خلطات العسل</SelectItem>
                        <SelectItem value="منتجات المزرعة">
                          منتجات المزرعة
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>الوزن</Label>
                    <Select
                      value={form.watch('weight')}
                      onValueChange={(v) =>
                        form.setValue('weight', v as ProductType['weight'])
                      }
                    >
                      <SelectTrigger className="h-12 w-60">
                        <SelectValue placeholder="اختر الوزن" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="500">500 جرام</SelectItem>
                        <SelectItem value="1000">1000 جرام</SelectItem>
                        <SelectItem value="250">250 جرام</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side */}
          <UploadImg
            onUploaded={(files) => setFiles(files)}
            filePreview={filePreview}
            setFilePreview={setFilePreview}
          />
        </div>
      </form>
    </div>
  );
}
