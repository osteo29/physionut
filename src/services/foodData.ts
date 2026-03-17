/**
 * Comprehensive Food Database for PhysioHub
 * Includes 50+ common and Middle Eastern / Egyptian items
 */

export interface FoodItem {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  category: 'protein' | 'fruit' | 'grain' | 'cooked' | 'dairy' | 'vegetable' | 'fat';
  calories: number; // per 100g
  protein: number;
  carbs: number;
  fats: number;
}

export const foodDatabase: FoodItem[] = [
  // Middle Eastern / Egyptian
  { id: '1', name: { en: 'Ful Medames (Cooked)', ar: 'فول مدمس' }, category: 'cooked', calories: 110, protein: 8, carbs: 20, fats: 0.5 },
  { id: '2', name: { en: 'Ta\'meya (Falafel)', ar: 'طعمية' }, category: 'cooked', calories: 333, protein: 13, carbs: 32, fats: 18 },
  { id: '3', name: { en: 'Koshary', ar: 'كشري' }, category: 'cooked', calories: 150, protein: 5, carbs: 30, fats: 1 },
  { id: '4', name: { en: 'Fattah (Meat & Rice)', ar: 'فتة باللحمة' }, category: 'cooked', calories: 220, protein: 12, carbs: 25, fats: 8 },
  { id: '5', name: { en: 'Dates (Dried)', ar: 'بلح / تمر' }, category: 'fruit', calories: 282, protein: 2.5, carbs: 75, fats: 0.4 },
  { id: '6', name: { en: 'Molokhia (Cooked)', ar: 'ملوخية' }, category: 'cooked', calories: 45, protein: 3, carbs: 6, fats: 1 },
  { id: '7', name: { en: 'Mahshi (Mixed)', ar: 'محشي مشكل' }, category: 'cooked', calories: 130, protein: 3, carbs: 22, fats: 4 },
  { id: '8', name: { en: 'Hummus', ar: 'حمص' }, category: 'cooked', calories: 166, protein: 8, carbs: 14, fats: 10 },
  { id: '9', name: { en: 'Baba Ganoush', ar: 'بابا غنوج' }, category: 'cooked', calories: 120, protein: 1.5, carbs: 8, fats: 10 },
  { id: '10', name: { en: 'Baladi Bread', ar: 'عيش بلدي' }, category: 'grain', calories: 250, protein: 9, carbs: 50, fats: 1.5 },
  
  // Proteins
  { id: '11', name: { en: 'Chicken Breast (Grilled)', ar: 'صدور دجاج مشوية' }, category: 'protein', calories: 165, protein: 31, carbs: 0, fats: 3.6 },
  { id: '12', name: { en: 'Beef (Lean)', ar: 'لحم بقري قليل الدسم' }, category: 'protein', calories: 250, protein: 26, carbs: 0, fats: 15 },
  { id: '13', name: { en: 'Salmon', ar: 'سلمون' }, category: 'protein', calories: 208, protein: 20, carbs: 0, fats: 13 },
  { id: '14', name: { en: 'Eggs (Boiled)', ar: 'بيض مسلوق' }, category: 'protein', calories: 155, protein: 13, carbs: 1.1, fats: 11 },
  { id: '15', name: { en: 'Tuna (Canned in Water)', ar: 'تونة في الماء' }, category: 'protein', calories: 116, protein: 26, carbs: 0, fats: 0.8 },
  { id: '16', name: { en: 'Lentils (Cooked)', ar: 'عدس مطبوخ' }, category: 'protein', calories: 116, protein: 9, carbs: 20, fats: 0.4 },
  
  // Grains
  { id: '17', name: { en: 'White Rice (Cooked)', ar: 'أرز أبيض مطبوخ' }, category: 'grain', calories: 130, protein: 2.7, carbs: 28, fats: 0.3 },
  { id: '18', name: { en: 'Brown Rice (Cooked)', ar: 'أرز بني مطبوخ' }, category: 'grain', calories: 111, protein: 2.6, carbs: 23, fats: 0.9 },
  { id: '19', name: { en: 'Oats', ar: 'شوفان' }, category: 'grain', calories: 389, protein: 16.9, carbs: 66, fats: 6.9 },
  { id: '20', name: { en: 'Quinoa (Cooked)', ar: 'كينوا مطبوخة' }, category: 'grain', calories: 120, protein: 4.4, carbs: 21, fats: 1.9 },
  { id: '21', name: { en: 'Pasta (Cooked)', ar: 'مكرونة مطبوخة' }, category: 'grain', calories: 131, protein: 5, carbs: 25, fats: 1.1 },
  
  // Fruits
  { id: '22', name: { en: 'Banana', ar: 'موز' }, category: 'fruit', calories: 89, protein: 1.1, carbs: 23, fats: 0.3 },
  { id: '23', name: { en: 'Apple', ar: 'تفاح' }, category: 'fruit', calories: 52, protein: 0.3, carbs: 14, fats: 0.2 },
  { id: '24', name: { en: 'Orange', ar: 'برتقال' }, category: 'fruit', calories: 47, protein: 0.9, carbs: 12, fats: 0.1 },
  { id: '25', name: { en: 'Grapes', ar: 'عنب' }, category: 'fruit', calories: 69, protein: 0.7, carbs: 18, fats: 0.2 },
  { id: '26', name: { en: 'Watermelon', ar: 'بطيخ' }, category: 'fruit', calories: 30, protein: 0.6, carbs: 8, fats: 0.2 },
  { id: '27', name: { en: 'Mango', ar: 'مانجو' }, category: 'fruit', calories: 60, protein: 0.8, carbs: 15, fats: 0.4 },
  
  // Vegetables
  { id: '28', name: { en: 'Broccoli', ar: 'بروكلي' }, category: 'vegetable', calories: 34, protein: 2.8, carbs: 7, fats: 0.4 },
  { id: '29', name: { en: 'Spinach', ar: 'سبانخ' }, category: 'vegetable', calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4 },
  { id: '30', name: { en: 'Cucumber', ar: 'خيار' }, category: 'vegetable', calories: 15, protein: 0.7, carbs: 3.6, fats: 0.1 },
  { id: '31', name: { en: 'Tomato', ar: 'طماطم' }, category: 'vegetable', calories: 18, protein: 0.9, carbs: 3.9, fats: 0.2 },
  { id: '32', name: { en: 'Potato (Boiled)', ar: 'بطاطس مسلوقة' }, category: 'vegetable', calories: 87, protein: 1.9, carbs: 20, fats: 0.1 },
  
  // Dairy
  { id: '33', name: { en: 'Greek Yogurt (Plain)', ar: 'زبادي يوناني' }, category: 'dairy', calories: 59, protein: 10, carbs: 3.6, fats: 0.4 },
  { id: '34', name: { en: 'Milk (Full Fat)', ar: 'حليب كامل الدسم' }, category: 'dairy', calories: 61, protein: 3.2, carbs: 4.8, fats: 3.3 },
  { id: '35', name: { en: 'Cottage Cheese (Quraish)', ar: 'جبنة قريش' }, category: 'dairy', calories: 98, protein: 11, carbs: 3.4, fats: 4.3 },
  { id: '36', name: { en: 'Labneh', ar: 'لبنة' }, category: 'dairy', calories: 160, protein: 6, carbs: 4, fats: 14 },
  
  // Fats & Nuts
  { id: '37', name: { en: 'Olive Oil', ar: 'زيت زيتون' }, category: 'fat', calories: 884, protein: 0, carbs: 0, fats: 100 },
  { id: '38', name: { en: 'Almonds', ar: 'لوز' }, category: 'fat', calories: 579, protein: 21, carbs: 22, fats: 50 },
  { id: '39', name: { en: 'Walnuts', ar: 'عين جمل' }, category: 'fat', calories: 654, protein: 15, carbs: 14, fats: 65 },
  { id: '40', name: { en: 'Peanut Butter', ar: 'زبدة فول سوداني' }, category: 'fat', calories: 588, protein: 25, carbs: 20, fats: 50 },
  { id: '41', name: { en: 'Avocado', ar: 'أفوكادو' }, category: 'fat', calories: 160, protein: 2, carbs: 9, fats: 15 },
  
  // More Cooked / Mixed
  { id: '42', name: { en: 'Shish Tawook', ar: 'شيش طاووق' }, category: 'cooked', calories: 150, protein: 18, carbs: 2, fats: 8 },
  { id: '43', name: { en: 'Kofta (Grilled)', ar: 'كفتة مشوية' }, category: 'cooked', calories: 250, protein: 20, carbs: 5, fats: 18 },
  { id: '44', name: { en: 'Shawarma (Chicken)', ar: 'شاورما دجاج' }, category: 'cooked', calories: 230, protein: 18, carbs: 15, fats: 12 },
  { id: '45', name: { en: 'Moussaka (Egyptian)', ar: 'مسقعة' }, category: 'cooked', calories: 140, protein: 4, carbs: 12, fats: 9 },
  { id: '46', name: { en: 'Lentil Soup', ar: 'شوربة عدس' }, category: 'cooked', calories: 80, protein: 5, carbs: 12, fats: 2 },
  { id: '47', name: { en: 'Basbousa', ar: 'بسبوسة' }, category: 'cooked', calories: 350, protein: 4, carbs: 50, fats: 15 },
  { id: '48', name: { en: 'Kunafa', ar: 'كنافة' }, category: 'cooked', calories: 400, protein: 5, carbs: 55, fats: 20 },
  { id: '49', name: { en: 'Tahini', ar: 'طحينة' }, category: 'fat', calories: 595, protein: 17, carbs: 21, fats: 54 },
  { id: '50', name: { en: 'Pomegranate', ar: 'رمان' }, category: 'fruit', calories: 83, protein: 1.7, carbs: 19, fats: 1.2 },
  { id: '51', name: { en: 'Chickpeas (Boiled)', ar: 'حمص مسلوق' }, category: 'protein', calories: 164, protein: 8.9, carbs: 27, fats: 2.6 },
  
  // Global / Western Items
  { id: '52', name: { en: 'Quinoa (Cooked)', ar: 'كينوا مطبوخة' }, category: 'grain', calories: 120, protein: 4.4, carbs: 21, fats: 1.9 },
  { id: '53', name: { en: 'Greek Yogurt (Non-fat)', ar: 'زبادي يوناني خالي الدسم' }, category: 'dairy', calories: 59, protein: 10, carbs: 3.6, fats: 0.4 },
  { id: '54', name: { en: 'Avocado', ar: 'أفوكادو' }, category: 'fat', calories: 160, protein: 2, carbs: 9, fats: 15 },
  { id: '55', name: { en: 'Salmon (Grilled)', ar: 'سلمون مشوي' }, category: 'protein', calories: 208, protein: 20, carbs: 0, fats: 13 },
  { id: '56', name: { en: 'Blueberries', ar: 'توت أزرق' }, category: 'fruit', calories: 57, protein: 0.7, carbs: 14, fats: 0.3 },
  { id: '57', name: { en: 'Almonds (Raw)', ar: 'لوز خام' }, category: 'fat', calories: 579, protein: 21, carbs: 22, fats: 50 },
  { id: '58', name: { en: 'Chia Seeds', ar: 'بذور الشيا' }, category: 'fat', calories: 486, protein: 17, carbs: 42, fats: 31 },
  { id: '59', name: { en: 'Peanut Butter (Natural)', ar: 'زبدة فول سوداني طبيعية' }, category: 'fat', calories: 588, protein: 25, carbs: 20, fats: 50 },
  { id: '60', name: { en: 'Protein Shake (Whey)', ar: 'مخفوق بروتين (واي)' }, category: 'protein', calories: 120, protein: 24, carbs: 3, fats: 1.5 },
  { id: '61', name: { en: 'Steak (Sirloin)', ar: 'ستيك (سيرلوين)' }, category: 'protein', calories: 244, protein: 27, carbs: 0, fats: 15 },
  { id: '62', name: { en: 'Oats (Rolled)', ar: 'شوفان' }, category: 'grain', calories: 389, protein: 16.9, carbs: 66, fats: 6.9 },
  { id: '63', name: { en: 'Sweet Potato (Baked)', ar: 'بطاطا حلوة مشوية' }, category: 'vegetable', calories: 86, protein: 1.6, carbs: 20, fats: 0.1 },
  { id: '64', name: { en: 'Tofu (Firm)', ar: 'توفو' }, category: 'protein', calories: 76, protein: 8, carbs: 1.9, fats: 4.8 },
  { id: '65', name: { en: 'Cottage Cheese', ar: 'جبنة قريش' }, category: 'dairy', calories: 98, protein: 11, carbs: 3.4, fats: 4.3 },
  { id: '66', name: { en: 'Turkey Breast', ar: 'صدر رومي' }, category: 'protein', calories: 135, protein: 30, carbs: 0, fats: 0.7 },
  { id: '67', name: { en: 'Asparagus', ar: 'هليون' }, category: 'vegetable', calories: 20, protein: 2.2, carbs: 3.9, fats: 0.1 },
  { id: '68', name: { en: 'Kale', ar: 'كرنب أجعد' }, category: 'vegetable', calories: 49, protein: 4.3, carbs: 8.8, fats: 0.9 },
  { id: '69', name: { en: 'Walnuts', ar: 'عين جمل' }, category: 'fat', calories: 654, protein: 15, carbs: 14, fats: 65 },
  { id: '70', name: { en: 'Strawberries', ar: 'فراولة' }, category: 'fruit', calories: 32, protein: 0.7, carbs: 7.7, fats: 0.3 },
  { id: '71', name: { en: 'Lentils (Cooked)', ar: 'عدس مطبوخ' }, category: 'protein', calories: 116, protein: 9, carbs: 20, fats: 0.4 },
  { id: '72', name: { en: 'Brown Rice (Cooked)', ar: 'أرز بني مطبوخ' }, category: 'grain', calories: 111, protein: 2.6, carbs: 23, fats: 0.9 },
  { id: '73', name: { en: 'Whole Wheat Bread', ar: 'خبز قمح كامل' }, category: 'grain', calories: 247, protein: 13, carbs: 41, fats: 3.4 },
  { id: '74', name: { en: 'Hummus', ar: 'حمص بطحينة' }, category: 'fat', calories: 166, protein: 8, carbs: 14, fats: 10 },
  { id: '75', name: { en: 'Edamame', ar: 'إيدامامي' }, category: 'protein', calories: 122, protein: 11, carbs: 10, fats: 5 },
  { id: '76', name: { en: 'Shrimp (Cooked)', ar: 'جمبري مطبوخ' }, category: 'protein', calories: 99, protein: 24, carbs: 0.2, fats: 0.3 },
  { id: '77', name: { en: 'Black Beans (Cooked)', ar: 'فاصوليا سوداء' }, category: 'protein', calories: 132, protein: 8.9, carbs: 23, fats: 0.5 },
  { id: '78', name: { en: 'Cashews', ar: 'كاجو' }, category: 'fat', calories: 553, protein: 18, carbs: 30, fats: 44 },
  { id: '79', name: { en: 'Pistachios', ar: 'فستق' }, category: 'fat', calories: 562, protein: 20, carbs: 28, fats: 45 },
  { id: '80', name: { en: 'Raspberries', ar: 'توت أحمر' }, category: 'fruit', calories: 52, protein: 1.2, carbs: 12, fats: 0.7 },
  { id: '81', name: { en: 'Brussels Sprouts', ar: 'كرنب بروكسل' }, category: 'vegetable', calories: 43, protein: 3.4, carbs: 9, fats: 0.3 },
  { id: '82', name: { en: 'Cauliflower', ar: 'قرنبيط' }, category: 'vegetable', calories: 25, protein: 1.9, carbs: 5, fats: 0.3 },
  { id: '83', name: { en: 'Zucchini', ar: 'كوسة' }, category: 'vegetable', calories: 17, protein: 1.2, carbs: 3.1, fats: 0.3 },
  { id: '84', name: { en: 'Pumpkin Seeds', ar: 'بذور اليقطين' }, category: 'fat', calories: 559, protein: 30, carbs: 11, fats: 49 },
  { id: '85', name: { en: 'Flax Seeds', ar: 'بذور الكتان' }, category: 'fat', calories: 534, protein: 18, carbs: 29, fats: 42 },
  { id: '86', name: { en: 'Dark Chocolate (70-85%)', ar: 'شوكولاتة داكنة' }, category: 'fat', calories: 598, protein: 7.8, carbs: 46, fats: 43 },
  { id: '87', name: { en: 'Egg Whites', ar: 'بياض بيض' }, category: 'protein', calories: 52, protein: 11, carbs: 0.7, fats: 0.2 },
  { id: '88', name: { en: 'Cod Fish', ar: 'سمك القد' }, category: 'protein', calories: 82, protein: 18, carbs: 0, fats: 0.7 },
  { id: '89', name: { en: 'Cottage Cheese (Low Fat)', ar: 'جبنة قريش قليلة الدسم' }, category: 'dairy', calories: 72, protein: 12, carbs: 2.7, fats: 1 },
  { id: '90', name: { en: 'Skim Milk', ar: 'حليب خالي الدسم' }, category: 'dairy', calories: 34, protein: 3.4, carbs: 5, fats: 0.1 },
  { id: '91', name: { en: 'Soy Milk (Unsweetened)', ar: 'حليب صويا غير محلى' }, category: 'dairy', calories: 33, protein: 2.8, carbs: 1.8, fats: 1.6 },
  { id: '92', name: { en: 'Almond Milk (Unsweetened)', ar: 'حليب لوز غير محلى' }, category: 'dairy', calories: 15, protein: 0.6, carbs: 0.3, fats: 1.1 },
  
  // Fast Food & Global Chains (Generic)
  { id: '93', name: { en: 'Grilled Chicken Wrap', ar: 'رول دجاج مشوي' }, category: 'cooked', calories: 180, protein: 15, carbs: 20, fats: 5 },
  { id: '94', name: { en: 'Margherita Pizza', ar: 'بيتزا مارجريتا' }, category: 'cooked', calories: 250, protein: 10, carbs: 30, fats: 10 },
  { id: '95', name: { en: 'Veggie Burger (Patty)', ar: 'برجر نباتي' }, category: 'cooked', calories: 150, protein: 12, carbs: 10, fats: 7 },
  { id: '96', name: { en: 'Chicken Nuggets (6 pcs)', ar: 'ناجتس دجاج (٦ قطع)' }, category: 'cooked', calories: 280, protein: 13, carbs: 18, fats: 18 },
  { id: '97', name: { en: 'French Fries (Small)', ar: 'بطاطس مقلية (صغيرة)' }, category: 'cooked', calories: 230, protein: 2, carbs: 30, fats: 11 },
  { id: '98', name: { en: 'Cheeseburger (Generic)', ar: 'تشيز برجر' }, category: 'cooked', calories: 300, protein: 15, carbs: 30, fats: 14 },
  { id: '99', name: { en: 'Caesar Salad (No Dressing)', ar: 'سلطة سيزر' }, category: 'vegetable', calories: 44, protein: 3, carbs: 2, fats: 2 },
  { id: '100', name: { en: 'Sushi Roll (Salmon/Avocado)', ar: 'سوشي (سلمون وأفوكادو)' }, category: 'cooked', calories: 140, protein: 5, carbs: 20, fats: 4 },
];
