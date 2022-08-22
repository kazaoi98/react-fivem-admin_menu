local CachedPlayers = {}



RegisterNetEvent('rfam:playerList', function()
	local src = source
	--if IsPlayerAceAllowed(src, 'echorp.mod') then
		TriggerClientEvent('rfam:playerList', src, CachedPlayers)

	--end	
end)

AddEventHandler('playerDropped', function(reason)
	local src = source
	for i=1, #CachedPlayers do
		if CachedPlayers[i] then
			if CachedPlayers[i]['source'] == src then
				CachedPlayers[i]['online'] = false
				return
			end
		end
	end
end)

RegisterNetEvent('rfam:playerJoined', function()
	local player = source
	local steamid = "Unidentified"
	local license = "Unidentified"
	local discord = "Unidentified"
	local ip = "Unidentified"
	local fivem = "Unidentified"
	for k,v in pairs(GetPlayerIdentifiers(player))do            
		if string.sub(v, 1, string.len("steam:")) == "steam:" then
			steamid = v
		elseif string.sub(v, 1, string.len("license:")) == "license:" then
			license = v
		elseif string.sub(v, 1, string.len("ip:")) == "ip:" then
			ip = v
		elseif string.sub(v, 1, string.len("discord:")) == "discord:" then
			discord = v
		elseif string.sub(v, 1, string.len("fivem:")) == "fivem:" then
			fivem = v
		end
	end
	
	for i=1, #CachedPlayers do
		if CachedPlayers[i] then
			if CachedPlayers[i]['fivem'] == fivem then
				table.remove(CachedPlayers, i)
			end
		end
	end

	--[[ CachedPlayers[CachedPlayers+1] = {
		source = player,
		name = GetPlayerName(player),
		id = player,
		steam = steamid,
		fivem = fivem,
		discord = discord,
		note = "",
		online = true
	} ]]

	 table.insert(CachedPlayers, {
		source = player,
		name = GetPlayerName(player),
		id = player,
		steam = steamid,
		fivem = fivem,
		discord = discord,
		note = "",
		online = true
	}) 
end)

RegisterServerEvent('Trigger-option', function(data)
	local src = source
	local name = data.text
	local toggle = data.bool
	local eventName =  name .. "_event"
	eventName = eventName:gsub('%s+', '_')
	TriggerEvent(eventName, toggle, src)
end)

RegisterNetEvent('Fix_vehicle_event', function(data, src)
    --if --is admin then
		TriggerClientEvent('Fix_vehicle:client', src, src)
    --end
	-- logs
end)

RegisterNetEvent('Unflip_vehicle_event', function(data, src)
    --if --is admin then
		TriggerClientEvent('Unflip_vehicle:client', src)
    --end
	-- logs
end)

RegisterNetEvent('God_event', function(data, src)
    --if --is admin then
		TriggerClientEvent('God:client', src, data)
    --end
	-- logs
end)

RegisterNetEvent('Invisibility_event', function(data, src)
    --if --is admin then
		TriggerClientEvent('Invisibility:client', -1, src, data)
    --end
	-- logs
end)

RegisterServerEvent('TeleportToTarget:server', function(data)
    --if --is admin then
	local src = source
		--TriggerClientEvent('God:client', src, data)
    --end
	-- logs
end)

RegisterServerEvent('TeleportToCoords:server', function(data)
    --if --is admin then
	local src = source
	TriggerClientEvent('TeleportToCoords:client', src, data)
    --end
	-- logs
end)

RegisterServerEvent('TeleportToMarker:server', function(data)
    --if --is admin then
	local src = source
	TriggerClientEvent('TeleportToMarker:client', src, data)
    --end
	-- logs
end)




RegisterNetEvent('Debug_mode_event', function(data, src)
    --if --is admin then
		TriggerClientEvent('debugmode:client', src, data)
    --end
	-- logs
end)

RegisterNetEvent('Noclip_event', function(data, src)
    --if --is admin then
		TriggerClientEvent('noclip:client', src, data)
    --end
	-- logs
end)

RegisterNetEvent('Revive_in_radius_event', function(data, src)
    --if --is admin then
		TriggerClientEvent('revive_in_radius:client', src)
    --end
	-- logs
end)


RegisterNetEvent('toggleSelectTool:server', function(data, src)
    --if --is admin then
		TriggerClientEvent('toggleSelectTool:client', src)
    --end
	-- logs
end) 


RegisterServerEvent('spawnVehicle:server', function(data)
	local src = source
	--if admin then end -- check if allowed
	TriggerClientEvent('spawnVehicle:client', src, data)
end)


RegisterServerEvent('DeleteEntity:server', function(entity)
	local src = source
	--if admin then end -- check if allowed
	TriggerClientEvent('DeleteEnt:client', src, entity)
end)

RegisterServerEvent('get_into_vehicle:server', function()
	local src = source
	--if admin then end -- check if allowed
	TriggerClientEvent('get_into_vehicle:client', src)
end)