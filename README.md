# React Native Movie App
## A mobile application built with React Native that allows users to discover popular movies, view detailed information, and manage a personal list of favorites. This app uses TheMovieDB (TMDB) API as its data source.
### ✨ Features
Browse a list of popular movies with infinite scroll.

View detailed information for any movie.

Add movies to a local "Favorites" list.

Remove movies from "Favorites".

View all favorite movies on a dedicated screen.

Favorites persist between app sessions.

### 🛠️ Technology Stack
Framework: React Native

API: TheMovieDB (TMDB) API

Navigation: React Navigation 

### 🚀 Setup and Installation
Clone the repository:
git clone [https://github.com/your-username/react-native-movie-app.git](https://github.com/ArseniiShmatov09/TMDB_RN.git)

```cd TMDB_RN```

#### Install dependencies:
```
npm install
#or
yarn install
```

#### Run the application:
For iOS:
```npx pod-install
npx react-native run-ios
```

For Android:
```npx react-native run-android```

## ✅ Acceptance Criteria (AC)
### The project is broken down into the following User Stories and their corresponding Acceptance Criteria.
#### User Story 1: Movie List Screen (Main Screen)
As a user, I want to see a list of popular movies so that I can find something interesting to watch.

AC 1.1: Fetch Movie List: When the app is opened, it should fetch and display a list of popular movies from the TMDB API (e.g., /movie/popular endpoint).

AC 1.2: Movie Card Display: Each movie in the list is represented by a card that must contain:

Movie Poster

Movie Title

Release Year

Rating (e.g., 7.8/10)

An icon to add to favorites (e.g., an empty heart/star).

AC 1.3: Loading State: A loading indicator (spinner) must be shown while the initial movie list is being fetched.

AC 1.4: Infinite Scroll: When the user scrolls to the bottom of the list, the app automatically fetches and appends the next page of movies to the list. A loading indicator should appear at the bottom during this fetch.

AC 1.5: Error Handling: If the API call fails (e.g., no internet connection), an error message (e.g., "Failed to load movies. Please check your connection.") and a "Retry" button must be displayed.

AC 1.6: Navigation to Details: Tapping on any movie card navigates the user to the Movie Detail screen for that specific movie.

#### User Story 2: Movie Detail Screen

As a user, I want to see detailed information about a movie so that I can decide if I want to watch it.

AC 2.1: Display Detailed Information: Upon navigating to this screen, it must fetch and display the following details for the selected movie (using e.g., /movie/{movie_id} endpoint):

High-resolution poster or backdrop image.

Title.

Original Title (if different).

Full description (overview/synopsis).

Rating.

Release Date.

List of Genres.

Runtime (if available from the API).

AC 2.2: Favorites Button: A prominent "Add to Favorites" icon/button is present. Its state (e.g., a filled vs. empty heart) must correctly reflect whether the movie is currently in 
the user's favorites.

AC 2.3: Back Navigation: A back button in the header or the native device back action must return the user to the previous screen (e.g., the Movie List screen), preserving the scroll position.

#### User Story 3: Favorites Functionality
As a user, I want to add and remove movies from my favorites list so I can easily access them later.

AC 3.1: Add to Favorites: When the user taps the "Add to Favorites" icon on either the list or detail screen:

The icon's state immediately toggles to its "favorited" state (e.g., filled heart).

The movie's ID is saved to the local device storage (e.g., AsyncStorage).

AC 3.2: Remove from Favorites: When the user taps the "favorited" icon on a movie that is already in favorites:

The icon's state immediately toggles back to its default state (e.g., empty heart).

The movie's ID is removed from the local device storage.

AC 3.3: Persistence: The list of favorite movies must persist across app sessions (i.e., the list is retained after the user closes and reopens the app).

#### User Story 4: Favorites Screen
As a user, I want to view all my favorite movies on a separate screen.

AC 4.1: Access Favorites Screen: The app must include clear navigation to access the "Favorites" screen (e.g., via a bottom tab bar).

AC 4.2: Display Favorites List: This screen displays a list of all movies that the user has marked as favorite. The card format should be consistent with the main movie list.

AC 4.3: Empty State: If no movies have been added to favorites, the screen must display a message indicating that the list is empty (e.g., "You haven't added any favorites yet.").

AC 4.4: Interaction:

Tapping on a movie card navigates to its corresponding Movie Detail screen.

The user can remove a movie from favorites directly from this screen (via the favorite icon on the card), and the movie should be immediately removed from the list view.
#### ❓ Questions for Clarification
To further refine these criteria, the following points should be discussed:

UI/UX Design: Is there a specific design mock-up (Figma, Sketch) to follow, or should the developer use their discretion?

Navigation Style: Will navigation be handled by a Tab Bar (bottom), a Drawer (side menu), or something else?

Localization: Will the app support multiple languages, or only English?

Platform Specifics: Should the UI be identical on iOS and Android, or can it adapt to native platform conventions?

Search Functionality: Is a movie search feature planned for a future release? This might influence the initial architecture.


https://github.com/user-attachments/assets/7c8e5e4e-1045-4bfc-b803-824faa4062da

