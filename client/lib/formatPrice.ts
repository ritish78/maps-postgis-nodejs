export function formatPrice(price: number): string {
  const formattedPrice = new Intl.NumberFormat("en-IN").format(price);

  return formattedPrice;
}
