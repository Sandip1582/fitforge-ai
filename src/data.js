// Mock data for the entire FitForge AI platform

export const userData = {
  id: 'usr_001',
  name: 'Sandeep',
  email: 'sandeep@example.com',
  avatar: 'S',
  gender: 'male',
  age: 26,
  height: 175,
  weight: 78,
  goalWeight: 72,
  fitnessLevel: 'intermediate',
  goal: 'fat_loss',
  dietType: 'non-veg',
  injuries: [],
  plan: 'Pro',
  streak: 12,
  joinDate: '2025-11-15',
  preferences: { splitType: 'push_pull_legs', daysPerWeek: 5, sessionDuration: 60 }
};

export const dashboardStats = [
  { id: 1, label: 'Workouts This Week', value: '4/5', change: '+1 vs last week', trend: 'up', icon: '🏋️', color: 'purple' },
  { id: 2, label: 'Calories Burned', value: '2,340', change: '+12% this week', trend: 'up', icon: '🔥', color: 'orange' },
  { id: 3, label: 'Current Weight', value: '78 kg', change: '-0.5 kg', trend: 'up', icon: '⚖️', color: 'cyan' },
  { id: 4, label: 'Protein Today', value: '142g', change: '89% of target', trend: 'up', icon: '🥩', color: 'green' },
];

export const weeklyActivity = [
  { day: 'Mon', calories: 520, duration: 55 },
  { day: 'Tue', calories: 380, duration: 40 },
  { day: 'Wed', calories: 610, duration: 65 },
  { day: 'Thu', calories: 0, duration: 0 },
  { day: 'Fri', calories: 480, duration: 50 },
  { day: 'Sat', calories: 350, duration: 35 },
  { day: 'Sun', calories: 0, duration: 0 },
];

export const weightProgress = [
  { week: 'W1', weight: 82 }, { week: 'W2', weight: 81.5 },
  { week: 'W3', weight: 81.2 }, { week: 'W4', weight: 80.8 },
  { week: 'W5', weight: 80.1 }, { week: 'W6', weight: 79.7 },
  { week: 'W7', weight: 79.5 }, { week: 'W8', weight: 79.2 },
  { week: 'W9', weight: 78.8 }, { week: 'W10', weight: 78.5 },
  { week: 'W11', weight: 78.2 }, { week: 'W12', weight: 78.0 },
];

export const strengthProgress = [
  { week: 'W1', bench: 60, squat: 80, deadlift: 100 },
  { week: 'W4', bench: 65, squat: 87.5, deadlift: 110 },
  { week: 'W8', bench: 70, squat: 95, deadlift: 120 },
  { week: 'W12', bench: 77.5, squat: 100, deadlift: 130 },
];

