Earthquake Info Hub App
=======================
I want this app to be able to provide information about recent earthquakes, earthquakes near the user, and information by request for earthquakes.

Design Ideas
------------
<strike>The landing page should have recent significant earthquakes on it and should have navigation to other methods of information.</strike>
I just used a mobile-first design for now. Maybe later for responsive the nav and misc. things can be added.
I'll provide the information that is sent back after a request, so that a designer can use the information to better think
about how it might be best to display it.

I kinda want each earthquake 'card' to look like the picture below. Click it to go to the Codepen page for the design.

Here is the picture:  
<a href="https://codepen.io/CodeSquatch/pen/zmBZgB" target="_blank"><img src="https://www.dropbox.com/s/94rdgheyb35nv2s/GitHub-earthquakes1.png?raw=1" width="600"></a>

I think each earthquake 'card' should have a button in it that will display more details about that earthquake besides  
the magnitude, time, and place. For example, the json object returns info like a tsunami number, a status, another json  
object with MORE details, magnitude type, and coordinates (which I am not sure what they are for).

### JSON info sent back

The USGS site that has the JSON format and info is <a href="https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php" target="_blank">here</a>.

### TODO tasks for contributors
1.  I think the most important right now is visual design.
2.  Next will be traversing a json object
3.  Lastly is just ideas for features. You can add them into the README here
4.  Making a search feature to allow users to refine their results to certain earthquakes.

Git Instructions (Mac)
----------------------
1.  Fork this repository to your own by clicking Fork on this page

2.  Next, you will clone your forked repository (remote repository) onto your computer (local repository).

    * You need to copy the remote url from your forked project page by clicking on the 'clone or download' button.
    
    * Once that is copied to your clipboard, open a terminal window and change directory (`cd`) to the directory that  
      you want the project folder to be in.  
      **Note: cloning will create a folder for you with all of the code inside it**
    
    * Once you're in the desired folder, run this command:  
      `git clone https://github.com/YourUserName/earthquakes.git`  
      The url is the one you copied, so paste it after `git clone`.
      
3.  Now that you have the current state of the project cloned to your computer, you will want to create your own  
    branch. This will make pull requests easier when you push to my repository page.
    
    Run this command to do that:  
    `git checkout -b firstinitial-lastname`
    
    This is the same as running these two commands:
    
            git branch firstinitial-lastname
            git checkout firstinitial-lastname
            
    For me, I would run `git checkout -b ewilliams` to create and checkout the branch. When you commit changes  
    they will be committed to this branch, because it's checked out. You can name the branch whatever you want.  
    Something descriptive would help everyone.
    
    E.g.  
    `git checkout -b readme-change`  
    The `-b` means branch
    
4.  When you have made and committed all the changes you want to your branch, it will be time to push your branch  
    to this repository. You'll need to copy the url from this page, using the 'clone or download' button again.  
    Run this command to push it to here:  
    `git push url branch-name`
    
    Replace branch-name with the name of your branch and replace the url with the one you copied from this page.
    
    This will make a pull-request that I can review.
    
#### For PC, download <a href="https://gitforwindows.org/" target="_blank">Git Bash</a>
The commands will be the same for Git Bash as they are here.
    
    
    
    
