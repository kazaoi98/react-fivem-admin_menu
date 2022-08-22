local playersCloaked = {}

RegisterNetEvent('Fix_vehicle:client')
AddEventHandler('Fix_vehicle:client', function()
    if IsDuplicityVersion() then return end

    local ped = PlayerPedId()
    local vehicle = GetVehiclePedIsIn(ped, false)
    if not vehicle or vehicle == 0 then return end
    SetVehicleEngineHealth(vehicle, 1000.0)
    SetVehicleFixed(vehicle)
    SetVehiclePetrolTankHealth(vehicle, 4000.0)
end)

RegisterNetEvent('God:client')
AddEventHandler('God:client', function(value)
    if IsDuplicityVersion() then return end
    local pid = PlayerId()
    local ped = PlayerPedId()
    SetPlayerInvincible(pid, value)
    SetEntityHealth(ped,100.0)
end)

if IsDuplicityVersion() then 
    AddEventHandler("playerSpawned", function(obj)
        print('spawned !', obj)
        TriggerClientEvent("Invisibility:client", src, playersCloaked)
        print('player loaded')
    end)

    AddEventHandler("playerDropped", function()
        local src = source
        if invisPlayers[src] then
            TriggerClientEvent("Invisibility:client", -1, src, false)
            invisPlayers[src] = nil
        end
    end)

    return
end

RegisterNetEvent('Invisibility:client')
AddEventHandler('Invisibility:client', function(src, value)

    playersCloaked[src] = value

    local function setFlags(ped,pid, toggle)
        SetPedConfigFlag(ped, 52, toggle)
        SetPlayerCanBeHassledByGangs(ped, not toggle)
        SetIgnoreLowPriorityShockingEvents(ped, toggle)
        SetPedCanBeTargettedByPlayer(ped, pid, not toggle)
        SetPedCanBeTargetted(ped, not toggle)
        SetEveryoneIgnorePlayer(ped, toggle)
        SetPlayerInvincible(ped, toggle)
    end
    while true do
        Wait(0)
        for x,y in pairs(playersCloaked) do
            local pid = GetPlayerFromServerId(x)
            local ped = GetPlayerPed(pid)
            local ppi = PlayerPedId()
            if y then 
                setFlags(ped,pid, true)
                if ped == ppi then
                    SetEntityAlpha(ped, 100, false)
                else
                    SetEntityAlpha(ped, 0, false)
                    SetEntityLocallyInvisible(ped)
                    SetPlayerInvisibleLocally(pid, true)
                    NetworkFadeOutEntity(ped, true, false)
                end
            else    
                setFlags(ped,pid, false)
                ResetEntityAlpha(ped)
                
                playersCloaked[x] = nil
            end
        end
    end

end)

RegisterNetEvent("revive_in_radius:client")
AddEventHandler("revive_in_radius:client", function()
    local playerList = {}
    local players = GetPlayers()
    local ply = PlayerPedId()
    local plyCoords = GetEntityCoords(ply, 0)


    for i,v in ipairs(players) do
        local target = GetPlayerPed(v)
        local targetCoords = GetEntityCoords(target, 0)
        local delta = #(vector3(targetCoords["x"], targetCoords["y"], targetCoords["z"]) - vector3(plyCoords["x"], plyCoords["y"], plyCoords["z"]))
        if(delta < 50) then
            playerList[i] = GetPlayerServerId(v)
        end
    end

    if playerList ~= {} and playerList ~= nil then
        for _,v in pairs(playerList) do
            local ped = GetPlayerFromServerId(v)
            ped = GetPlayerPed(ped)
            local maxHealth = GetEntityMaxHealth(ped)
            ClearPedBloodDamage(ped)  
            SetEntityHealth(ped, maxHealth)
        end
    end
end)


local lastSpawnedVehicle = nil
RegisterNetEvent("spawnVehicle:client")
AddEventHandler("spawnVehicle:client", function(data)

    local vehicle = data.vehicle_spawn
    local hash = GetHashKey(vehicle)
    if not vehicle or not hash then return end
    RequestModel(hash)
    while not HasModelLoaded(hash) do
        Wait(0)
    end
    print(hash)
    local ped = PlayerPedId()
    local heading = GetEntityHeading(ped)
    local coords = GetOffsetFromEntityInWorldCoords(ped, 1.0, 3.0, 0.0)
    vehicle = CreateVehicle(hash, coords, heading, true, false)
    lastSpawnedVehicle = vehicle
    --keys script/qb, esx implementation reminder
    SetVehicleModKit(vehicle, 0)
    SetVehicleMod(vehicle, 11, 3, false)
    SetVehicleMod(vehicle, 12, 2, false)
    SetVehicleMod(vehicle, 13, 2, false)
    SetVehicleMod(vehicle, 15, 3, false)
    SetVehicleMod(vehicle, 16, 4, false)

    SetModelAsNoLongerNeeded(hash)
end)

RegisterNetEvent("get_into_vehicle:client")
AddEventHandler("get_into_vehicle:client", function()
    if lastSpawnedVehicle == nil then
        SendReactMessage('vehSpawnAlert', "true")
        return
    end
    print(lastSpawnedVehicle)
    local pid = PlayerPedId()
    TaskWarpPedIntoVehicle(pid,lastSpawnedVehicle,-1)
end)

RegisterNetEvent("Unflip_vehicle:client")
AddEventHandler("Unflip_vehicle:client", function()
    local ped = PlayerPedId()
    local vehicle = GetVehiclePedIsIn(ped, false)
    if vehicle == 0 then return end
    local coords = GetEntityCoords(vehicle)
    SetEntityCoords(vehicle, coords.x, coords.y, coords.z+5.0, false, false, false, true)
    Wait(500)
    SetVehicleOnGroundProperly(vehicle)
    
    print('unflip vehicle')
end)