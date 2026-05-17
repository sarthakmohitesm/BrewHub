import connectDB from '@/lib/mongodb';
import MenuItem from '@/models/MenuItem';

export async function POST() {
  try {
    await connectDB();

    const existing = await MenuItem.countDocuments();
    if (existing > 0) {
      return Response.json({ message: 'Menu already seeded', count: existing });
    }

    const menuItems = [
      // Coffee
      {
        title: 'Espresso',
        price: 149,
        category: 'coffee',
        image: '/menu/espresso.jpg',
        description: 'Rich and bold single-shot espresso with golden crema',
        popular: true,
        prepTime: 5,
      },
      {
        title: 'Cappuccino',
        price: 199,
        category: 'coffee',
        image: '/menu/cappuccino.jpg',
        description: 'Velvety steamed milk with a rich espresso base and foam art',
        popular: true,
        prepTime: 7,
      },
      {
        title: 'Caramel Macchiato',
        price: 249,
        category: 'coffee',
        image: '/menu/caramel-macchiato.jpg',
        description: 'Espresso with vanilla syrup, steamed milk, and caramel drizzle',
        popular: true,
        prepTime: 8,
      },
      {
        title: 'Cold Brew',
        price: 219,
        category: 'coffee',
        image: '/menu/cold-brew.jpg',
        description: 'Slow-steeped, ultra-smooth cold brew coffee served over ice',
        popular: false,
        prepTime: 3,
      },
      {
        title: 'Mocha Latte',
        price: 229,
        category: 'coffee',
        image: '/menu/mocha-latte.jpg',
        description: 'Rich chocolate meets espresso with steamed milk and whipped cream',
        popular: true,
        prepTime: 8,
      },
      {
        title: 'Americano',
        price: 169,
        category: 'coffee',
        image: '/menu/americano.jpg',
        description: 'Double espresso diluted with hot water for a clean taste',
        popular: false,
        prepTime: 4,
      },
      // Tea
      {
        title: 'Masala Chai',
        price: 129,
        category: 'tea',
        image: '/menu/masala-chai.jpg',
        description: 'Traditional Indian spiced tea with cardamom, ginger, and cinnamon',
        popular: true,
        prepTime: 6,
      },
      {
        title: 'Green Tea',
        price: 149,
        category: 'tea',
        image: '/menu/green-tea.jpg',
        description: 'Premium Japanese green tea leaves steeped to perfection',
        popular: false,
        prepTime: 5,
      },
      {
        title: 'Matcha Latte',
        price: 229,
        category: 'tea',
        image: '/menu/matcha-latte.jpg',
        description: 'Ceremonial grade matcha whisked with creamy steamed milk',
        popular: true,
        prepTime: 7,
      },
      {
        title: 'Earl Grey',
        price: 159,
        category: 'tea',
        image: '/menu/earl-grey.jpg',
        description: 'Classic bergamot-infused black tea with a citrus finish',
        popular: false,
        prepTime: 5,
      },
      // Snacks
      {
        title: 'Croissant',
        price: 129,
        category: 'snacks',
        image: '/menu/croissant.jpg',
        description: 'Buttery, flaky French croissant baked fresh every morning',
        popular: true,
        prepTime: 5,
      },
      {
        title: 'Club Sandwich',
        price: 249,
        category: 'snacks',
        image: '/menu/club-sandwich.jpg',
        description: 'Triple-decker with grilled chicken, bacon, lettuce, and tomato',
        popular: true,
        prepTime: 12,
      },
      {
        title: 'Garlic Bread',
        price: 149,
        category: 'snacks',
        image: '/menu/garlic-bread.jpg',
        description: 'Crispy baguette with herb butter and roasted garlic',
        popular: false,
        prepTime: 8,
      },
      {
        title: 'Veggie Wrap',
        price: 199,
        category: 'snacks',
        image: '/menu/veggie-wrap.jpg',
        description: 'Fresh vegetables with hummus in a soft tortilla wrap',
        popular: false,
        prepTime: 10,
      },
      // Desserts
      {
        title: 'Chocolate Brownie',
        price: 179,
        category: 'desserts',
        image: '/menu/brownie.jpg',
        description: 'Dense, fudgy chocolate brownie with a crackly top',
        popular: true,
        prepTime: 5,
      },
      {
        title: 'Tiramisu',
        price: 249,
        category: 'desserts',
        image: '/menu/tiramisu.jpg',
        description: 'Classic Italian coffee-flavored dessert with mascarpone cream',
        popular: true,
        prepTime: 5,
      },
      {
        title: 'Cheesecake',
        price: 229,
        category: 'desserts',
        image: '/menu/cheesecake.jpg',
        description: 'New York style baked cheesecake with berry compote',
        popular: false,
        prepTime: 5,
      },
      {
        title: 'Cinnamon Roll',
        price: 169,
        category: 'desserts',
        image: '/menu/cinnamon-roll.jpg',
        description: 'Warm, gooey cinnamon roll with cream cheese frosting',
        popular: true,
        prepTime: 8,
      },
      // Combos
      {
        title: 'Breakfast Combo',
        price: 349,
        category: 'combos',
        image: '/menu/breakfast-combo.jpg',
        description: 'Cappuccino + Croissant + Fresh fruit bowl',
        popular: true,
        prepTime: 12,
      },
      {
        title: 'Afternoon Delight',
        price: 399,
        category: 'combos',
        image: '/menu/afternoon-combo.jpg',
        description: 'Cold Brew + Club Sandwich + Chocolate Brownie',
        popular: true,
        prepTime: 15,
      },
      {
        title: 'Date Night Special',
        price: 599,
        category: 'combos',
        image: '/menu/date-night.jpg',
        description: '2 Caramel Macchiatos + Tiramisu + Garlic Bread',
        popular: true,
        prepTime: 15,
      },
    ];

    const items = await MenuItem.insertMany(menuItems);
    return Response.json(
      { message: 'Menu seeded successfully!', count: items.length },
      { status: 201 }
    );
  } catch (error) {
    console.error('Seed error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
