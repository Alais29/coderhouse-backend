export interface IItem {
  id?: string;
  title: string;
  price: number | string;
  thumbnail: string;
}

export interface IAlert {
  show: boolean;
  text: string;
}
