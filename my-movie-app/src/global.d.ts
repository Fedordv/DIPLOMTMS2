declare module 'swiper' {
  import { SwiperOptions } from 'swiper/types';
  import { ReactNode } from 'react';

  export interface SwiperProps extends SwiperOptions {
    children?: ReactNode;
    ref?: React.Ref<any>;
  }

  export const Swiper: React.FC<SwiperProps>;
  export const SwiperSlide: React.FC<{ children?: ReactNode }>;
}