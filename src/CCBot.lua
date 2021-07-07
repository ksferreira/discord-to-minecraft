os.loadAPI("api/json.lua")

local id = os.getComputerID()
local connURL = "localhost:8080/?bot=false&id=" .. id

local ws, err = http.websocket(connURL)

if not ws then
	print(err)
end

local move_table = {
	["up"] = function(X) turtle.up() end,
	["down"] = function(X) turtle.down() end,
	["forward"] = function(X) turtle.forward() end,
	["back"] = function (X) turtle.back() end,
	["left"] = function(X) turtle.turnLeft() end,
	["right"] = function(X) turtle.turnRight() end
}

local dig_table = {
	["up"] = function(X) turtle.digUp() end,
	["down"] = function(X) turtle.digDown() end,
	["forward"] = function(X) turtle.dig() end
}

while true do
	local event, url, response = os.pullEventRaw()

	if event == "websocket_message" then

		print(response)

		if url == connURL then
			
			local obj = json.decode(response)
			
			if obj ~= nil then
				local action = obj.action
				local dir = obj.direction

				print("Action: " .. action)
				print("Direction: " .. dir)
		
				if action == "move" then
					move_table[dir]()
					print("Moving " .. dir)
				elseif action == "dig" then
					dig_table[dir]()
					print("Digging " .. dir)
				end
			end

		end

		

	elseif event == "terminate" then
		ws.close()
		return
	end
end


