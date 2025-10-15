// Exportar componentes core
export { InlineFoodOptions } from "./core/inline-food-options";

// Exportar componentes inline separados por refeição
export { InlineCafeDaManha } from "./cafe-da-manha";
export { InlineAlmoco } from "./almoco";
export { InlineLancheTarde } from "./lanche-da-tarde";
export { InlineJanta } from "./janta";

// Types
export type {
  FoodOption,
  CategorySection,
  InlineFoodOptionsProps,
} from "./core/inline-food-options";

export type { InlineCafeDaManhaProps } from "./cafe-da-manha";
export type { InlineAlmocoProps } from "./almoco";
export type { InlineLancheTardeProps } from "./lanche-da-tarde";
export type { InlineJantaProps } from "./janta";
