# StyleVillage Client
Frontend project for the Style Village service

## Develoment Stack
- TypeScript
- React
- MUI

## Project Structure
- `src/components`: Contains reusable components used across the website, such as Header, Footer, and custom buttons. Each component can be imported and reused throughout the project.
- `src/hooks/api`: Contains custom hooks for handling API requests and responses, providing a simplified and reusable interface for making HTTP requests to the backend. These hooks help manage data fetching, error handling, and loading states across the application.
- `src/models`: Collects commonly used interfaces (data types) for consistent data structure definitions across the application.
- `src/pages`: Represents the main pages of the website. Each page corresponds to a specific URL and renders the appropriate content.
- `src/route`: Defines which page to display for each URL, managing the routing logic for the application.

## Page Descriptions
- **`/` : Main Page**  
  The main page of the application, providing an overview and links to other parts of the site.

- **`/register` : Registration Page**  
  Allows new users to register by entering required information to create an account.

- **`/login` : Login Page**  
  Provides login functionality for existing users to access their accounts.

- **`/clothes/:id` : Clothes Page**  
  Displays detailed information about a specific clothing item, identified by its unique `id`.

- **`/closet/:id` : Closet Page**  
  Shows the contents of a specific user’s closet, allowing browsing and interaction with items.

- **`/profile` : Profile Page**  
  Displays the user’s profile information, where they can view and possibly edit their personal details.

- **`/mypage/closet` : My Closet Page**  
  A personalized closet page where the logged-in user can manage and organize their own items.

- **`/mypage/apply` : My Applications Page**  
  Shows the list of items the user has applied to borrow, along with status updates on those applications.

- **`/mypage/lend` : My Lend Page**  
  Lists items the user has lent out to others, with options to view the status of each lending transaction.

- **`/mypage/wish` : My Wishlist Page**  
  Contains items the user has added to their wishlist, tracking items they’re interested in borrowing or obtaining.

- **`/user/:id` : User Profile Page**  
  Displays the profile page of a specific user, allowing visitors to view public information and their shared closet items.

- **`/search` : Search Page**  
  Provides search functionality to find specific items, users, or closets within the application.
  
## Project Setup

### Environment Variables
Create an `.env.dev` file in the root directory for development mode with the following variables:
```
REACT_APP_API_URL=http://localhost:3000
PORT=4000
```
### Running the Client
Execute the following commands in the project root directory to set up and run the project:
#### Install Dependencies
```
npm install
```
This command downloads all necessary packages.


#### Start the Development Server
```
npm start
```
Runs the project on http://localhost:4000.

