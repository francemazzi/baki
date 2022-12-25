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
export type cardTypeNFT = {
  foto?: any;
  titolo?: any;
  produttore?: string;
  categoria?: string;
  prezzo?: string;
  portate?: string;
  linkPage?: string;
  listing?: string;
};

export type productPageType = {
  foto: string;
  titolo: string;
  produttore: string;
  categoria: string;
  prezzo: string;
  portate: string;
};

export type buttonType = {
  text: string;
  textColor: string;
  color: string;
  colorHover: string;
  onClick?: () => void;
};
