<!-- [![Issues][issues-shield]][issues-url] -->

<!-- PROJECT LOGO -->

<br />
<div align="center">
  <a href="https://gitlab.vinci.be/alona.mykhailenko/web1-project">
    
  </a>

 
  <h3 align="center">VINCI COURT</h3>
  <h4 align="center">TENNIS CLUB MANAGEMENT WEBSITE</h4>


  <p align="center">
    75th group
    <br/>
    <b>Members :</b>Mykhailenko Alona, Yaou Addou Marouan, Elmaki Abir 
    <br/>
  </p>
</div>


<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a></li>
      <li><a href="#requirements">Requirements</a>
      <ul>
      <li><a href="#functional">Functional</a></li>
        <li><a href="#non-functional">Non-functional</a></li>
        <li><a href="#database">Database</a></li>
      </ul>
    </li>
    <li>
      <a href="#pages">Pages</a>
      <ul>
        <li><a href="#shared-pages">Shared pages</a></li>
        <li><a href="#tournament-pages">Tournament pages</a></li>
        <li><a href="#court-pages">Court pages</a></li>
      </ul>
    </li>
      <li><a href="#tasks">Tasks</a></li>
      <li><a href="#submissions">Submissions</a>
      <ul>
        <li><a href="#part-1">Part 1</a></li>
        <li><a href="#part-2">Part 2</a></li>
        <li><a href="#final">Final</a></li>
      </ul>
      </li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
# About The Project

### Global informations

