<!-- language: lang-none -->
    [][][][]      [][][][]        ][]][][]       [][][][][][][][]     ][][][][    [][][][]  [][][][]
      [][][][]  [][][][]           ][  ][              [][]         ][]      ][     [][]      [][]
      [][]   [][]   [][]          []    []             [][]        [][              [][]      [][]  
      [][]    []    [][]         ][][][][][            [][]        [][              [][][][[]][][]  
      [][]          [][]        ][        ][           [][]        [][              [][]      [][]
      [][]          [][]       ][          []          [][]         ][]      ][     [][]      [][]
    [][][][]      [][][][]  [][][][]    ][][][][       [][]           ][][][][    [][][][]  [][][][]
                                        

                                        [][][][]    [][][][]
                                          [][]        [][]
                                          [][]        [][]
                                          [][]        [][]
                                          [][]        [][]
                                          [][]        [][]     
                                            [][][][][][]
                                    
 
# Match U
Match U is an app designed to enhance in-person connections by making it easy to compare people's likes and dislikes in order to prompt a fun conversation.

## Technologies
This system uses Ruby on Rails with a postgres server for the backend as well as React with React Router on the frontend.

## File Structure
### Backend
The backend files are located in the app folder. They consist of the controllers, models, and serializers necessary to fetch Data to/from the database. 
The db folder contains all of the migrations as well as the database schema.
The API routes themselves can be found in routes.rb file, which can be found in the config directory.

### Frontend
The frontend files are stored in the client directory.
App.js contains many of the fetch GET requests in order receive the preliminary data.
All of the React routes are contained in the src/features directory.
    
## Setup
To set up Match U, navigate to the main directory.
Before you begin, you will want to populate the database with some fake data of things to rate. To do that, enter: "rails db:migrate" from the command line.
Next, enter "rails s" from the command line to launch the rails server. 
Then navigate to the client folder and enter "npm start." This will launch react server and serve the app on localhost/4000.

## Usage
The demo system is populated with a small Faker data. To begin using it, click the link to create an account.
On the create account screen, enter your name, a username, and password.
Once the account is set up, return to the main screen and login.
Once you are logged in, you can begin to rate movies, tv shows, etc., by clicking: 
My ratings > Add a rating.
On the subsequent screen, begin to type an item to rate in the textbox. Many possible items may appear. Select the appropriate item, and add a rating between 1-10.
Hit submit, and you will be taken to a confirmation screen, on which you will see links to either add a new rating or return to your list of ratings.

To compare your ratings to someone else, click: Matches > Make a Match.
On the subsequent screen, click the button, and you will receive a match code. 
Give that match code to the person with whom you would like to match. 
That person should then click: Matches > Receive a Match.  
On the subsequent screen, s/he should enter the match code.
Lastly, for security purposes, you will need to confirm that you matched with the correct person. 
To do so go to: Matches > Pending matches.
On that screen,you will see a list of anybody who has attempted to match with you by entering one of your match codes. 
Click the "Confirm" button next to the person's name and the match will be complete.
If there are any matches on that list that you do not recognize, click the delete button to remove them. 
Finally, to see your comparisons, go to Matches > my matches.
On the following screen, you will see a comparison of your similar ratings, different ratings, and other statistics about how closely you are aligned. 

## Demo Video
If you would like to see this project in action, check out this demo video: https://www.youtube.com/watch?v=ylg8-rKmmFU&t=1s