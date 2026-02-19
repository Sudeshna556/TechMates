## basic commands
cd.. => go back to main folder

npm start => start the server 
or
pm run dev => start the server 

cd Backend => go to backend folder

cd Frontend => go to frontend folder

$ npm create vite@latest my-app -- --template react => To setup the frontend project , it will ask for the project name and the template, automatically install the dependencies.

$ npm install => To install the dependencies

## GIT commands

### start a new git repository

$ git init => initialize a new git repository
$ git add . => add all the files to the staging area
$ git commit -m "Initial commit" => commit the changes
$ git remote add origin <repository-url> => add the remote repository
$ git push -u origin main => push the changes to the remote repository

### Mistakenly i made frontend as a submodule, so i need to remove it.

$ git rm --cached Frontend -r => remove frontend as a submodule
$ rm -rf Frontend/.git => remove frontend git folder (optional)
$ git add Frontend/ => add frontend folder
$ git commit -m "Merged frontend into main repository" => commit the changes
$ git push origin main => push the changes

### To check the status of the repository

$ git status => To check the status of the repository

### To add a new submodule

$ git submodule add <repository-url> <path-to-submodule>

### To update the submodule

$ git submodule update --init --recursive => update the submodule
