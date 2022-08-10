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
    AddEventHandler("playerLoaded", function()
        TriggerClientEvent("Invisibility:client", src, invisPlayers)
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
    if playersCloaked == nil then return end

    if value then 
        playersCloaked[src] = true 
    else 
        playersCloaked[src] = false 
    end

    local function setFlags(ped,pid, toggle)
        local a = SetPedConfigFlag(ped, 52, toggle)
        local b = SetPlayerCanBeHassledByGangs(ped, not toggle)
        local c = SetIgnoreLowPriorityShockingEvents(ped, toggle)
        local d = SetPedCanBeTargettedByPlayer(ped, pid, not toggle)
        local e = SetPedCanBeTargetted(ped, not toggle)
        local f = SetEveryoneIgnorePlayer(ped, toggle)
        local g = SetPlayerInvincible(ped, toggle)
        print(a,b,c,d,e,f,g)
    end
    while true do
        Wait(0)
        for x,y in pairs(playersCloaked) do
            local pid = GetPlayerFromServerId(x)
            print(x, y)
            local ped = GetPlayerPed(pid)
            local ppi = PlayerPedId()
            if y then 
                if ped == ppi then
                    SetEntityAlpha(ped, 100, false)
                else
                    SetEntityAlpha(ped, 0, false)
                    setFlags(ped,pid, true)
                    print('else')
                end
            else    
                setFlags(ped,pid, false)
                ResetEntityAlpha(ped)
            end
        end
    end
   --
    --if Cloack then
    --  SetEntityAlpha(src, 50, false)
    --else
    --  ResetEntityAlpha(src)
    --end 
end)


