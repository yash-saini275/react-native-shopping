export type ShopNavigatorParamList = {
  ProductOverview: undefined;
  ProductDetail: { productId: string; title: string };
  Cart: undefined;
};

export type AdminNavigatorParamsList = {
  UserProducts: undefined;
  EditProduct: { id: string; title: string; submit?: () => void };
};
