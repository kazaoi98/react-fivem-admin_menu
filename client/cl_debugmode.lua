local function findObjects()
    local retval, outEntity = FindFirstObject()
    local pid = PlayerPedId()
    local playerCoords = GetEntityCoords(pid)
    local found 

    repeat
        local entityCoords = GetEntityCoords(outEntity)
        local distance = #(playerCoords - entityCoords)
        local hp = GetEntityHealth(outEntity,true)
        if distance < 16 then
            local model = GetEntityModel(outEntity)
            Draw3DTxt(entityCoords.x,entityCoords.y,entityCoords.z,0.3, "Entity: " .. outEntity .. "\n" .. "Coords: " .. entityCoords .. "\n" .. "Model: " .. model ..  "\n" .. "Health: " .. hp, 0, 255, 255, 255, 255)
        end
        found, outEntity = FindNextObject(retval)
        
        
    until not found
    EndFindObject(retval)
    return outEntity
end

local function drawScreenInfo()
    local pid = PlayerPedId()
    local coords = GetEntityCoords(pid)
    local model = GetEntityModel(pid)
    local speed = GetEntitySpeed(pid)
    local streetName, crossingRoad = GetStreetNameAtCoord(coords.x, coords.y, coords.z, streetName, crossingRoad)
    local zone = GetNameOfZone(coords)
    streetName = GetStreetNameFromHashKey(streetName)
    if crossingRoad ~= 0 then
        crossingRoad = GetStreetNameFromHashKey(crossingRoad)
    else
        crossingRoad = '...'
    end

    speed = string.format("%.1f",speed)
    local heading = GetEntityHeading(pid)
    local health = GetEntityHealth(pid)
    drawInfo(0.8, 0.50, 0.2,0.3,0.3, "Id: " .. pid, 50, 255, 100, 255)
    drawInfo(0.8, 0.53, 0.2,0.3,0.3, "Model: " .. model, 50, 255, 100, 255)
    drawInfo(0.8, 0.56, 0.2,0.3,0.3, "Coords: " .. coords, 50, 255, 100, 255)
    drawInfo(0.8, 0.59, 0.2,0.3,0.3, "Speed: " .. speed*2.23 .. " MPH  " .. speed*3.6 .. "KPH", 50, 255, 100, 255)
    drawInfo(0.8, 0.62, 0.2,0.3,0.3, "health: " .. health, 50, 255, 100, 255)
    drawInfo(0.8, 0.65, 0.2,0.3,0.3, "Street: " .. streetName .. " | Crossing: " .. crossingRoad , 50, 255, 100, 255)
    drawInfo(0.8, 0.68, 0.2,0.3,0.3, "Zone: " .. zone , 50, 255, 100, 255)
    
end

local function debugToggle(value)
    toggle = value
    CreateThread(function()
        while toggle do
            drawScreenInfo()
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