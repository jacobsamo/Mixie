# Changelogs

## #75 
- Added settings page 
- Users can now bookmark recipe and see them on the bookmarks page (`/${userId}/bookmarks`)
- github templates 
- updated to latest versions of packages
- added not-found pages instead of rendering them in each page 
- about us page
- add terms of service page
- update privacy policy
- changes to API routes 
    - add authentication to certain routes
    - add validation to certain routes
    - couple of new routes: bookmarks, users, updateUser
- update to constructing metadata

## 39-user-profile
start-date:
end-date: 26/4/23
target-completion-date: 28/4/23


- Users can now edit their profile
- Changed forms to use react hook form
- Add new pull-request template
- updated services for new features
- updated shared components to work with react hook form
  And many more updates

## 28-project-cleanup
start-date:
end-date:
target-completion-date:


- Removed unused files
- meally.com.au file restructure

### Github

- Added a new issue template for bugs and feature using the .yaml
- Update actions to use yarn instead of npm as well as working with turbo

### recipe form

- Rewrite of ingredient component
- Add new auto resizing text areas
- Made it inputs more clear on what to put in
- saving to local storage and deleting when submitted
- better handling when recipe has been created on server

### recipe page

- Fixed image error with an update to the recipe form being more clean on it
- fixed check box bug with them being huge and throwing out styling

## 2-build-landing-pages

- Styled and extended the main landing page
- Styled and extended the main recipe viewing page
<!-- - created a new page for Sweet recipes
- created a new page for Savory recipes -->

## 14-recipe-creation-form

So much has changed. here is a list of the changes:

- Added a new page for creating recipes
- Restructured the project to have a more modular approach
- Ui workspace now complies like a React Library
- Added a shared workspace for tailwind.config.js
- changed project from using npm to yarn for speed improvements
- Added firebase emulators for local development
-