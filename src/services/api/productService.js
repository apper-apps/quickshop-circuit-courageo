import productsData from "@/services/mockData/products.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  async getAll() {
    await delay(300);
    return [...productsData];
  },

  async getById(id) {
    await delay(200);
    const product = productsData.find(p => p.Id === parseInt(id));
    if (!product) {
      throw new Error("Product not found");
    }
    return { ...product };
  },

  async searchProducts(query) {
    await delay(250);
    if (!query.trim()) {
      return [...productsData];
    }
    
    const searchTerm = query.toLowerCase();
    return productsData.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  },

  async getByCategory(category) {
    await delay(300);
    if (!category) {
      return [...productsData];
    }
    
    return productsData.filter(product =>
      product.category.toLowerCase() === category.toLowerCase()
    );
  },

  getCategories() {
    const categories = [...new Set(productsData.map(p => p.category))];
    return categories.sort();
  }
};