export const exercises = [
  { id: 'ex_001', name: 'Barbell Bench Press', category: 'chest', muscles: ['Chest', 'Triceps', 'Front Delts'], difficulty: 'intermediate', equipment: 'Barbell', icon: '🏋️', sets: '4 × 8-10', videoId: 'rT7DgCr-3pg', instructions: ['Lie on bench with feet flat on floor', 'Grip bar slightly wider than shoulder width', 'Unrack and lower bar to mid-chest', 'Press up explosively to full lockout'], tips: ['Keep shoulder blades pinched together', 'Maintain slight arch in lower back', 'Don\'t bounce bar off chest'] },
  { id: 'ex_002', name: 'Barbell Back Squat', category: 'legs', muscles: ['Quads', 'Glutes', 'Hamstrings'], difficulty: 'intermediate', equipment: 'Barbell', icon: '🦵', sets: '4 × 6-8', videoId: 'ultWZbUMPL8', instructions: ['Position bar on upper traps', 'Feet shoulder-width apart, toes slightly out', 'Brace core, descend until thighs parallel', 'Drive through heels to stand'], tips: ['Keep knees tracking over toes', 'Don\'t let knees cave inward', 'Breathe in at top, hold during descent'] },
  { id: 'ex_003', name: 'Deadlift', category: 'back', muscles: ['Back', 'Glutes', 'Hamstrings'], difficulty: 'advanced', equipment: 'Barbell', icon: '💪', sets: '3 × 5', videoId: 'op9kVnSso6Q', instructions: ['Stand with feet hip-width, bar over mid-foot', 'Grip bar just outside knees', 'Push floor away with legs', 'Lock out hips at the top'], tips: ['Keep bar close to body throughout', 'Don\'t round lower back', 'Engage lats before pulling'] },
  { id: 'ex_004', name: 'Overhead Press', category: 'shoulders', muscles: ['Shoulders', 'Triceps', 'Upper Chest'], difficulty: 'intermediate', equipment: 'Barbell', icon: '🙆', sets: '4 × 8-10', videoId: '_RlRDWO2jfg', instructions: ['Stand with bar at collar bone height', 'Grip slightly wider than shoulders', 'Press bar overhead to full lockout', 'Lower under control to start position'], tips: ['Squeeze glutes for stability', 'Move head back as bar passes face', 'Full lockout at top'] },
  { id: 'ex_005', name: 'Pull-ups', category: 'back', muscles: ['Lats', 'Biceps', 'Rear Delts'], difficulty: 'intermediate', equipment: 'Bodyweight', icon: '🧗', sets: '4 × 6-10', videoId: 'eGo4IYlbE5g', instructions: ['Hang from bar with overhand grip', 'Pull chest towards bar', 'Squeeze shoulder blades at top', 'Lower with control'], tips: ['Avoid swinging or kipping', 'Full extension at bottom', 'Focus on pulling with elbows'] },
  { id: 'ex_006', name: 'Lat Pulldown', category: 'back', muscles: ['Lats', 'Biceps', 'Rhomboids'], difficulty: 'beginner', equipment: 'Cable Machine', icon: '🔽', sets: '3 × 10-12', videoId: 'CAwf7n6Luuc', instructions: ['Sit with thighs under pad', 'Grip bar wide with overhand grip', 'Pull bar to upper chest', 'Slowly return to start'], tips: ['Don\'t lean too far back', 'Feel the squeeze in your lats', 'Control the eccentric'] },
  { id: 'ex_007', name: 'Dumbbell Curls', category: 'arms', muscles: ['Biceps', 'Forearms'], difficulty: 'beginner', equipment: 'Dumbbells', icon: '💪', sets: '3 × 12', videoId: 'ykJmrZ5v0Oo', instructions: ['Stand with dumbbells at sides', 'Curl weights up, rotating palms up', 'Squeeze biceps at top', 'Lower slowly'], tips: ['Don\'t swing the weights', 'Keep elbows pinned to sides', 'Full range of motion'] },
  { id: 'ex_008', name: 'Leg Press', category: 'legs', muscles: ['Quads', 'Glutes', 'Hamstrings'], difficulty: 'beginner', equipment: 'Machine', icon: '🦿', sets: '4 × 10-12', videoId: 'IZxyjW7MPJQ', instructions: ['Sit in machine with back flat', 'Place feet shoulder-width on platform', 'Lower weight until 90° knee bend', 'Press back to start without locking'], tips: ['Don\'t lock out knees', 'Keep lower back pressed into seat', 'Foot placement affects muscle focus'] },
  { id: 'ex_009', name: 'Cable Flyes', category: 'chest', muscles: ['Chest', 'Front Delts'], difficulty: 'beginner', equipment: 'Cable Machine', icon: '🦅', sets: '3 × 12-15', videoId: 'Iwe6AmxVf7o', instructions: ['Set cables at shoulder height', 'Step forward with slight lean', 'Bring hands together in arc motion', 'Control the return'], tips: ['Slight bend in elbows throughout', 'Squeeze chest at center', 'Don\'t use too heavy weight'] },
  { id: 'ex_010', name: 'Plank', category: 'core', muscles: ['Core', 'Shoulders', 'Glutes'], difficulty: 'beginner', equipment: 'Bodyweight', icon: '🧘', sets: '3 × 45-60s', videoId: 'ASdvN_XEl_c', instructions: ['Forearms on ground, elbows under shoulders', 'Body in straight line from head to heels', 'Brace core and hold position', 'Breathe normally throughout'], tips: ['Don\'t let hips sag', 'Don\'t pike hips up', 'Keep neck neutral'] },
];

