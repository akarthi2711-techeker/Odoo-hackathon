import { sequelize, Product } from './models';

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database cleared and synced.');

    const products = [
      { name: 'Espresso', price: 3.50, status: 'active' },
      { name: 'Cappuccino', price: 4.50, status: 'active' },
      { name: 'Latte', price: 4.75, status: 'active' },
      { name: 'Mocha', price: 5.00, status: 'active' },
      { name: 'Iced Coffee', price: 3.75, status: 'active' },
      { name: 'Cold Brew', price: 4.25, status: 'active' },
      { name: 'Croissant', price: 3.25, status: 'active' },
      { name: 'Blueberry Muffin', price: 3.00, status: 'active' },
      { name: 'Avocado Toast', price: 7.50, status: 'active' },
      { name: 'Matcha Latte', price: 5.25, status: 'active' }
    ];

    await Product.bulkCreate(products);
    console.log(`Seeded ${products.length} products successfully.`);
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
