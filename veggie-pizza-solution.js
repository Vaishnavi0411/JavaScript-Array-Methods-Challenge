const menu = [
    {
        'category': 'Beverages',
        'name': 'Soft Drink',
        'price': 1.5
    },
    {
        'category': 'Starters',
        'name': 'Garlic Bread',
        'price': 2.8
    },
    {
        'category': 'Starters',
        'name': 'Mozzarella Sticks',
        'price': 5.5
    },
    {
        'category': 'Main Meal',
        'name': 'Medium Size Margherita Pizza',
        'price': 11
    },
    {
        'category': 'Beverages',
        'name': 'Iced Tea',
        'price': 1.25
    },
    {
        'category': 'Starters',
        'name': 'Greek Wedge Salad',
        'price': 4.5
    },
    {
        'category': 'Beverages',
        'name': 'Milk Shake',
        'price': 2.0
    },
    {
        'category': 'Main Meal',
        'name': 'Veg Family Meal',
        'price': 13.25
    },
    {
        'category': 'Main Meal',
        'name': 'Large Size Vegan Pepperoni Pizza',
        'price': 14.5
    },
]
const order = {
    'items': [
        {
            'name': 'Mozzarella Sticks',
            'price': 5.5,
            'quantity': 2
        },
        {
            'name': 'Garlic Bread',
            'price': 2.8,
            'quantity': 2
        },
        {
            'name': 'Soft Drink',
            'price': 1.5,
            'quantity': 3
        },
        {
            'name': 'Medium Size Margherita Pizza',
            'price': 11,
            'quantity': 2
        },
        {
            'name': 'Iced Tea',
            'price': 1.25,
            'quantity': 1
        },
        {
            'name': 'Veg Family Meal',
            'price': 13.25,
            'quantity': 2
        },
    ]
};

const discount = 0.05;
//function to list menu items by category
function listByCategory(menu, category) {
    let num1 = menu.filter(x => x.category === category);
    num1.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
    });
    return num1;
}
console.log("Starters:");
console.log(listByCategory(menu, 'Starters'));
console.log("Main Meals:");
console.log(listByCategory(menu, 'Main Meal'));

//funtion to calculate the total of each item ordered
function calculateOrderAmountForEachItem(menu, order) {
    return order.items.map(item => {
        const menuItem = menu.find(menuItem => menuItem.name === item.name);
        const amount = menuItem.price * item.quantity;
        return {
            name: item.name,
            quantity: item.quantity,
            price: menuItem.price,
            category: menuItem.category,
            amount: amount
        };
    });
}
console.log("Total amount for each item in the order:");
console.log(calculateOrderAmountForEachItem(menu, order));

//function to calculate the main meal count to avail freebie
function calculateMainMealCount(menu, order) {
    const mainMealsCount = order.items.filter(item => {
        const menuItem = menu.find(menuItem => menuItem.name === item.name);
        return menuItem && menuItem.category === 'Main Meal';
    }).reduce((count, mainMealOrdered) => count + mainMealOrdered.quantity, 0);
    return mainMealsCount;
}
console.log("Main Meal Count:");
console.log(calculateMainMealCount(menu, order));

//function to calculate the total bill amount 
function calculateTotalAmount(menu, order) {
    const totalAmount = order.items.reduce((total, item) => {
        const menuItem = menu.find(menuItem => menuItem.name === item.name);
        const itemTotal = menuItem ? menuItem.price * item.quantity : 0;
        return total + itemTotal;
    }, 0);

    return totalAmount;
}
console.log("Total Bill Amount:");
console.log(calculateTotalAmount(menu, order));

// Function to calculate the final bill amount after applying a discount
function calculateFinalAmount(menu, order, discount) {
    const totalAmount = calculateTotalAmount(menu, order);
    let finalAmount = totalAmount;
    if (totalAmount >= 50) {
        const discountAmount = totalAmount * discount;
        finalAmount = parseFloat((totalAmount - discountAmount).toFixed(2));
    }
    return finalAmount;
}
console.log("Final Bill Amount (after applying discount):");
console.log(calculateFinalAmount(menu, order, discount));

//function to return a message if the order is eligible for free drink or null otherwise
function isEligibleForFreeDrink(menu, order) {
    const totalAmount = calculateTotalAmount(menu, order);
    const threshold = 50;
    const finalAmount = calculateFinalAmount(menu, order, discount);
    if (finalAmount >= threshold) {
        return 'Hurray!!The order is eligible for a free soft drink. Please do collect it!';
    }
    return null;
}
console.log("Free Drink Eligibility:");
console.log(isEligibleForFreeDrink(menu, order));

module.exports = {
    listByCategory,
    calculateOrderAmountForEachItem,
    calculateMainMealCount,
    calculateTotalAmount,
    calculateFinalAmount,
    isEligibleForFreeDrink
}