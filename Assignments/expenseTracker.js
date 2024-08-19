const readline = require("readline");

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Array with storing objects
var expenses_Objects = [];

function addExpense() {
    read.question("\nENTER EXPENSE DESCRIPTION: ", (description) => {
        if (!isNaN(description)) {
            console.error("Expense must be a string.");
            return addExpense();
        }
        read.question("\nENTER EXPENSE ID: ", (id) => {
            id = parseInt(id);
            if (isNaN(id)) {
                console.error("ID must be a number.");
                return addExpense();
            }
            read.question("\nENTER EXPENSE AMOUNT: ", (amount) => {
                amount = parseFloat(amount);
                if (isNaN(amount)) {
                    console.error("Amount must be a number.");
                    return addExpense();
                }
                read.question("ENTER DATE (DD-MM-YYYY): ", (date) => {
                    if (!/^\d{2}-\d{2}-\d{4}$/.test(date)) {
                        console.error("Date must be in DD-MM-YYYY format.");
                        return addExpense();
                    }
                    expenses_Objects.push({
                        id: id,
                        description: description,
                        amount: amount,
                        date: date
                    });
                    console.log("Expense added successfully!");
                    Main();
                });
            });
        });
    });
}

function viewExpense() {
    if (expenses_Objects.length === 0) {
        console.log("No expenses recorded.");
    } else {
        console.table(expenses_Objects);
    }
    Main();
}

function updateExpense() {
    read.question("Enter the Expense ID to update: ", (id) => {
        id = parseInt(id);
        const expense = expenses_Objects.find(exp => exp.id === id);
        if (!expense) {
            console.error("Expense with this ID does not exist.");
            return Main();
        }
        read.question("Enter new description: ", (newDescription) => {
            read.question("Enter new amount: ", (newAmount) => {
                newAmount = parseFloat(newAmount);
                if (isNaN(newAmount)) {
                    console.error("Amount must be a number.");
                    return updateExpense();
                }
                expense.description = newDescription;
                expense.amount = newAmount;
                console.log("Expense updated successfully!");
                Main();
            });
        });
    });
}

function deleteExpense() {
    read.question("Enter the Expense ID to delete: ", (id) => {
        id = parseInt(id);
        const index = expenses_Objects.findIndex(exp => exp.id === id);
        if (index === -1) {
            console.error("Expense with this ID does not exist.");
            return Main();
        }
        expenses_Objects.splice(index, 1);
        console.log("Expense deleted successfully!");
        Main();
    });
}

function viewTotalExpenditure() {
    const total = expenses_Objects.reduce((sum, expense) => sum + expense.amount, 0);
    console.log(`Total Expenditure: $${total.toFixed(2)}`);
    Main();
}

function exitApp() {
    console.log("Exiting the application. Goodbye!");
    read.close();
}

function Main() {
    console.log("\n\tWelcome to Daily Expense Tracker");
    console.log("\n1. Add Expense");
    console.log("\n2. View Expenses");
    console.log("\n3. Update Expense");
    console.log("\n4. Delete Expense");
    console.log("\n5. View Total Expenditure");
    console.log("\n6. Exit App\n");

    read.question("Please select an option (1-6): ", (option) => {
        option = parseInt(option);
        switch (option) {
            case 1:
                addExpense();
                break;
            case 2:
                viewExpense();
                break;
            case 3:
                updateExpense();
                break;
            case 4:
                deleteExpense();
                break;
            case 5:
                viewTotalExpenditure();
                break;
            case 6:
                exitApp();
                break;
            default:
                console.error("Invalid option. Please select a number between 1 and 6.");
                Main();
        }
    });
}

Main();
