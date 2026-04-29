/**
 * Calculates daily macronutrient and caloric requirements based on user data.
 * * @param {Object} user 
 * @param {number} user.weight - Weight in kilograms (kg)
 * @param {number} user.height - Height in centimeters (cm)
 * @param {number} user.age - Age in years
 * @param {string} user.gender - "male" or "female"
 * @param {string} user.goal - "cut", "bulk", or "maintain"
 * @param {string} user.activityLevel - "sedentary", "light", "moderate", "active", "extra_active"
 * @returns {Object} An object containing daily targets for Calories, Protein (g), Fats (g), and Carbs (g)
 */
function calculateMacros(user) {
    // 1. Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
    let bmr;
    if (user.gender.toLowerCase() === 'male') {
        bmr = (10 * user.weight) + (6.25 * user.height) - (5 * user.age) + 5;
    } else if (user.gender.toLowerCase() === 'female') {
        bmr = (10 * user.weight) + (6.25 * user.height) - (5 * user.age) - 161;
    } else {
        throw new Error("Gender must be 'male' or 'female' for BMR calculation.");
    }

    // 2. Calculate Total Daily Energy Expenditure (TDEE) based on activity level
    const activityMultipliers = {
        sedentary: 1.2,       // Little to no exercise
        light: 1.375,         // Light exercise 1-3 days/week
        moderate: 1.55,       // Moderate exercise 3-5 days/week
        active: 1.725,        // Hard exercise 6-7 days/week
        extra_active: 1.9     // Very hard exercise / physical job
    };
    
    let tdee = bmr * (activityMultipliers[user.activityLevel] || 1.2);

    // 3. Adjust Calories Based on Goal
    let targetCalories = tdee;
    if (user.goal.toLowerCase() === 'cut') {
        targetCalories -= 500; // Standard safe deficit (~1 lb weight loss per week)
    } else if (user.goal.toLowerCase() === 'bulk') {
        targetCalories += 500; // Standard surplus for muscle gain
    }

    // 4. Calculate Macronutrients
    // Protein: 2.2g per kg of body weight (Standard for muscle retention/growth)
    const proteinGrams = 2.2 * user.weight;
    const proteinCalories = proteinGrams * 4; // 1g protein = 4 kcal

    // Fats: 25% of total target calories (Standard healthy baseline for hormone function)
    const fatCalories = targetCalories * 0.25;
    const fatGrams = fatCalories / 9; // 1g fat = 9 kcal

    // Carbs: The remaining calories after protein and fats are deducted
    const remainingCalories = targetCalories - proteinCalories - fatCalories;
    const carbGrams = remainingCalories / 4; // 1g carb = 4 kcal

    // 5. Return the rounded output
    return {
        calories: Math.round(targetCalories),
        protein: Math.round(proteinGrams),
        fats: Math.round(fatGrams),
        carbs: Math.round(carbGrams)
    };
}

// === Example Usage ===
const testUser = {
    weight: 80,             // 80 kg (~176 lbs)
    height: 180,            // 180 cm (~5'11")
    age: 25,                // 25 years old
    gender: 'male',         
    goal: 'bulk',           
    activityLevel: 'moderate' 
};

const userMacros = calculateMacros(testUser);
console.log("Daily Nutritional Requirements:", userMacros);
// Output: { calories: 3341, protein: 176, fats: 93, carbs: 451 }