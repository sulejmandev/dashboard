'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export default function SSEListener() {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/notify.mp3');

    const playSound = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    };

    const es = new EventSource('/api/events');

    es.addEventListener('buyer_added', (event) => {
      const data = JSON.parse(event.data);

      playSound();

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

      playSound(); // ⬅️ تشغيل الصوت

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
