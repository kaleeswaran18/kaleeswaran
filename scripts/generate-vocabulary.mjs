import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const vocabDir = path.join(__dirname, '../src/data/vocabulary');

const imageSeed = (word) =>
  `https://images.unsplash.com/photo-${1500000000000 + word.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 900000000000}?w=800&q=80&auto=format&fit=crop`;

const unsplashImages = {
  carrot: 'https://images.unsplash.com/photo-1598170845058-32b9d455a630?w=800&q=80',
  potato: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80',
  tomato: 'https://images.unsplash.com/photo-1546094097-2d3c6d9a3c65?w=800&q=80',
  onion: 'https://images.unsplash.com/photo-1518977956812-cd3db0715655?w=800&q=80',
  brinjal: 'https://images.unsplash.com/photo-1628773829533-3e7b037a8f07?w=800&q=80',
  garlic: 'https://images.unsplash.com/photo-1618375563079-5c1a0c0a0f0a?w=800&q=80',
  cabbage: 'https://images.unsplash.com/photo-1594282418421-92496d219d88?w=800&q=80',
  peas: 'https://images.unsplash.com/photo-1587735241075-53fbf76d3016?w=800&q=80',
  okra: 'https://images.unsplash.com/photo-1607305387299-3e0c0a0a0f0a?w=800&q=80',
  broccoli: 'https://images.unsplash.com/photo-1459411621453-7b03979f6742?w=800&q=80',
  cauliflower: 'https://images.unsplash.com/photo-1568584711075-53fbf76d3016?w=800&q=80',
  cucumber: 'https://images.unsplash.com/photo-1604977043462-9c0c0a0a0f0a?w=800&q=80',
  pumpkin: 'https://images.unsplash.com/photo-1570586437263-040e4ab5d0d9?w=800&q=80',
  spinach: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&q=80',
  corn: 'https://images.unsplash.com/photo-1551752671-98a0f0c0a0f0a?w=800&q=80',
  'bell pepper': 'https://images.unsplash.com/photo-1563565375-f89ab7e7d060?w=800&q=80',
  lettuce: 'https://images.unsplash.com/photo-1622206152918-f144a109d9c1?w=800&q=80',
  ginger: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80',
  beetroot: 'https://images.unsplash.com/photo-1594282418421-92496d219d88?w=800&q=80',
  mushroom: 'https://images.unsplash.com/photo-1506976785307-8732e854b841?w=800&q=80',
  radish: 'https://images.unsplash.com/photo-1594282418421-92496d219d88?w=800&q=80',
  zucchini: 'https://images.unsplash.com/photo-1594282418421-92496d219d88?w=800&q=80',
};

function getImage(word) {
  const key = word.toLowerCase();
  return unsplashImages[key] || imageSeed(key);
}

function createVocab(id, name, words) {
  return {
    id,
    name,
    items: words.map((word, i) => ({
      id: word.toLowerCase().replace(/\s+/g, '-'),
      name: word.charAt(0).toUpperCase() + word.slice(1),
      image: getImage(word),
      audio: null,
    })),
  };
}