export const workoutPlans = [
  {
    id: 'wp_001', name: 'Push Day A', type: 'Push', difficulty: 'Intermediate', duration: '55 min', calories: 480,
    exercises: [
      { ...exercises[0], sets: '4 × 8-10', rest: '90s' },
      { ...exercises[3], sets: '4 × 8-10', rest: '90s' },
      { ...exercises[8], sets: '3 × 12-15', rest: '60s' },
    ]
  },
  {
    id: 'wp_002', name: 'Pull Day A', type: 'Pull', difficulty: 'Intermediate', duration: '50 min', calories: 420,
    exercises: [
      { ...exercises[2], sets: '3 × 5', rest: '120s' },
      { ...exercises[4], sets: '4 × 6-10', rest: '90s' },
      { ...exercises[5], sets: '3 × 10-12', rest: '60s' },
      { ...exercises[6], sets: '3 × 12', rest: '60s' },
    ]
  },
  {
    id: 'wp_003', name: 'Leg Day', type: 'Legs', difficulty: 'Advanced', duration: '60 min', calories: 550,
    exercises: [
      { ...exercises[1], sets: '4 × 6-8', rest: '120s' },
      { ...exercises[7], sets: '4 × 10-12', rest: '90s' },
      { ...exercises[9], sets: '3 × 45-60s', rest: '45s' },
    ]
  },
];