#### Schedule of the project
![Static Badge](https://img.shields.io/badge/2024_03_15-Project_started-green)

![Static Badge](https://img.shields.io/badge/2024_04_26-Project_submission-blue)


#### Contacts
- Mme Ferneeuw : stephanie.ferneeuw@vinci.be
- M. Choquet : olivier.choquet@vinci.be
- M. Plumat : jerome.plumat@vinci.be
- M. Seront : gregory.seront@vinci.be
- M. Lecharlier : loic.lecharlier@vinci.be
- M. Derieuw : jeansebastien.derieuw@vinci.be
- M. Strebelle : sebastien.strebelle@vinci.be

## Organization

- [x] <b> Alona </b> : Part A
- [x] <b> Marouan </b> : Part C
- [x] <b> Abir </b> : Part B

### Tasks

#### Shared Tasks
- Home Page
- Login Page
- Register Page
- Navigation

#### Part A
- Tournament List Page
- Tournament Details Page
- Tournament Creation Page

#### Part B
- Court List Page
- Court Details Page
- Court Bookings Page
- Court Update Page

#### Part C
- Coach List Page
- Coach Bio Page
- Coach Messages Page
- Coach Update Page

<br/>






# Requirements

### Functional 

#### For All Users:
- **Get Information**: Learn about Vinci Court and its offerings.
- **Account Management**: Create an account, log in, and log out.
- **Tournament Details**: View upcoming tournaments.
- **Court Information**: Explore details of tennis courts.
- **Coach Bios**: Read about the club's coaching staff.

#### For Connected Users:
- **Tournament Actions**: Register or unregister for tournaments.
- **Court Booking**: Reserve tennis courts and manage bookings.
- **Coach Interaction**: Send messages to coaches and view responses.

#### Additional Privileges for Coaches:
- **Tournament Creation**: Organize and create tournaments.
- **Court Management**: Manage tennis courts.
- **Bio Page Management**: Update personal bio page.
- **Message Handling**: Consult received messages and respond.
### Non-functional
- All your code and comments must be in English
- The development language of the server is JavaScript.
- The HTML code must be valid HTML 5.
- The database design shall respect the rules and conventions seen in the course: “Gestion des données:
bases”.
- We recommend the use of the Bootstrap framework for HTML design and CSS. It produces friendly html
pages with less effort.
- The folders’ names containing the different parts should correspond to these used during the
“Développement web : bases” classes.
### Database
- The database of the web site is an SQLite file.
- The database file must be created using the provided installation script. Details about the installation of
the project will be provided later.
- Each tournament must have a unique name.
- Each user must have a unique email.
- Each tennis court must have a unique name and location.
- A message is sent from one user to another user.
- A user can create multiple tournaments.
- A user can book a tennis court for a certain date. Each tennis court can be booked multiple times, but only by one user per date.
- A user can register for multiple tournaments. Each tournament can have multiple registered users.


# Pages

## Shared pages

### Home Page
Presents an overview of the club.
- Number of upcoming tournaments.
- Number of upcoming court bookings.
- Number of messages sent in the last week.

### Navigation Bar
##### User is NOT connected:
- Home page.
- Tournament list page.
- Court list page.
- Coach list page.
- Login page.
- Register page.
##### User is connected:
- Home page.
- Tournament list page.
- Court list page.
- Courts bookings page.
- Coach list page.
- Coach messages page.
- Logout.

### Login Page
- Allows users to log in with valid credentials.
- Displays error messages for incorrect login details.

### Register Page
- Enables users to create new accounts with validated information.
- Validates email format and uniqueness, and password strength.

## Tournament pages

### Tournament List Page
This page presents a list of all upcoming tournaments, sorted by date. Each tournament displays its name, date, and maximum number of participants. Clicking on a tournament's name redirects the user to the tournament details page.

### Tournament Details Page
Here, users find comprehensive information about a specific tournament, including its banner image, name, date, coach's name, current number of participants, and maximum capacity. If a user attempts to access a non-existent tournament, an error message is displayed. 

- If the tournament hasn't occurred yet, the maximum capacity hasn't been reached, and the user isn't already registered, a registration button appears. Clicking it registers the user for the tournament.
- If the user is already registered, an unregister button is displayed. Clicking it removes the user's registration.

### Tournament Creation Page
This page features a form for creating a new tournament. Users input the tournament's name, banner image, date, and maximum participant count. All fields are mandatory, with the date required to be in the future and the participant count an integer greater than one. Tournament names must be unique.

- Upon submission, the tournament is created, and users are redirected to the tournament list page.
- Any errors in the form submission are displayed to the user.

If the user is not logged in or is not a coach, they are redirected to the tournament list page.

## Court pages

### Court List Page
Displays a list of all tennis courts, ordered by name, showing their name and flooring type. Clicking on a court's name redirects the user to the court details page. If the user is a coach, buttons for court modification are displayed.

### Court Details Page
Shows comprehensive information about a tennis court, including its name, flooring type, location, and picture. If the court doesn't exist, an error message is shown. Connected users can book the court for future dates.

- Upon form submission, if the court is already booked for the selected day, an error message is shown. Otherwise, the user is redirected to the court bookings page after booking the court.

### Court Bookings Page
Lists all courts booked by the user in the future, ordered by booking date. For each court, its name, booking date, and an unbooking button are displayed. Clicking the unbooking button removes the booking.

### Court Update Page
Displays a form to update court information, prefilled with previous data. All fields are required, including flooring type selected from a dropdown menu. Court name and location must be unique.

- Upon form submission, court information is updated, and the user is redirected to the court details page. If the court doesn't exist or the user isn't authorized, an error message is displayed.

## Coaches pages

### Coach List Page
Lists all coaches ordered by name, displaying their full name and email. Clicking on a coach's name redirects the user to the coach bio page.

### Coach Bio Page
Shows details about a coach, including their name, email, biography, and picture. If the user is not a coach, a form to send a message to the coach is displayed. Coaches can update their bio, redirecting them to the update bio page.

### Coach Messages Page
Displays messages ordered from most recent to oldest. Regular users see their messages and any responses, while coaches see messages sent to them without replies. A form is provided to send responses for each message.

### Coach Update Page
Shows a form to update coach information, including biography and picture. Fields are prefilled with previous data, and all are optional. Upon submission, the information is updated.

### Methodology
- Syllabus of the class:
https://ochoquet.be/syllabusWeb1/Syllabus_Web1.html#/

- Reminder of the methodology to create a HTML/CSS file:
http://ochoquet.be/syllabusHTML/methodologie.html



# Submissions

## Part 1

#### Analysis and Interface Development
- Analyze website requirements.
- Develop interface prototypes for Tournament details, Court details, and Coach bio pages.
- Use tools like app.diagrams.net for prototypes.
- Export prototypes as PDF files.

#### Routing Table
- Create a table detailing all program routes.
- Include method, path, router, model, and view with route purposes.
- Refer to provided example exoplanets_routetable_sample.docx for formatting.

#### Submission Process
1. **Prototypes**:
   - Create prototypes as PDFs in a folder named prototypes_group_XX.
   - XX represents your assigned group number.

2. **Routing Table**:
   - Document routes in a file named routes_group_XX.docx.
   
3. **Submission Format**:
   - Place both folders (prototypes_group_XX and routes_group_XX.docx) in a folder named submission1_group_XX.
   - XX denotes your group number.
   - Zip the folder for submission.

4. **Upload Deadline**:
   - Submit the zipped folder to the "Intermediate Submission 1" assignment on Moodle before 22/03 20:00.
   - Only one student from each group should make the submission.

Ensure adherence to the provided naming conventions and submission instructions.

## Part 2

#### Database Structure

##### DSD Diagram
- Create a DSD diagram for your database following course conventions.
- Use app.diagrams.net for diagram creation.
- Export the diagram as a PDF named dsd_group_XX.pdf.
  - XX represents your assigned group number.

##### SQL Script
- Develop an SQL script to create or re-create database tables.
- Export the script as an SQL file named script_group_XX.sql.

#### Submission Process
1. **DSD Diagram**:
   - Export DSD diagram as PDF in a folder named submission2_group_XX.

2. **SQL Script**:
   - Save SQL script as an SQL file in the same folder.

3. **Submission Format**:
   - Place both files (dsd_group_XX.pdf and script_group_XX.sql) in a folder named submission2_group_XX.
   - XX denotes your group number.
   - Zip the folder for submission.

4. **Upload Deadline**:
   - Submit the zipped folder to the "Intermediate Submission 2" assignment on Moodle before 29/03 20:00.
   - Only one student from each group should make the submission.

Ensure adherence to the provided naming conventions and submission instructions.

## Final

#### Report
- Prepare a report presenting your project and achieved results.
- Use the provided template available on Moodle.
- Report language: French or English.
- Name the report as: rapport_group_XX.docx.
- Upload the report to the "Final submission: Project report" assignment on Moodle before 26/04 20:00.
- Only one student per group must make this submission.

#### Code
- Use the "prepare_submission.sh" script in your project template to check functionality and create the submission archive.
- Run the script in the terminal located at your project's folder using the command "bash prepare_submission.sh".
- If the code is functional, the script creates a submission archive named project_group_XX_FIRSTNAME_SURNAME.zip.
- Rename the submission archive with your group number, firstname, and surname.
- Upload the zipped folder to the "Final submission: Project code" assignment on Moodle before 26/04 20:00.
- Every student in the group must make this submission.

### Submission Deadlines
- Report: Upload before 26/04 20:00.
- Code: Upload before 26/04 20:00.

Failure to complete the submission correctly may result in disqualification from project participation and the interview during the exam session.


#### Logo
<!-- <img src="images/Restaurant-Logo.png" alt="Logo" width="100" height="100">-->

#### Color palette
  <!--<ol>
    <a href="https://coolors.co/d6d6d6-cfb5c1-422040">Palette of Louni</a>
  <br/>
    <a href="https://coolors.co/73683b-000000-ffd700">Palette of Moulay</a>
  </ol>
<br>-->




