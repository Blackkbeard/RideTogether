![image](https://github.com/VineshRavindiran/RideTogether/assets/119284834/21818361-f08c-4670-8808-1227c452727b)

# RideTogether

An App Inspired for bike riders.

We Riders are able to create accounts, post for trips, register for trips, and meetup with one another. 
Registering for trips allow us to travel one another, via touring or even visiting race and dirt tracks.

This project was solely designed and developed by me, fullstack developer as part of General Assembly's Software Engineering Immersive.

---
## Feature Highlights

### 1) The HomePage
- A Rider's Paradise, where you can look and search for trips based on locations. The trips display all available rides by other riders.
  
<img width="1440" alt="image" src="https://github.com/VineshRavindiran/RideTogether/assets/119284834/d91be3aa-d612-44ea-8dc8-abeeea20baff">

- Engage by  registering for trips that interest you !
<img width="1434" alt="image" src="https://github.com/VineshRavindiran/RideTogether/assets/119284834/08ccedd5-f341-4d9f-b9c8-66def1ecb23d">


### 2) Profile Page
- After registering from the register page, you are able to view your profile details. You will be able to edit your details via the edit profile!
<img width="1440" alt="image" src="https://github.com/VineshRavindiran/RideTogether/assets/119284834/4ff0be12-4be9-41a4-beaf-5adbf58063e1">

### 3) My Trips Page
- Create your trip where you want to go, so that others are able to register and join you on your adventure!

<img width="1440" alt="image" src="https://github.com/VineshRavindiran/RideTogether/assets/119284834/ad78493e-e097-4182-bc91-66e772a5e992">

- Head down to the Trip details page to fill out the information on your Trip!

<img width="1436" alt="image" src="https://github.com/VineshRavindiran/RideTogether/assets/119284834/fec851ee-5d5a-493c-9abd-37b35b3c5a4f">

- View who has registered for your trips on the trips page!
  
<img width="1440" alt="image" src="https://github.com/VineshRavindiran/RideTogether/assets/119284834/2715d9ae-2f72-4922-b619-9191bfb559ea">

### 4) Registered Trips
- View your registered Trips!
- Delete your registered trips to unregister if you are unable to make it!
<img width="1440" alt="image" src="https://github.com/VineshRavindiran/RideTogether/assets/119284834/441a268b-4858-4349-880d-69e25273f721">

### 5) Navigate
- Effortlessly navigate through RideTogether app with the user-friendly navigation bar, conveniently located at the top and in the corner.
<img width="1440" alt="image" src="https://github.com/VineshRavindiran/RideTogether/assets/119284834/18077dd3-a545-4ff7-8abe-57b7c994b65a">

---
## Languages and Technologies Used

### Front-end
- React
- JavaScript
- HTML
- CSS
- Material UI

### Back-end
- Express.js
- NodeJs
- Database: PostgreSQL
- Driver: Node-Postgres

### Others
- Project management: DrawSQL, GoogleDocs
- UI Wireframing and prototyping: Uizard
- Design system: Material 3

---
## Setup

### Express Backend
All the backend code is in the Back-end directory. Run all backend commands from inside that directory.

### Setup .env for Backend
Create a new .env file in the back-end directory and add the following lines:
```
#Db.js
user: "",
host: "",
database: "",
password: "",
port: 


#Generate your own secrets in .env
jwtSecret


```
Add in your values here. 
- Generate your own Access Secret and Refresh Secret

### Run the app
```
npm i
npm run dev
```

### React Front-end
All the frontend react code is in the Front-end directory. Run all frontend commands from inside that directory.

### Setup .env for Front-end
Create a new .env file in the front-end directory and add the following lines:
```
VITE_SERVER=http://localhost:5173
```

### Run the app
```
npm i
npm run dev
```

---
## Wireframes and technical designs
- UI Wireframes

<img width="1299" alt="image" src="https://github.com/VineshRavindiran/RideTogether/assets/119284834/ee40e1c3-c830-47c6-911b-7264a69aad6f">

-  Back-end PostgreSQL relationship diagram 

<img width="1440" alt="image" src="https://github.com/VineshRavindiran/RideTogether/assets/119284834/e8f63419-833b-481a-823b-a5c0859f9568">


---

## Future development

- Riders can leave each other reviews
- One trip completed, should be able to move trip to completed list
- In-app notifications
- Proper logout protocol
- Users are allowed to change their passwords

---
## References

### Postman Tutorial for Testing Web APIs
- [Postman Tutorial](https://www.freecodecamp.org/news/how-to-test-and-play-with-web-apis-the-easy-way-with-postman/)

### Material-UI Styling and Components
- [Styling Material-UI Components using CSS](https://stackoverflow.com/questions/71392336/styling-material-ui-components-using-css)
- [Disable Box Shadow Globally for Material-UI Components](https://stackoverflow.com/questions/34550593/how-to-disable-box-shadow-globally-for-all-material-ui-components)
- [Styling Material-UI Button Text Casing](https://stackoverflow.com/questions/50766693/how-to-center-a-component-in-material-ui-and-make-it-responsive)
- [Centering a Component and Making It Responsive](https://stackoverflow.com/questions/50766693/how-to-center-a-component-in-material-ui-and-make-it-responsive)
- [Customizing Material-UI Button Hover Colors](https://stackoverflow.com/questions/64983425/material-ui-button-hover-background-color-and-text-color)
- [Styling Material-UI TextField](https://stackoverflow.com/questions/46966413/how-to-style-material-ui-textfield)
- [Removing Underline for React Router Link](https://stackoverflow.com/questions/37669391/how-to-get-rid-of-underline-for-link-component-of-react-router)
- [React Router onClick Redirect](https://bobbyhadz.com/blog/react-onclick-redirect)
- [Material-UI Date Picker Validation](https://mui.com/x/react-date-pickers/validation/)
- [Making Material-UI DatePicker Required](https://stackoverflow.com/questions/58801744/material-ui-datepicker-set-to-required)

### Using LocalStorage with React Hooks
- [Using LocalStorage with React Hooks](https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/)

---
## Credits
- [JWT Login](https://www.youtube.com/watch?v=7UQBMb8ZpuE&ab_channel=TheStoicProgrammers)
