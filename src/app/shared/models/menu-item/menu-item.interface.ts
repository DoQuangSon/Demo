export interface MenuItem {
  name: string;
  url?: string;
  class: string;
  path?: string;
  children?: MenuItem[];
  urlImage?: string;
  activeSlug?: string;
  urlImageli?: string;

}
