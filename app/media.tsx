'use client';

import { createMedia } from '@artsy/fresnel';

const ExampleAppMedia = createMedia({
  breakpoints: {
    xxs: 0,
    xs: 480,
    sm: 768,
    cus: 890,
    md: 1280,
    mlg: 1366,
    lg: 1920,
  },
});

// Make styles for injection into the header of the page
export const mediaStyles = ExampleAppMedia.createMediaStyle();

export const { Media, MediaContextProvider } = ExampleAppMedia;
