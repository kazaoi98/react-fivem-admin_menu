local function findObjects()
    local retval, outEntity = FindFirstObject()
    local pid = PlayerPedId()
    local playerCoords = GetEntityCoords(pid)
    local found 

    repeat
        local entityCoords = GetEntityCoords(outEntity)
        local distance = #(playerCoords - entityCoords)
        local hp = GetEntityHealth(outEntity,true)
        if distance < 10 then
            local model = GetEntityModel(outEntity)
            Draw3DTxt(entityCoords.x,entityCoords.y,entityCoords.z,0.3, "Entity: " .. outEntity .. "\n" .. "Coords: " .. entityCoords .. "\n" .. "Model: " .. model ..  "\n" .. "Health: " .. hp, 0, 255, 255, 255, 255)
        end
        found, outEntity = FindNextObject(retval)
        
        
    until not found
    EndFindObject(retval)
    return outEntity
end

local function debugToggle(value)
    toggle = value
    CreateThread(function()
        while toggle do
            findObjects()
            Wait(0)
        end
    end)
    
end
--runTest()

RegisterNetEvent('debugmode:client')
AddEventHandler('debugmode:client', function()
    print('debug')
    debugToggle(not toggle)
end)

RegisterCommand('debugmode', function()
    debugToggle(not toggle)
end, true)

RegisterKeyMapping('debugmode', 'toggle debugmode', 'keyboard', 'MULTIPLY')