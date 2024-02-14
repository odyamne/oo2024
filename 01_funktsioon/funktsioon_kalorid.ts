function calc_TotalCalories(carbs: number, fats: number, protein: number): number {
    const calCarbs = 4;
    const calFats = 9;
    const calProtein = 4;

    const totalCalories = (carbs * calCarbs) + (fats * calFats) + (protein * calProtein);

    return totalCalories;
}

// Enter nutritional values of meal/food:
const carbsGrams = 50;
const fatsGrams = 20;
const proteinGrams = 30;

const totalCalories = calc_TotalCalories(carbsGrams, fatsGrams, proteinGrams);
console.log("Total calories:", totalCalories);