const vocabularies = {
  'vegetables.json': createVocab('vegetables', 'Vegetables', [
    'Carrot', 'Potato', 'Tomato', 'Onion', 'Brinjal', 'Garlic', 'Cabbage', 'Peas',
    'Okra', 'Broccoli', 'Cauliflower', 'Cucumber', 'Pumpkin', 'Spinach', 'Corn',
    'Bell Pepper', 'Lettuce', 'Ginger', 'Beetroot', 'Mushroom', 'Radish', 'Zucchini',
  ]),
  'fruits.json': createVocab('fruits', 'Fruits', [
    'Apple', 'Banana', 'Orange', 'Mango', 'Grapes', 'Watermelon', 'Pineapple',
    'Strawberry', 'Blueberry', 'Cherry', 'Peach', 'Pear', 'Kiwi', 'Papaya',
    'Pomegranate', 'Coconut', 'Lemon', 'Guava', 'Plum', 'Apricot', 'Fig', 'Lychee',
  ]),
  'drinks.json': createVocab('drinks', 'Drinks', [
    'Water', 'Milk', 'Juice', 'Tea', 'Coffee', 'Lemonade', 'Smoothie', 'Soda',
    'Hot Chocolate', 'Coconut Water', 'Buttermilk', 'Milkshake', 'Iced Tea',
    'Orange Juice', 'Apple Juice', 'Grape Juice', 'Energy Drink', 'Herbal Tea',
    'Mineral Water', 'Yogurt Drink', 'Mango Shake', 'Cold Coffee',
  ]),
  'bakery.json': createVocab('bakery', 'Bakery', [
    'Bread', 'Cake', 'Cookie', 'Biscuit', 'Croissant', 'Muffin', 'Donut',
    'Pie', 'Tart', 'Roll', 'Bun', 'Toast', 'Sandwich', 'Pizza', 'Pretzel',
    'Cupcake', 'Brownie', 'Pastry', 'Bagel', 'Waffle', 'Pancake', 'Doughnut',
  ]),
  'snacks.json': createVocab('snacks', 'Snacks', [
    'Chips', 'Popcorn', 'Nuts', 'Crackers', 'Candy', 'Chocolate', 'Ice Cream',
    'Pretzels', 'Granola Bar', 'Trail Mix', 'Cheese Puffs', 'Rice Cakes',
    'Fruit Snack', 'Yogurt', 'Pudding', 'Jelly', 'Marshmallow', 'Lollipop',
    'Gummy Bear', 'Wafer', 'Nachos', 'Peanuts',
  ]),
  'food-items.json': createVocab('food-items', 'Food Items', [
    'Rice', 'Pasta', 'Noodles', 'Egg', 'Cheese', 'Butter', 'Honey', 'Sugar',
    'Salt', 'Pepper', 'Oil', 'Flour', 'Soup', 'Salad', 'Sandwich', 'Curry',
    'Stew', 'Omelette', 'Porridge', 'Cereal', 'Jam', 'Sauce',
  ]),
  'colors.json': createVocab('colors', 'Colors', [
    'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Pink', 'Brown',
    'Black', 'White', 'Gray', 'Gold', 'Silver', 'Cyan', 'Magenta', 'Violet',
    'Indigo', 'Turquoise', 'Maroon', 'Beige', 'Navy', 'Coral',
  ]),
  'numbers.json': createVocab('numbers', 'Numbers', [
    'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen',
    'Eighteen', 'Nineteen', 'Twenty', 'Thirty', 'Hundred',
  ]),
  'shapes.json': createVocab('shapes', 'Shapes', [
    'Circle', 'Square', 'Triangle', 'Rectangle', 'Oval', 'Star', 'Heart',
    'Diamond', 'Pentagon', 'Hexagon', 'Octagon', 'Cube', 'Sphere', 'Cylinder',
    'Cone', 'Pyramid', 'Crescent', 'Cross', 'Arrow', 'Line', 'Wave', 'Spiral',
  ]),
  'body-parts.json': createVocab('body-parts', 'Body Parts', [
    'Head', 'Eye', 'Ear', 'Nose', 'Mouth', 'Hand', 'Foot', 'Arm', 'Leg',
    'Finger', 'Toe', 'Knee', 'Elbow', 'Shoulder', 'Neck', 'Back', 'Chest',
    'Stomach', 'Hair', 'Teeth', 'Tongue', 'Heart',
  ]),
  'family.json': createVocab('family', 'Family', [
    'Mother', 'Father', 'Sister', 'Brother', 'Grandmother', 'Grandfather',
    'Aunt', 'Uncle', 'Cousin', 'Baby', 'Son', 'Daughter', 'Husband', 'Wife',
    'Nephew', 'Niece', 'Parent', 'Child', 'Family', 'Twin', 'Stepfather', 'Stepmother',
  ]),
  'days.json': createVocab('days', 'Days', [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
    'Today', 'Tomorrow', 'Yesterday', 'Morning', 'Afternoon', 'Evening', 'Night',
    'Week', 'Weekend', 'Weekday', 'Day', 'Hour', 'Minute', 'Second', 'Noon',
  ]),
  'months.json': createVocab('months', 'Months', [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December', 'Spring', 'Summer', 'Autumn',
    'Winter', 'Season', 'Year', 'Month', 'Date', 'Birthday', 'Holiday', 'Festival',
  ]),
  'seasons.json': createVocab('seasons', 'Seasons', [
    'Spring', 'Summer', 'Autumn', 'Winter', 'Rainy', 'Sunny', 'Cloudy', 'Windy',
    'Snowy', 'Foggy', 'Stormy', 'Hot', 'Cold', 'Warm', 'Cool', 'Dry', 'Wet',
    'Humid', 'Breeze', 'Heat', 'Frost', 'Harvest',
  ]),
  'time.json': createVocab('time', 'Time', [
    'Clock', 'Watch', 'Hour', 'Minute', 'Second', 'Morning', 'Afternoon',
    'Evening', 'Night', 'Noon', 'Midnight', 'Dawn', 'Dusk', 'Sunrise', 'Sunset',
    'Early', 'Late', 'Now', 'Later', 'Soon', 'Always', 'Never', 'Sometimes',
  ]),
  'animals.json': createVocab('animals', 'Animals', [
    'Dog', 'Cat', 'Elephant', 'Lion', 'Tiger', 'Bear', 'Monkey', 'Rabbit',
    'Horse', 'Cow', 'Sheep', 'Goat', 'Pig', 'Chicken', 'Duck', 'Fish',
    'Bird', 'Snake', 'Frog', 'Butterfly', 'Bee', 'Deer',
  ]),
  'plants.json': createVocab('plants', 'Plants', [
    'Tree', 'Flower', 'Grass', 'Leaf', 'Root', 'Stem', 'Seed', 'Bush', 'Vine',
    'Fern', 'Moss', 'Cactus', 'Rose', 'Sunflower', 'Tulip', 'Lotus', 'Bamboo',
    'Palm', 'Oak', 'Pine', 'Willow', 'Daisy',
  ]),
  'weather.json': createVocab('weather', 'Weather', [
    'Sun', 'Rain', 'Cloud', 'Wind', 'Snow', 'Storm', 'Thunder', 'Lightning',
    'Rainbow', 'Fog', 'Hail', 'Drought', 'Flood', 'Breeze', 'Heatwave',
    'Cold', 'Warm', 'Humid', 'Dry', 'Forecast', 'Temperature', 'Climate',
  ]),
  'sky.json': createVocab('sky', 'Sky', [
    'Sun', 'Moon', 'Star', 'Cloud', 'Sky', 'Rainbow', 'Sunrise', 'Sunset',
    'Comet', 'Planet', 'Galaxy', 'Universe', 'Horizon', 'Twilight', 'Dawn',
    'Dusk', 'Night', 'Day', 'Light', 'Dark', 'Meteor', 'Aurora',
  ]),
  'clothing.json': createVocab('clothing', 'Clothing', [
    'Shirt', 'Pants', 'Dress', 'Skirt', 'Jacket', 'Coat', 'Sweater', 'Hat',
    'Cap', 'Shoes', 'Socks', 'Gloves', 'Scarf', 'Belt', 'Tie', 'Uniform',
    'Pajamas', 'Shorts', 'Jeans', 'Boots', 'Sandals', 'Suit',
  ]),
  'home.json': createVocab('home', 'Home', [
    'House', 'Room', 'Door', 'Window', 'Wall', 'Floor', 'Roof', 'Kitchen',
    'Bedroom', 'Bathroom', 'Living Room', 'Dining Room', 'Garage', 'Garden',
    'Balcony', 'Stairs', 'Hallway', 'Basement', 'Attic', 'Fence', 'Gate', 'Yard',
  ]),
  'bathroom.json': createVocab('bathroom', 'Bathroom', [
    'Toilet', 'Sink', 'Shower', 'Bathtub', 'Mirror', 'Towel', 'Soap', 'Shampoo',
    'Toothbrush', 'Toothpaste', 'Comb', 'Brush', 'Tissue', 'Faucet', 'Drain',
    'Mat', 'Shelf', 'Cabinet', 'Laundry', 'Washing', 'Clean', 'Dry',
  ]),
  'classroom.json': createVocab('classroom', 'Classroom', [
    'Desk', 'Chair', 'Board', 'Book', 'Pen', 'Pencil', 'Eraser', 'Ruler',
    'Notebook', 'Bag', 'Teacher', 'Student', 'Lesson', 'Homework', 'Test',
    'Clock', 'Window', 'Door', 'Shelf', 'Map', 'Globe', 'Computer',
  ]),
  'school.json': createVocab('school', 'School', [
    'School', 'Classroom', 'Library', 'Playground', 'Cafeteria', 'Office',
    'Principal', 'Teacher', 'Student', 'Lesson', 'Exam', 'Grade', 'Subject',
    'Math', 'Science', 'English', 'History', 'Art', 'Music', 'Sports', 'Bell', 'Break',
  ]),
  'city.json': createVocab('city', 'City', [
    'City', 'Street', 'Road', 'Building', 'Shop', 'Market', 'Park', 'Hospital',
    'Bank', 'Hotel', 'Restaurant', 'Museum', 'Theater', 'Bridge', 'Traffic',
    'Signal', 'Sidewalk', 'Square', 'Station', 'Airport', 'Port', 'Mall',
  ]),
  'transport.json': createVocab('transport', 'Transport', [
    'Car', 'Bus', 'Train', 'Plane', 'Boat', 'Bicycle', 'Motorcycle', 'Truck',
    'Taxi', 'Metro', 'Ship', 'Helicopter', 'Scooter', 'Van', 'Ambulance',
    'Fire Truck', 'Police Car', 'Rocket', 'Subway', 'Tram', 'Ferry', 'Cart',
  ]),
  'furniture.json': createVocab('furniture', 'Furniture', [
    'Table', 'Chair', 'Bed', 'Sofa', 'Desk', 'Shelf', 'Cabinet', 'Wardrobe',
    'Drawer', 'Mirror', 'Lamp', 'Rug', 'Curtain', 'Pillow', 'Blanket',
    'Mattress', 'Bench', 'Stool', 'Cupboard', 'Bookcase', 'Couch', 'Ottoman',
  ]),
  'tools.json': createVocab('tools', 'Tools', [
    'Hammer', 'Screwdriver', 'Wrench', 'Pliers', 'Saw', 'Drill', 'Knife',
    'Scissors', 'Tape', 'Rope', 'Ladder', 'Brush', 'Paint', 'Nail', 'Screw',
    'Bolt', 'Wire', 'Chain', 'Hook', 'Clamp', 'Level', 'Shovel',
  ]),
  'electronics.json': createVocab('electronics', 'Electronics', [
    'Phone', 'Computer', 'Tablet', 'Television', 'Radio', 'Camera', 'Speaker',
    'Headphones', 'Keyboard', 'Mouse', 'Monitor', 'Printer', 'Router', 'Charger',
    'Battery', 'Remote', 'Microphone', 'Projector', 'Clock', 'Fan', 'Lamp', 'Drone',
  ]),
  'toys.json': createVocab('toys', 'Toys', [
    'Ball', 'Doll', 'Car', 'Train', 'Blocks', 'Puzzle', 'Kite', 'Teddy Bear',
    'Robot', 'Plane', 'Boat', 'Gun', 'Swing', 'Slide', 'Sandbox', 'Yo-yo',
    'Top', 'Marble', 'Cards', 'Board Game', 'Stuffed Animal', 'Action Figure',
  ]),
  'common-words.json': createVocab('common-words', 'Common Words', [
    'Hello', 'Goodbye', 'Please', 'Thank You', 'Yes', 'No', 'Help', 'Stop',
    'Go', 'Come', 'Look', 'Listen', 'Wait', 'Start', 'Finish', 'Open', 'Close',
    'Big', 'Small', 'Good', 'Bad', 'Happy', 'Sad',
  ]),
  'adjectives.json': createVocab('adjectives', 'Adjectives', [
    'Big', 'Small', 'Tall', 'Short', 'Fast', 'Slow', 'Hot', 'Cold', 'New', 'Old',
    'Young', 'Beautiful', 'Ugly', 'Clean', 'Dirty', 'Strong', 'Weak', 'Rich',
    'Poor', 'Easy', 'Hard', 'Soft',
  ]),
  'verbs.json': createVocab('verbs', 'Verbs', [
    'Run', 'Walk', 'Jump', 'Sit', 'Stand', 'Eat', 'Drink', 'Sleep', 'Read',
    'Write', 'Speak', 'Listen', 'Watch', 'Play', 'Work', 'Study', 'Learn',
    'Teach', 'Help', 'Love', 'Like', 'Think',
  ]),
  'opposites.json': createVocab('opposites', 'Opposites', [
    'Hot', 'Cold', 'Big', 'Small', 'Fast', 'Slow', 'Up', 'Down', 'In', 'Out',
    'Open', 'Close', 'Day', 'Night', 'Light', 'Dark', 'Happy', 'Sad', 'Good',
    'Bad', 'Young', 'Old',
  ]),
  'greetings.json': createVocab('greetings', 'Greetings', [
    'Hello', 'Hi', 'Good Morning', 'Good Afternoon', 'Good Evening', 'Good Night',
    'Goodbye', 'Bye', 'See You', 'Welcome', 'How Are You', 'Fine', 'Nice',
    'Great', 'Thank You', 'Please', 'Sorry', 'Excuse Me', 'Pardon', 'Cheers',
    'Take Care', 'Have Fun',
  ]),
  'questions.json': createVocab('questions', 'Questions', [
    'What', 'Where', 'When', 'Why', 'Who', 'How', 'Which', 'Whose', 'Can You',
    'Do You', 'Are You', 'Is It', 'Will You', 'Have You', 'Did You', 'Could You',
    'Would You', 'May I', 'Shall We', 'How Much', 'How Many', 'What Time',
  ]),
  'responses.json': createVocab('responses', 'Responses', [
    'Yes', 'No', 'Maybe', 'Sure', 'Okay', 'Of Course', 'Certainly', 'Absolutely',
    'I Think So', 'I Agree', 'I Disagree', 'Not Really', 'I Do Not Know',
    'Thank You', 'You Are Welcome', 'No Problem', 'My Pleasure', 'That Is Fine',
    'Sounds Good', 'Great Idea', 'Perfect', 'Exactly',
  ]),
  'polite-words.json': createVocab('polite-words', 'Polite Words', [
    'Please', 'Thank You', 'Sorry', 'Excuse Me', 'Pardon', 'Welcome', 'Bless You',
    'Congratulations', 'Good Luck', 'Well Done', 'Nice Work', 'You Are Welcome',
    'My Pleasure', 'No Worries', 'Take Care', 'Have A Nice Day', 'After You',
    'You First', 'I Apologize', 'Forgive Me', 'Respect', 'Kindness',
  ]),
  'daily-actions.json': createVocab('daily-actions', 'Daily Actions', [
    'Wake Up', 'Brush Teeth', 'Wash Face', 'Take Bath', 'Get Dressed', 'Eat Breakfast',
    'Go To School', 'Study', 'Play', 'Eat Lunch', 'Do Homework', 'Watch TV',
    'Eat Dinner', 'Read Book', 'Go To Bed', 'Sleep', 'Clean Room', 'Help Mom',
    'Walk', 'Exercise', 'Pray', 'Rest',
  ]),
  'sports-actions.json': createVocab('sports-actions', 'Sports', [
    'Run', 'Jump', 'Kick', 'Throw', 'Catch', 'Swim', 'Dive', 'Climb', 'Cycle',
    'Skate', 'Ski', 'Surf', 'Box', 'Wrestle', 'Score', 'Win', 'Lose', 'Team',
    'Coach', 'Practice', 'Match', 'Race',
  ]),
  'cooking-actions.json': createVocab('cooking-actions', 'Cooking', [
    'Cook', 'Boil', 'Fry', 'Bake', 'Roast', 'Grill', 'Steam', 'Mix', 'Stir',
    'Cut', 'Chop', 'Slice', 'Peel', 'Pour', 'Measure', 'Taste', 'Serve', 'Heat',
    'Cool', 'Wash', 'Clean', 'Prepare',
  ]),
  'cleaning-actions.json': createVocab('cleaning-actions', 'Cleaning', [
    'Clean', 'Sweep', 'Mop', 'Dust', 'Wash', 'Scrub', 'Wipe', 'Polish', 'Vacuum',
    'Organize', 'Tidy', 'Arrange', 'Sort', 'Fold', 'Iron', 'Rinse', 'Dry',
    'Dispose', 'Recycle', 'Throw', 'Pick Up', 'Put Away',
  ]),
  'countries.json': createVocab('countries', 'Countries', [
    'India', 'America', 'England', 'France', 'Germany', 'Japan', 'China',
    'Australia', 'Canada', 'Brazil', 'Russia', 'Egypt', 'Italy', 'Spain',
    'Mexico', 'Korea', 'Thailand', 'Singapore', 'Dubai', 'Africa', 'Europe', 'Asia',
  ]),
  'jobs.json': createVocab('jobs', 'Jobs', [
    'Doctor', 'Teacher', 'Engineer', 'Nurse', 'Pilot', 'Chef', 'Farmer', 'Driver',
    'Police', 'Firefighter', 'Artist', 'Singer', 'Actor', 'Writer', 'Lawyer',
    'Scientist', 'Builder', 'Mechanic', 'Soldier', 'Judge', 'Banker', 'Shopkeeper',
  ]),
  'sports.json': createVocab('sports', 'Sports', [
    'Football', 'Cricket', 'Tennis', 'Basketball', 'Volleyball', 'Hockey',
    'Baseball', 'Golf', 'Swimming', 'Running', 'Cycling', 'Boxing', 'Wrestling',
    'Badminton', 'Table Tennis', 'Archery', 'Skiing', 'Skating', 'Surfing', 'Rugby',
    'Athletics', 'Gymnastics',
  ]),
  'instruments.json': createVocab('instruments', 'Instruments', [
    'Piano', 'Guitar', 'Violin', 'Drums', 'Flute', 'Trumpet', 'Saxophone',
    'Harp', 'Cello', 'Clarinet', 'Harmonica', 'Banjo', 'Ukulele', 'Organ',
    'Xylophone', 'Tambourine', 'Accordion', 'Sitar', 'Tabla', 'Veena', 'Mridangam', 'Veena',
  ]),
  'alphabet.json': createVocab('alphabet', 'Alphabet', [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  ]),
  'phonics.json': createVocab('phonics', 'Phonics', [
    'Ah', 'Eh', 'Ee', 'Oh', 'Oo', 'Ba', 'Da', 'Fa', 'Ga', 'Ha', 'Ja', 'Ka',
    'La', 'Ma', 'Na', 'Pa', 'Ra', 'Sa', 'Ta', 'Va', 'Wa', 'Ya', 'Za',
  ]),
  'review.json': createVocab('review', 'Review', [
    'Apple', 'Ball', 'Cat', 'Dog', 'Egg', 'Fish', 'Girl', 'Hat', 'Ice', 'Jar',
    'King', 'Lion', 'Moon', 'Nest', 'Orange', 'Pen', 'Queen', 'Rain', 'Sun', 'Tree',
    'Umbrella', 'Van',
  ]),
  'practice.json': createVocab('practice', 'Practice', [
    'Read', 'Write', 'Speak', 'Listen', 'Repeat', 'Practice', 'Learn', 'Remember',
    'Understand', 'Try', 'Improve', 'Focus', 'Concentrate', 'Review', 'Test',
    'Check', 'Correct', 'Progress', 'Achieve', 'Success', 'Goal', 'Challenge',
  ]),
};

if (!fs.existsSync(vocabDir)) {
  fs.mkdirSync(vocabDir, { recursive: true });
}

for (const [filename, data] of Object.entries(vocabularies)) {
  fs.writeFileSync(
    path.join(vocabDir, filename),
    JSON.stringify(data, null, 2),
    'utf-8',
  );
}

console.log(`Generated ${Object.keys(vocabularies).length} vocabulary files.`);
