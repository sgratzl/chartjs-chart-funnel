import chroma from 'chroma-js';

export function pickForegroundColorToBackgroundColor(
  color: string,
  blackColor: string = '#000000',
  whiteColor: string = '#ffffff'
): string {
  return chroma(color).luminance() > 0.5 ? blackColor : whiteColor;
}

export function blues(i: number, n: number): string {
  return chroma
    .scale('Blues')(i / (n - 1))
    .hex();
}
