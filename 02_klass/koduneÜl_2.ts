class FoodItem {
    constructor(
        public carbs: number,
        public fats: number,
        public protein: number
    ) {}

    calcTotalCalories(): number {
        const calCarbs = 4;
        const calFats = 9;
        const calProtein = 4;

        return (this.carbs * calCarbs) + (this.fats * calFats) + (this.protein * calProtein);
    }
}

// Create instances of FoodItem
const food1 = new FoodItem(50, 20, 30);
const food2 = new FoodItem(40, 15, 25);

// Calculate total calories for each food item
const totalCaloriesFood1 = food1.calcTotalCalories();
const totalCaloriesFood2 = food2.calcTotalCalories();

console.log("Food 1 - Total calories:", totalCaloriesFood1);
console.log("Food 2 - Total calories:", totalCaloriesFood2);