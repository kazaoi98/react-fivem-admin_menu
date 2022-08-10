function tprint (tbl, indent)
	if not indent then indent = 0 end
	local toprint = string.rep(" ", indent) .. "{\r\n"
	indent = indent + 2 
	for k, v in pairs(tbl) do
	  toprint = toprint .. string.rep(" ", indent)
	  if (type(k) == "number") then
		toprint = toprint .. "[" .. k .. "] = "
	  elseif (type(k) == "string") then
		toprint = toprint  .. k ..  "= "   
	  end
	  if (type(v) == "number") then
		toprint = toprint .. v .. ",\r\n"
	  elseif (type(v) == "string") then
		toprint = toprint .. "\"" .. v .. "\",\r\n"
	  elseif (type(v) == "table") then
		toprint = toprint .. tprint(v, indent + 2) .. ",\r\n"
	  else
		toprint = toprint .. "\"" .. tostring(v) .. "\",\r\n"
	  end
	end
	toprint = toprint .. string.rep(" ", indent-2) .. "}"
	return toprint
end

 
 

RegisterNetEvent('TeleportToMarker:client')
AddEventHandler('TeleportToMarker:client', function()
    local blip = GetFirstBlipInfoId(8)
    if not DoesBlipExist(blip) then return end 
    local coords = GetBlipInfoIdCoord(blip)
    DoScreenFadeOut(0)
    for z = 1, 800 do
        SetPedCoordsKeepVehicle(PlayerPedId(), coords["x"], coords["y"], z + 0.0)
        local ground, _ = GetGroundZFor_3dCoord(coords["x"], coords["y"], z + 0.0)
        if ground then
            SetPedCoordsKeepVehicle(PlayerPedId(), coords["x"], coords["y"], z + 0.0)
            DoScreenFadeIn(200)
            return
        end

        Wait(0)
    end
    DoScreenFadeIn(200)
end)

RegisterNetEvent('TeleportToCoords:client')
AddEventHandler('TeleportToCoords:client', function(data)

        local x,y,z = data['tpCoordinates']['X_coord'],data['tpCoordinates']['Y_coord'],data['tpCoordinates']['Z_coord']
        local coords = vector3(tonumber(x),tonumber(y),tonumber(z))
        local pid = PlayerId()
        local ped = PlayerPedId()

        CreateThread(function()
            RequestCollisionAtCoord(coords)
            local startedCollision = GetGameTimer()

            SetPedCoordsKeepVehicle(ped, coords)
            SetPlayerInvincible(pid, true)
            FreezeEntityPosition(ped, true)
            
            
            while not HasCollisionLoadedAroundEntity(ped) do
                if GetGameTimer() - startedCollision > 5000 then break end
                Wait(0)
            end

            FreezeEntityPosition(ped, false)
            SetPlayerInvincible(pid, false)
        end)

        
end)