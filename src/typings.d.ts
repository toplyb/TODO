declare module '*.svg';
declare module '*.png';
declare module '*.css';
declare module "*.less" {
  const content: { [className: string]: string };
  export default content;
}
