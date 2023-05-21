# Deploy Angular to Firebase
*1. Setup Firebase*  
- Sign up Firebase Account
- Create Project on Firebase
    - set project name
    - set project id 


*2. Build to production*
- CD to project file and run build command 

    `cd <proeject/frontend>`

    `ng build`

*3. Install firebase*
- Install firebase to project
    `cd <Project>`
    
    `npm install -g firebase-tools`

*4. Config and deploy*
-  Login and config 
    `cd <Project/Frontend>`
    
    `firebase login`
    
    `firebase init`


    *Select option* 

    ? Are you ready to proceed? Yes
    
    ? Please select an option: Use an existing project

    ? What do you want to use as your public directory? dist/my-first-app     

    ? Configure as a single-page app (rewrite all urls to /index.html)? Yes

    ? Set up automatic builds and deploys with GitHub? No

    ? File dist/my-first-app/index.html already exists. Overwrite? No



- Deploy to firebase
    
    `firebase deploy`
