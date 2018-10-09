# Rugby Scout 
A web application that will track Rugby stats and players to make information accessible to college recruiters. Create an interface that will allow rugby, teams, coaches and players to upload a profile with stats, videos. 

# About Us
Created by: [Sharon Miller](https://github.com/SharonMiller), [Connor Crossley](https://github.com/Concross), [Alex Hanson](https://github.com/alexlhanson)


## Table of Contents
<!-- TOC -->

- [Status](#status)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [ERD Diagram](#ERD-Relationships)
- [Schemas](#schemas)
- [RESTful API's](#API)
- [Auth](#Auth)

## Installation
1. [Clone Repository](https://github.com/TeamAquamarine/rugby-scout-server)
2. npm istall
3. change sample-env to .env and add your values

## Status
[![Build Status](https://travis-ci.org)](https://travis-ci.org)
[![Coverage Status](https://)]



## Technologies Used
* **[Node.js](https://nodejs.org)**

  * Application dependencies:
    * [express](https://www.npmjs.com/package/express)
    * [bcrypt](https://www.npmjs.com/package/bcrypt)
    * [babel](https://www.npmjs.com/package/@babel/cli)
    * [assert](https://github.com/browserify/commonjs-assert)
    * [cors](https://www.npmjs.com/package/cors)
    * [dotenv](https://www.npmjs.com/package/dotenv)
    * [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
    * [require-dir](https://www.npmjs.com/package/http-errors)
    * [mongoose](https://www.npmjs.com/package/mongoose)
    * [morgan](https://www.npmjs.com/package/morgan)
  * Developer dependencies:
    * [eslint](https://www.npmjs.com/package/eslint)
    * [superagent](https://www.npmjs.com/package/superagent)
    * [jest](https://www.npmjs.com/package/jest)
    * [debug](https://www.npmjs.com/package/debug)
    
* **[MongoDB](https://www.mongodb.com)** 
* **[Mongoose](http://mongoosejs.com/)**
* **[Heroku](https://www.heroku.com/)**
* **[TravisCI](https://travis-ci.org/)**

## ERD Relationships
![](./img/erd-relationship.png)

## Schemas
**User Schema** 
```
{
  username: { type: String, required: true },
  password: { type: String, required: true },
  coach: { type: Schema.Types.ObjectId, ref: 'coaches' },
  player: { type: Schema.Types.ObjectId, ref: 'players' },
  team: { type: Schema.Types.ObjectId, ref: 'teams' },
  stats: { type: Schema.Types.ObjectId, ref: 'stats' },
  role: { type: String, enum: ['coach', 'player'] },
} 
```
**Profile Schema** 
```
{
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  bio: { type: String, default: `Hello!` },
  email: { type: String },
} 
```
**StatBlock Schema** 
```
{
  user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  wins: { type: Number, min: 0, default: 0 },
  losses: { type: Number, min: 0, default: 0 },
  tries: { type: Number, min: 0, default: 0 },
  conversions: { type: Number, min: 0, default: 0 },
  penaltyGoals: { type: Number, min: 0, default: 0 },
  dropGoals: { type: Number, min: 0, default: 0 },
  tackles: { type: Number, min: 0, default: 0 },
  offloads: { type: Number, min: 0, default: 0 },
  handlingErrors: { type: Number, min: 0, default: 0 },
  runMeters: { type: Number, min: 0, default: 0 },
  linebreaks: { type: Number, min: 0, default: 0 },
  penaltiesConceded: { type: Number, min: 0, default: 0 },
  yellowCards: { type: Number, min: 0, default: 0 },
  redCards: { type: Number, min: 0, default: 0 },
} 
```
**Team Schema** 
```
{
  coach: { type: Schema.Types.ObjectId, ref: 'users'},
  players: [{ type: Schema.Types.ObjectId, ref: 'users'}],
  name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true},
  phone: { type: String },
  email: {type: String},
} 
```



# User Stories

## Users
- As a **college recruiter** _(stretch goal)_, **rugby player** and **coach** I want to be able to create an account.

- As a **college recruiter** _(stretch goal)_, **rugby player** and **coach** I want to be able to log in. 

- As a **college recruiter** I want to use rugby scout to get stats and media related to a player so I can identify talent.

- As a **college recruiter** _(Stretch goal #3)_ I should have access to team contact information so I can contact potential talent.

- As a **college recruiter** _(Stretch goal #2)_ I want to be able to save prospective recruits to my own favorites list

- As a **rugby player** or **coach** I should be able to create a profile with a bio, and stats so that I can help myself get identified by scouts.

- As a **rugby player** or **coach** _(Stretch goal #1)_ I should have the ability to upload media to my profile so that I can personalize my profile with better content. _(Post request saving something to s3 bucket)_

- As a **rugby player** or **coach** I should have the ability to enter/update my stats so that recruiters can see the my latest performance statistics. _(put request)_

- As a **coach** I want to be able to add/remove players on my team so that I can maintain a roster.

- As a **coach** _(Stretch goal)_ I want a standardized form where I can enter information about my team and matches.

- As a **coach** _(STRETCH)_ I want to be able to upload a roster.csv file to batch upload player data.

- As a **public user** I want to be able to see stats of all players, coaches and teams for my own purposes.

- As a **public user** I want to be able to see stats of a specific player or coach for my own purposes.

- As *any authorized user* _(Stretch goal)_ I want to be able to delete my own profile.

## Developers

- As a **developer** I want to have thorough test suites for my models

- As a **developer** I want to have functioning tests for my routes

- As a **developer** I want to have 95% code coverage through my tests 

- As a **developer** I want to create an auth server so that I can properly protect access to certain routes/requests

- As a **developer** I want to create an auth user model so that I can work with auth

- As a **developer** I want my code to be clean and readable

- As a **developer** I want to create a player resource in order to represent an individual player

- As a **developer** I want to create a coach resource in order to represent an individual coach

- As a **developer** I want to create a many to one relationship between players to coach

- As a **developer** I want to make my application deployable so that it can be more readily accessed by other users.

- As a **developer** I want to have good documentation so that my process can be understood and others can more readily contribute to it.

- As a **developer** I will be able to have my server dynamically route to different models.

# Git & Github Team Workflow

## When a new feature is started
* Pull from the most up to date development branch   
 * `git checkout development`  
 * `git pull origin development`
 * Create a new feature branch with `git checkout -b <branchname>` 
 * Branch names need to include <[issue_number]_[issue_title]> as naming convention so they also tie to our github project issues. 
* Do work on your feature branch and **add**, **commit**, and **push**   
 * `git add <file>`  
 * `git commit -m <useful message>`   
 * commit messages should also include prefixes such as "closes #[issue_number]. <rest of message>" or "references #[issue_number]. <rest of message>"
 * `git push origin <feature_branch_name>`
* On GitHub:
 * Create a Pull Request (PR) for that branch on GitHub
 * Have at LEAST one other person, preferably both to review the code in the PR and merge it.


## Time for a Merge Party!

**WHEN A PULL REQUEST FROM SOMEONE ELSE'S \<FEATURE BRANCH> IS MERGED TO DEVELOPMENT, EVERYONE MUST DO THESE STEPS**  

 * commit changes to your _feature branch_
   * `git add <file>`  
   * `git commit -m <useful message>`   
 * update your local _development_ branch  
   * `git checkout development`   
   * `git pull origin development`  
 * update  _feature branch_ with changes in _development_  
 	 * `git checkout <feature_branch_name>`  
   * `git merge development`   
 * handle merge conflicts _if there are any_  
  	* Check all project files for the markers that indicate merge conflicts (in other words, the `>>>>>>>>>` and `HEAD`
  	* Edit the code to remove the redundancies causing the merge conflict, and eliminate the markers
  	* `git add <affected-files>`
  	* `git commit -m "merged master"` 

## MVP
* Once features are sufficiently developed to the point of a working MVP run PR into master branch
* Running PR into master branch should trigger “Travis CI” to check code with tests.
* Fix any outstanding issues  
* `Checkout` local master branch and `fetch` origin master branch.
* Push local master branch into heroku branch for deployment.
* Additional features will go into development branch first before being pulled into master and repeating this process

## API
* **User Model**
  * _POST_  - **/register** - Saves a new user to user model with hashed password and returns authorization token.
  * _GET_ - **/signin** - Passes username and password into request, compares to database and returns an authorization token.
  * _GET_ - **/outh** - Passes through handshaking process with 3rd-party authorization using Github account, saves user to user model and returns an authorization token. 
  * _GET_ - **/user/:id - Public-facing retrieval request to see an individual user's stats and or profile information, while excluding private parameters.
* **Team Model**
  * _POST_ - **/team** - Creates a new team with required `name`, `city` and `state`.  This route is restricted to coach role in user.
  * _PUT_ - **/team** - Updates the team information according to associated authorized user.  Available to coach role.
  * _PUT_ - **/team/roster/add/:id** - Updates the team information according to associated authorized user by adding a new player to the players array in team model.  Available to coach role.
  * _PUT_ - **/team/roster/remove/:id** - Updates the team information according to associated authorized user by removing a player to the players array in team model.  Available to coach role.
  * _GET_ - **/team/:id** - Public-facing retrieval of information on a specific team id.

* **Profile Model**
  * _POST_ - **/profile** - Creates a new profile with userId referencing authorized user and requires `firstName`, `lastName`, and `role`.
  * _PUT_ - **/Profile** - Updates the profile information according to associated authorized user.
  * _GET_ - **/profile/:id** - Public-facing retrieval of information on a specific profile id. 
* **StatBlock Model**
  * _POST_ - **/statBlock** - Creates a new statBlock with userId referencing authorized user.
  * _PUT_ - **/statBlock** - Updates the statBlock information according to associated authorize user.  Available to coach role.
  * _GET_ - **/statBlock/:id** - Public-facing retrieval of information on a specific statBlock id.

## Auth
* For authentication Rugby-Scout supports basic and OAuth authentication.
* For authorization Rugby-Scout supports bearer authorization using JSON Web Token library.
* Passwords are hashed before adding to database for local setup.
* API calls use authorized user for permission and role parameter in the user to further specify permission.

