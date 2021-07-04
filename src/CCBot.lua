os.loadAPI('./api/json')

local id = os.getComputerID()
local connURL = "localhost:8080/?bot=fale&id=" .. id

local ws, err = http.websocket(connURL)

if not ws then
	print(err)
end

ws.send("CC TEST")

local move_table = {
	["up"] = function(X) print("up") end,
	["forward"] = function(X) print("forward") end,
	["left"] = function(X) print("left") end,
	["right"] = function(X) print("right") end
}

local dig_table = {
	["up"] = function(X) print("dig up") end,
	["down"] = function(X) print("dig down") end,
	["forward"] = function(X) print("dig forward") end
}

move_table["up"]()

while true do
	local _, url, response = os.pullEvent("websocket_message")

	if url == connURL then
		assert(response == "WS TEST", "Didn't receive test, instead: " .. response)

		-- ws.close()
		-- break
	end

	local obj = json.decode(response)
	local action = obj.action
	local dir = obj.direction

	if action == "move" then
		move_table[dir]()
	elseif action == "dig" then
		dig_table[dir]()

end


