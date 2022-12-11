export interface NewProductType {
  Abbinamenti?: string;
  Description?: string;
  Ingredient?: string;
  disponibile?: string;
  id?: string;
  producer?: string;
  title?: string;
  img?: File;
}

export type cardType = {
  foto: string;
  titolo: string;
  produttore: string;
  categoria: string;
  prezzo: string;
  portate: string;
  linkPage: string;
};
