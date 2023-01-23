## slippi-ranked-bot

A discord bot users can interact with to view each other's slippi data

## Requirements

In order to run this application you will need Node.js

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.

- #### Node installation on Ubuntu/MacOS

  You can install nodejs and npm easily with apt install, just run the following commands in your terminal.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

## Downloading

If you are familiar with Git go ahead and clone this repository. Otherwise select the green "Code" button and click "Download ZIP". Once that has downloaded make a new folder and extract the contents of the zip into that folder

## Setting up the bot

In order to run this bot you will need to add a bot to your discord account, then create a file called .env in the root directory that contains your discord secret token and your bot's client ID. For instructions on how to do this read the Creating an app and Configuring a bot sections of [this tutorial](https://discord.com/developers/docs/getting-started#creating-an-app)

Once you've created a .env file and provided your discord API key and client ID in the following format

$ DISCORD_TOKEN = "xxxxxxxxxxxxxxxxxxxxxxxx"
$ CLIENT_ID = "xxxxxxxxxxxxx"

you can invite the bot to a server by [generating an invite link](https://discordapi.com/permissions.html#517544074304).

## Running the bot

Open up a terminal, navigate to the root directory of this bot (the folder you dragged the zipped files into), and run the following commands

    $ node deploy-command.js
    $ node .
