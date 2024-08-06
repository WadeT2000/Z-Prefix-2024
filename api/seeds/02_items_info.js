/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {user_name: 'BillyB', item_name: 'Watermellon', description: 'A watermelon is a large, green-skinned fruit with a juicy, sweet interior that ranges in color from pink to deep red, and is dotted with black seeds. It is refreshing, hydrating, and perfect for summer picnics and barbecues.', quantity: 7},
    {user_name: 'BillyB', item_name: 'Apples', description: 'An apple is a round fruit with a crisp, juicy texture and a sweet-tart flavor. It comes in a variety of colors including red, green, and yellow. Apples are versatile and can be eaten fresh, baked into pies, or made into sauces. They are rich in fiber, vitamins, and antioxidants, making them a nutritious and delicious snack.', quantity: 30},
    {user_name: 'BillyB', item_name: 'Grapes', description: 'Grapes are small, round fruits that grow in clusters on vines. They come in a variety of colors, including green, red, and purple, and can be sweet or tart. Grapes are juicy and can be eaten fresh, dried to make raisins, or used to produce wine and juice. They are rich in vitamins, antioxidants, and fiber, making them a healthy and refreshing snack.', quantity: 60},
    {user_name: 'JimmyJ', item_name: 'Steak', description: '"A steak is a thick, juicy cut of meat, typically beef, that is prized for its rich flavor and tender texture. It can be grilled, pan-seared, or broiled to varying levels of doneness, from rare to well-done. Seasoned simply with salt and pepper or marinated with herbs and spices, steak is often served with sides like potatoes and vegetables, making it a hearty and satisfying meal.', quantity: 5},
    {user_name: 'JimmyJ', item_name: 'Pork Chops', description: 'Pork chops are succulent cuts of meat from the loin of a pig, known for their tenderness and rich flavor. They can be bone-in or boneless and are often grilled, baked, or pan-fried. Seasoned with a variety of herbs and spices or marinated for extra flavor, pork chops are versatile and can be paired with sides like applesauce, vegetables, or mashed potatoes for a delicious and satisfying meal.', quantity: 9},
    {user_name: 'JimmyJ', item_name: 'Ground Beef', description: 'Ground beef is finely chopped or ground meat from a cow, known for its versatility and rich, savory flavor. It is a staple in many cuisines and can be used in a variety of dishes, such as burgers, meatballs, tacos, and sauces. Ground beef is available in different fat contents, allowing for customization in recipes, and it cooks quickly, making it a convenient option for many meals.', quantity: 12},
    {user_name: 'HarryH', item_name: 'Cheese Cake', description: 'Cake that is cheese', quantity: 15},
    {user_name: 'HarryH', item_name: 'Ice Cream', description: 'Cream of ice', quantity: 3}
  ]);
};
