import { PrismaClient } from '@prisma/client';
import { CreateCoffeeDto } from 'src/dto/coffee.dto';

const prisma = new PrismaClient();

const COFFEE_SEEDS: CreateCoffeeDto[] = [
  {
    name: 'Dark Roast',
    description: 'Free in the MVST office',
    type: 'ARABIC',
    price: 1950,
    imageUrl:
      'https://epacflexibles.com/wp-content/uploads/2020/04/coffee_bag_mockup.png',
  },
  {
    name: 'Velvet Sunrise',
    description: 'Smooth and bright, perfect for early mornings',
    type: 'ARABIC',
    price: 2100,
    imageUrl:
      'https://epacflexibles.com/wp-content/uploads/2020/04/coffee_bag_mockup.png',
  },
  {
    name: 'Midnight Ember',
    description: 'Dark and smoky with a hint of spice',
    type: 'ROBUSTA',
    price: 1850,
    imageUrl:
      'https://epacflexibles.com/wp-content/uploads/2020/04/coffee_bag_mockup.png',
  },
  {
    name: 'Caramel Drift',
    description: 'Sweet and mellow with caramel notes',
    type: 'ARABIC',
    price: 2000,
    imageUrl:
      'https://epacflexibles.com/wp-content/uploads/2020/04/coffee_bag_mockup.png',
  },
  {
    name: 'Jungle Brew',
    description: 'Strong and earthy, with a bold character',
    type: 'ROBUSTA',
    price: 1900,
    imageUrl:
      'https://epacflexibles.com/wp-content/uploads/2020/04/coffee_bag_mockup.png',
  },
  {
    name: 'Amber Roast',
    description: 'Balanced and toasty with a clean finish',
    type: 'ARABIC',
    price: 1950,
    imageUrl:
      'https://epacflexibles.com/wp-content/uploads/2020/04/coffee_bag_mockup.png',
  },
  {
    name: 'Cocoa Rush',
    description: 'Bold flavor with rich cocoa aroma',
    type: 'ROBUSTA',
    price: 1900,
    imageUrl:
      'https://epacflexibles.com/wp-content/uploads/2020/04/coffee_bag_mockup.png',
  },
  {
    name: 'Golden Bean',
    description: 'Elegant and aromatic, ideal for slow afternoons',
    type: 'ARABIC',
    price: 2050,
    imageUrl:
      'https://epacflexibles.com/wp-content/uploads/2020/04/coffee_bag_mockup.png',
  },
];

async function main() {
  const created = await prisma.coffee.createManyAndReturn({
    data: COFFEE_SEEDS.map((c) => ({
      ...c,
      normalizedName: c.name.trim().toLowerCase(),
    })),
  });

  console.log(`Inserted ${created.length} entries into Coffee table`);
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
