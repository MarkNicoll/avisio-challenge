The structure of tha app is based on the idea that the dashboard could hypothetically grow in the future to contain many "modules" - individual components that each display a piece of analytical data - that could be swapped around as the user sees fit. The orderUtils file contains shared functions that take in order data and return some data derived from that, intended to be reused throughout the application. The components section is quite self-explanatory: a collection of small reusable components.

For the Order Volume component, I made the assumption that the filtering should work as follows:

 - User selects a supplier 
 - User selects a category based on the categories that the selected parent supplier has available 
 - User selects a sub-category based on the sub-categories that the selected parent category has available

My reasoning for not utilising a state management library such as Redux for this application is that Redux adds a significant amount of boilerplate code (Actions, Reducers etc). As the state management and component hierarchy for this app is quite simple, I felt that Redux would be overkill. A much larger appliction that actually retrieved data from a server could benefit from using Redux + selectors for storing and manipulating the orderData.

Similarly, know that are several ways to manage CSS in React apps, such as Styled Components, in-line styles, pre-processors such as SCSS, etc. As I wanted to keep this app quite simple and spend most of my focus on the actual code, I went with a single, small CSS file with a couple of comments to give it some structure.

