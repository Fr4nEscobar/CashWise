# CashWise

CashWise is conceived as a comprehensive financial management application designed to help individuals and families effectively manage their personal finances. The application will allow users to track detailed information about their income, expenses, and budgets, providing intuitive tools for more informed financial decision-making.

## Functional requirements

- **Registration and Authentication**: as a user, I want to be able to register and log in to the platform to save my own information.
- **Income and Expense Management**: as a user, I want to record incomes and expenses, categorize them, and set dates to keep an organized financial management.
- **Monthly Budget**: as a user, I want to be able to establish a monthly budget and track actual spending compared to the budget for better management.
- **Transaction History**: as a user, I want to see a complete history of all transactions recorded on the platform, with details such as date, concept, and amount to keep a record of my expenses.
- **Data Visualization**: as a user, I want to see interactive charts showing the distribution of expenses by category and period to allow me to make informed financial decisions.
- **Expense Report**: as a user, I want to automatically generate detailed reports exported to PDF format for a detailed and clear understanding of my expenses.
- **Scheduling Recurring Payments**: as a user, I want to schedule recurring payments, such as monthly bills, rent, or loans, and receive automatic reminders before the due date, both in the application and by email, to avoid forgetting them.
- **Notifications and Reminders**: as a user, I want a notification menu and where I receive these as payment date reminders, and also by email.
- **Notes and Comments**: as a user, I want to be able to make notes and comments on the transactions recorded on the web to remember specific details and make more informed financial decisions in the future.
- **Search**: as a user, I want to be able to use a search section to find specific transactions easily.

## Technologies

TypeScript was chosen as the main language, taking advantage of its static typing for the creation of a robust application. The framework Angular CLI in his version 16.2.5 was used to build the project structure, providing a modular and scalable architecture. HTML was employed for creating web content, while CSS was used to customize the presentation and enhance the visual experience for users.

## How to launch

### JSON server

Run `npm run server` to initialize the server where all data is stored.

### E-Mail server

Run `node emailServer.js` to initialize the server that sends reminders as emails. The default port for this server is `3200`, this can be changed by updating the `cons port` in the emailServer.js file.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