export const machines = [
  { id: 'm_001', name: 'Lat Pulldown Machine', category: 'Back', icon: '🔽', muscles: ['Lats', 'Biceps', 'Rhomboids'], difficulty: 'Beginner', videoId: 'CAwf7n6Luuc', description: 'A cable machine used primarily for back development. The wide bar allows for various grip positions to target different areas of the back.', setup: ['Adjust thigh pad to secure your legs', 'Select appropriate weight on the stack', 'Choose wide overhand grip on the bar', 'Sit down and secure thighs under pad'], execution: ['Pull bar down to upper chest', 'Squeeze shoulder blades together', 'Hold for 1 second at bottom', 'Slowly release back to start'], safety: ['Don\'t lean excessively backward', 'Never pull bar behind the neck', 'Control the weight on the way up', 'Start with lighter weight to learn form'], mistakes: ['Using momentum to pull weight', 'Pulling bar behind the neck', 'Not getting full range of motion', 'Gripping too tight (use hook grip)'] },
  { id: 'm_002', name: 'Leg Press Machine', category: 'Legs', icon: '🦿', muscles: ['Quads', 'Glutes', 'Hamstrings'], difficulty: 'Beginner', videoId: 'IZxyjW7MPJQ', description: 'A compound leg machine that safely allows heavy loading for leg development without the balance requirements of squats.', setup: ['Adjust seat back angle', 'Select weight on the stack or load plates', 'Sit with back flat against the pad', 'Place feet shoulder-width on platform'], execution: ['Release safety handles', 'Lower platform by bending knees to 90°', 'Press through heels to extend legs', 'Don\'t fully lock out knees at top'], safety: ['Never lock out your knees completely', 'Keep lower back pressed into the seat', 'Use safety catches', 'Don\'t go too deep if you have knee issues'], mistakes: ['Locking out knees at the top', 'Lifting hips off the seat', 'Placing feet too high or too low', 'Using too much weight with poor form'] },
  { id: 'm_003', name: 'Cable Crossover Machine', category: 'Chest', icon: '🦅', muscles: ['Chest', 'Front Delts', 'Triceps'], difficulty: 'Intermediate', videoId: 'Iwe6AmxVf7o', description: 'A versatile dual-cable machine that provides constant tension throughout the movement. Perfect for chest flyes, tricep pushdowns, and many more exercises.', setup: ['Set both pulleys to desired height', 'Attach appropriate handles', 'Select equal weight on both sides', 'Stand centered between the cables'], execution: ['Grab handles and step forward', 'Slight lean forward, one foot ahead', 'Bring hands together in arc motion', 'Squeeze chest, then control return'], safety: ['Start with light weight to learn the motion', 'Keep slight bend in elbows always', 'Don\'t overstretch at the back', 'Maintain stable footing'], mistakes: ['Using too much weight', 'Straightening arms completely', 'Not controlling the eccentric phase', 'Inconsistent cable height settings'] },
  { id: 'm_004', name: 'Smith Machine', category: 'Multi', icon: '🏗️', muscles: ['Full Body'], difficulty: 'Beginner', videoId: 'IGSNiQnS5iI', description: 'A barbell fixed within steel rails allowing only vertical movement. Great for beginners learning compound movements with added safety.', setup: ['Adjust bar height to appropriate level', 'Add desired weight plates to each side', 'Set safety catches at appropriate height', 'Position body under the bar'], execution: ['Unrack by rotating the bar', 'Perform the exercise with controlled motion', 'Re-rack by rotating bar back into hooks', 'Always use safety catches'], safety: ['Always set the safety stops', 'Don\'t rely solely on the guided path', 'Start with just the bar to learn', 'Have a spotter for heavy lifts'], mistakes: ['Not setting safety catches', 'Over-relying on the guided motion', 'Using it as a substitute for free weights entirely', 'Improper body positioning'] },
  { id: 'm_005', name: 'Chest Press Machine', category: 'Chest', icon: '🫁', muscles: ['Chest', 'Triceps', 'Front Delts'], difficulty: 'Beginner', videoId: 'xUm0BiZCWlQ', description: 'A seated machine that mimics the bench press motion with guided handles. Excellent for beginners or for high-rep finishing sets.', setup: ['Adjust seat height so handles align with mid-chest', 'Select appropriate weight', 'Sit with back flat against pad', 'Grip handles at chest level'], execution: ['Press handles forward until arms extended', 'Don\'t lock elbows completely', 'Slowly return to starting position', 'Feel the stretch in your chest'], safety: ['Don\'t overextend behind your body line', 'Keep wrists straight', 'Control the weight at all times', 'Adjust seat for proper alignment'], mistakes: ['Flaring elbows too wide', 'Not using full range of motion', 'Rushing the repetitions', 'Setting seat too high or low'] },
  { id: 'm_006', name: 'Rowing Machine (Seated Cable Row)', category: 'Back', icon: '🚣', muscles: ['Lats', 'Rhomboids', 'Biceps', 'Rear Delts'], difficulty: 'Beginner', videoId: 'GZbfZ033f74', description: 'A seated cable row machine that targets the entire back. The close-grip handle emphasizes the middle back and rhomboids.', setup: ['Sit with feet on footpads, knees slightly bent', 'Select appropriate weight', 'Grab close-grip handle attachment', 'Sit upright with neutral spine'], execution: ['Pull handle towards your lower ribcage', 'Squeeze shoulder blades together', 'Hold contraction for 1 second', 'Extend arms back slowly with control'], safety: ['Don\'t round your lower back', 'Avoid using momentum', 'Keep core engaged throughout', 'Don\'t lean too far back'], mistakes: ['Rounding the lower back', 'Pulling with biceps instead of back', 'Leaning too far forward or backward', 'Not squeezing at the contraction point'] },
];

