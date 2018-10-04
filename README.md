# Rugby Scout Server
Create a web application that will track Rugby stats and players to make information accessible to college recruiters. Create an interface that will allow rugby, teams, coaches and players to upload a profile with stats, videos. 

# About Us
Created by: Sharon Miller, Connor Crossley, Alex Hanson



# User Stories

## Users
- As a **college recruiter** I want to use rugby scout to see stats and media related to a player so I can identify talent.

- As a **college recruiter** _(Stretch goal)_ I should have access to contact information so I can contact potential talent.

- As a **rugby player** I should be able to create a profile with a profile picture so that I can help myself get identified by scouts.

- As a **rugby player** I should have the ability to upload media and a bio to my profile so that I can personalize my profile with better content. 

- As a **rugby player** I should have the ability to enter/update my stats so that recruiters can see the my latest performance statistics. 

- As a **coach** I want to create a profile so that players and the public can see me

- As a **coach** I want to be able to edit my own staff bio and team media so that I can control the status of my team.

- As a **coach** I want to be able to add players to my team so that I can maintain a roster.

- As a **coach** _(Stretch goal)_ I want a standardized form where I can enter information about my team and matches.

- As a **coach** _(STRETCH)_ I want to be able to upload a roster.csv file to batch upload player data.

- As a **public user** I want to be able to see stats of all players, coaches and teams for my own purposes.

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
