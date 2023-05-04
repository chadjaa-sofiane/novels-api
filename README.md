# Gutendex Book Downloader
## Description
This app downloads novels from the Gutendex API and stores them in a local data folder. The data collected by this app can be used for machine learning applications, such as text analysis and natural language processing.

# Installation

To use this app, you will need to have nodeJs installed on your machine. You can install it from the official website https://nodejs.org/en.
if you are using Linux, the best way to install node is by downloading nvm and then installing the version of node you want.

```bash
sudo apt install curl 
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash 
source ~/.bashrc 
nvm install --lts
```

"--lts" will ensure that you download the recommended version of Node on your computer.

Next, you can download the source code from the GitHub repository:
```bash
git clone https://github.com/chadjaa-sofiane/novels-api
install the dependencies packages.
npm install 
// or
yarn install 
// or 
pnpm install
```

# usage
to run the app, simply type this command line in the app directory.
```bash 
npm start 
// or 
yarn sart 
// or 
pnpm start 
``` 