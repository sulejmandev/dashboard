'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function SSEListener() {
  const router = useRouter();

  useEffect(() => {
    const es = new EventSource('/api/events');

    es.addEventListener('buyer_added', (event) => {
      const data = JSON.parse(event.data);
      toast.success(`تم إضافة مشتري جديد: `, {
        description: data.buyer.name,
        action: {
          label: 'عرض المشتري',
          onClick: () => router.push('/buyers'),
        },
      });
    });

    es.addEventListener('otp_added', (event) => {
      const data = JSON.parse(event.data);
      toast.success(`تمت إضافة OTP  للمشتري: `, {
        description: data.buyer.name,
        action: {
          label: 'عرض المشتري',
          onClick: () => router.push('/buyers'),
        },
      });
    });

    return () => es.close();
  }, [router]);

  return null;
}
