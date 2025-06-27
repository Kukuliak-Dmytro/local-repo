// Filters products by title or description, case-insensitive
export function liveSearch(products, query) {
  if (!query) return products;
  const lowerQuery = query.toLowerCase();
  return products.filter(product => {
    const title = product.title?.toLowerCase() || '';
    const description = product.description?.toLowerCase() || '';
    return title.includes(lowerQuery) || description.includes(lowerQuery);
  });
}
