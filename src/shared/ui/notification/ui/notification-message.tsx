import { m } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { INotification } from '../model/notification.type';
import { Button } from '../../(buttons)/button';
import { useNotification } from '../model/notification-store';
import { NotificationIcons } from '../config/icons';

export const NotificationMassage = ({ text, type, duration = 3000, id }: INotification) => {
  const { closeNotificationById } = useNotification();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const close = () => {
    closeNotificationById(id);
  };

  useEffect(() => {
    if (duration) {
      timerRef.current = setTimeout(() => {
        close();
      }, duration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <m.div
      layout
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(24px)' }}
      initial={{ opacity: 0, y: 40, filter: 'blur(24px)' }}
    >
      <Button
        className=' w-96 h-min p-4 !text-white mb-2 data-[hover=true]:opacity-100 border-box text-wrap leading-5'
        color={type}
        variant='shadow'
        onPress={close}
      >
        {NotificationIcons[type || 'default']}
        {text}
      </Button>
    </m.div>
  );
};