export const mealPlans = {
  calories: 2200, protein: 160, carbs: 220, fats: 73,
  meals: [
    { id: 'meal_1', time: 'Breakfast · 8:00 AM', name: 'Protein Oats Bowl', calories: 480, protein: 35, carbs: 55, fats: 14, items: ['Oats (80g)', 'Whey protein (1 scoop)', 'Banana (1)', 'Almonds (10)', 'Honey (1 tsp)'], icon: '🥣' },
    { id: 'meal_2', time: 'Mid-Morning · 11:00 AM', name: 'Greek Yogurt & Fruits', calories: 280, protein: 20, carbs: 30, fats: 8, items: ['Greek yogurt (200g)', 'Mixed berries (100g)', 'Chia seeds (1 tbsp)'], icon: '🫐' },
    { id: 'meal_3', time: 'Lunch · 1:00 PM', name: 'Chicken Rice Bowl', calories: 580, protein: 45, carbs: 60, fats: 16, items: ['Grilled chicken breast (200g)', 'Brown rice (150g cooked)', 'Mixed vegetables (100g)', 'Olive oil (1 tsp)'], icon: '🍗' },
    { id: 'meal_4', time: 'Pre-Workout · 4:30 PM', name: 'PB Banana Shake', calories: 320, protein: 28, carbs: 35, fats: 10, items: ['Whey protein (1 scoop)', 'Banana (1)', 'Peanut butter (1 tbsp)', 'Milk (200ml)'], icon: '🥤' },
    { id: 'meal_5', time: 'Dinner · 8:00 PM', name: 'Salmon & Sweet Potato', calories: 540, protein: 42, carbs: 40, fats: 25, items: ['Salmon fillet (200g)', 'Sweet potato (150g)', 'Broccoli (100g)', 'Lemon & herbs'], icon: '🐟' },
  ]
};

export const vegMealPlans = {
  calories: 2100, protein: 140, carbs: 240, fats: 65,
  meals: [
    { id: 'vmeal_1', time: 'Breakfast · 8:00 AM', name: 'Paneer Paratha + Curd', calories: 450, protein: 25, carbs: 50, fats: 18, items: ['Whole wheat paratha (2)', 'Paneer stuffing (80g)', 'Curd (100g)', 'Green chutney'], icon: '🫓' },
    { id: 'vmeal_2', time: 'Mid-Morning · 11:00 AM', name: 'Sprouts Chaat', calories: 250, protein: 18, carbs: 30, fats: 6, items: ['Mixed sprouts (150g)', 'Onion, tomato, lemon', 'Chaat masala'], icon: '🥗' },
    { id: 'vmeal_3', time: 'Lunch · 1:00 PM', name: 'Rajma Chawal + Salad', calories: 550, protein: 30, carbs: 70, fats: 12, items: ['Rajma curry (200g)', 'Brown rice (150g)', 'Mixed salad', 'Buttermilk (200ml)'], icon: '🍛' },
    { id: 'vmeal_4', time: 'Pre-Workout · 4:30 PM', name: 'Banana Peanut Smoothie', calories: 340, protein: 25, carbs: 40, fats: 12, items: ['Plant protein (1 scoop)', 'Banana (1)', 'Peanut butter (1 tbsp)', 'Soy milk (200ml)'], icon: '🥤' },
    { id: 'vmeal_5', time: 'Dinner · 8:00 PM', name: 'Tofu Stir-Fry + Roti', calories: 510, protein: 35, carbs: 50, fats: 17, items: ['Tofu (200g)', 'Mixed vegetables (150g)', 'Whole wheat roti (2)', 'Sesame oil (1 tsp)'], icon: '🥘' },
  ]
};

export const progressInsights = [
  { id: 'ins_1', type: 'success', icon: '🎉', title: 'Strength is Up!', message: 'Your bench press has increased 15% in the last 4 weeks. Great progressive overload!' },
  { id: 'ins_2', type: 'warning', icon: '⚠️', title: 'Squat Plateau Detected', message: 'Your squat has stalled at 100kg for 3 weeks. Consider a deload week or trying a different rep scheme.' },
  { id: 'ins_3', type: 'info', icon: '💡', title: 'Consistency Streak', message: 'You\'ve hit 12 consecutive workout days! Keep this momentum going.' },
  { id: 'ins_4', type: 'success', icon: '📉', title: 'Weight Loss on Track', message: 'You\'ve lost 4kg in 12 weeks (0.33kg/week). This is a healthy, sustainable rate.' },
];

export const chatSuggestions = [
  'Create a push day workout for me',
  'How do I use the lat pulldown machine?',
  'Am I eating enough protein?',
  'Why has my squat stalled?',
  'Give me a vegetarian meal plan',
  'What exercises target the rear delts?',
];
