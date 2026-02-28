# cs465-fullstack
CS-465 Full Stack Development with MEAN

# Travlr Getaways – Full Stack Web Application  
**CS 465 – Full Stack Development I**  
Aaron Befus  

## Architecture

The Travlr Getaways project incorporates two distinct approaches to frontend development: server-rendered Express views and a client-side single-page application (SPA) built with Angular. The Express portion of the application uses the Model-View-Controller (MVC) pattern, where routes map incoming HTTP requests to controllers, which then render Handlebars templates. This approach represents a traditional web application model in which each navigation event results in a new page being rendered by the server.

In contrast, the administrative interface is implemented as a single-page application (SPA) using Angular. Rather than reloading pages, Angular dynamically updates the browser view through client-side routing and component-based architecture. The SPA uses services to manage HTTP communication and reusable components to render trip listings, forms, and navigation elements. This approach provides a richer user experience, including real-time updates, reactive forms, and seamless transitions between views.

The backend uses a NoSQL MongoDB database because the application benefits from flexible document-based data storage. Travel packages, users, and related records are naturally represented as JSON-like documents, which aligns well with MongoDB’s structure. Using MongoDB with Mongoose allows schema enforcement while still supporting flexible data modeling. The document-oriented design simplifies storage of nested objects and reduces the need for complex relational joins, making development faster and more adaptable as requirements evolve.

## Functionality

JSON (JavaScript Object Notation) differs from JavaScript in that JSON is a data-interchange format, while JavaScript is a programming language. JSON is used to represent structured data in a lightweight, text-based format. Although it resembles JavaScript object syntax, JSON is language-independent and is used to transmit data between the frontend and backend in a standardized way.

In this project, JSON ties together the frontend and backend by serving as the format for RESTful API responses and requests. When the Angular SPA performs a `GET`, `POST`, or `PUT` request, the backend responds with JSON representing trip data stored in MongoDB. Angular services parse this JSON and bind the resulting data to UI components, enabling dynamic rendering of travel listings and forms.

Throughout development, several instances required refactoring to improve functionality and efficiency. For example, HTTP logic was centralized within Angular services rather than embedded directly in components. This separation improved maintainability and reduced duplication. Components such as trip cards and listing views were designed to be reusable, allowing consistent rendering of travel packages across the application. Reusable UI components reduce code redundancy, improve consistency, and simplify future enhancements.

Security was also refactored into middleware using JSON Web Token (JWT) validation. By implementing authentication as middleware in Express, protected routes could be secured without duplicating authentication logic in each controller, improving modularity and maintainability.

## Testing

In a full stack application, understanding HTTP methods and endpoints is essential. Methods such as `GET`, `POST`, `PUT`, and `DELETE` define the type of operation performed on a resource, while endpoints define the specific URL paths that map to backend functionality. For example, `/api/trips` supports `GET` to retrieve all trips and `POST` to create a new one, while `/api/trips/:tripCode` supports `GET` and `PUT` operations for specific resources.

Testing required validation at multiple layers. Postman was used to directly test API endpoints before the frontend was fully integrated. This allowed verification that routing, request handling, and MongoDB persistence were functioning correctly. MongoDB Compass was used to inspect the database directly and confirm that records were created and updated as expected.

With security implemented through JWT authentication, testing became more complex. Protected routes required valid tokens in the `Authorization` header, and improper or missing tokens resulted in `401 Unauthorized` responses. Testing confirmed that the admin SPA correctly handled authentication, included tokens in requests, and restricted access to protected endpoints.

These layers of testing demonstrated the importance of verifying not only data flow but also authorization and security enforcement within a full stack environment.

## Reflection

This course significantly strengthened my understanding of full stack development and the interaction between frontend, backend, and database systems. I developed hands-on experience building RESTful APIs, implementing authentication with JWT, structuring applications using MVC, and developing a component-based SPA with Angular.

One of the most valuable skills gained was understanding how architectural decisions impact scalability, maintainability, and security. I learned to think in terms of separation of concerns, reusable components, and layered testing strategies. I also gained experience debugging integration issues between the frontend and backend, which reinforced the importance of systematic testing and incremental development.

From a professional standpoint, this course helped me move beyond writing isolated code modules to designing complete systems. I now feel more confident discussing REST APIs, authentication flows, NoSQL databases, and frontend frameworks in technical interviews. The Travlr Getaways project serves as a concrete portfolio piece demonstrating full stack capability, security implementation, and real database integration.

## Repository

**GitHub Repository Link:**  
https://github.com/aaron-eugene/cs465-fullstack
