// export function storeSlugConvert(loja: string) {
//   if (loja === "203240284") return "7449495057";
//   else if (loja === "203312422") return "7449497848";
//   else if (loja === "203255744") return "12059987866";
//   else if (loja === "203257247") return "7449500076";
//   else if (loja === "203721838") return "13017340405";
//   else if (loja === "203364715") return "7440850206";
//   else if (loja === "203526903") return "10163974604";
//   else if (loja === "203471687") return "11725458208";
//   else if (loja === "203398305") return "203398305";
//   else if (loja === "203462662") return "203462662";

//   return null;
// }

export function storeSlugConvert(loja: string) {
  if (loja === "7449495057") return "203240284";
  else if (loja === "7449497848") return "203312422";
  else if (loja === "12059987866") return "203255744";
  else if (loja === "7449500076") return "203257247";
  else if (loja === "13017340405") return "203721838";
  else if (loja === "7440850206") return "203364715";
  else if (loja === "10163974604") return "203526903";
  else if (loja === "3217867066") return "203471687";

  return loja;
}
