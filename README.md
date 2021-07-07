# Control ComputerCraft Turtles Using Discord
Built using Node and Lua (Thanks to [ElvishJerricco's JSON parser for ComputerCraft](https://pastebin.com/4nRg9CHU))

## How it works
Both discord and ComputerCraft talk to eachother using a websocket server.

## Try it out!
Save a .env file with a discordbot token inside
```
TOKEN=YOUR_TOKEN_HERE
```
and, of course, run 
```bash
npm install
```
Afterwards you can paste *CCBot.lua* into ComputerCraft's files directly **or** use [this pastebin](https://pastebin.com/9NX8CP6z) to import it.  

**Keep in mind: ElvishJerricco's JSON library must be put in a folder titled "api" located in the same directory.**  
**It should look something like this:**
 ```
 disk
   |-CCBot.lua
   `-api
     `-json.lua
```

Alternatively, you can just change the first line of CCBot.lua to the pathfile of json.lua

## This was tested using CC: Tweaked on Minecraft 1.12.2, theoretically this should be fine on other versions of Minecraft, as well as vanilla ComputerCraft.
