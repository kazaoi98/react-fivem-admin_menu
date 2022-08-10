local draw

local function textInfo(entity, type, coords)
    local model = GetEntityModel(entity)
    local heading = GetEntityHeading(entity)
    local health = GetEntityHealth(entity)
    
    SetEntityDrawOutlineColor(80, 200, 120, 255)
    SetEntityDrawOutline(entity, true)
    if draw ~= entity then
        draw = entity
    end
   

    drawInfo(0.8, 0.50, 0.4,0.3,0.5, "Id: " .. entity, 50, 255, 100, 255)
    drawInfo(0.8, 0.53, 0.4,0.3,0.5, "Model: " .. model, 0, 255, 50, 255)
    drawInfo(0.8, 0.56, 0.4,0.3,0.5, "Heading: " .. heading, 50, 255, 100, 255)
    drawInfo(0.8, 0.59, 0.4,0.3,0.5, "Coords: " .. coords, 0, 255, 50, 255)
    drawInfo(0.8, 0.62, 0.4,0.3,0.5, "Health: " .. health, 0, 255, 50, 255)
    
    if type == 1 then   --ped
        local armor = GetPedArmour(entity)
        drawInfo(0.8, 0.65, 0.4,0.3,0.5, "Armor: " .. armor, 100, 200, 255, 255)
    elseif type == 2 then -- car
        local engine = GetVehicleEngineHealth(entity)
        local dirt = GetVehicleDirtLevel(entity)
        drawInfo(0.8, 0.65, 0.4,0.3,0.5, "Engine health: " .. engine, 100, 200, 255, 255)
        drawInfo(0.8, 0.68, 0.4,0.3,0.5, "Dirt level: " .. dirt, 100, 200, 255, 255)
    end
end

RegisterNetEvent('DeleteEnt:client', function(entity)
    if not DoesEntityExist(entity) then return end

    Citizen.CreateThread(function()
        local timeout = 0
        --TriggerServerEvent('DeleteEntity:server', entity)
        while true do
            if timeout >= 3000 then return end
            timeout = timeout + 1
            NetworkRequestControlOfEntity(entity)
            local nTimeout = 0

            while not NetworkHasControlOfEntity(entity) and nTimeout < 1000 do
                nTimeout = nTimeout + 1
                NetworkRequestControlOfEntity(entity)
                Citizen.Wait(0)
            end

            SetEntityAsMissionEntity(entity, true, true)

            DeleteEntity(entity)
            if type == 2 then DeleteVehicle(entity) end

            if not DoesEntityExist(entity) then return end
            
            Citizen.Wait(0)
        end
    end)
end)

local function info(entity)
    local type_ = GetEntityType(entity)
    local color = vector3(0,0,255)
    local bob = false
    SetEntityDrawOutline(draw, false)
    if type_ == 0 then return end 
    
    local hash = GetEntityModel(entity)
    local dimensions_min, dimensions_max = GetModelDimensions(hash)
    local size = dimensions_max - dimensions_min
    if size.x > size.y then size = vector3(size.x, size.x, size.z) else size = vector3(size.y, size.y, size.z) end
    local coords = GetEntityCoords(entity)
    --DrawMarker(28, coords, vector3(0.0,0.0,0.0), vector3(0.0,0.0,0.0), vector3(0.3,0.3,0.3), vector3(255,0,0), 255, false, false, 2, false, nil, nil, false)
    textInfo(entity, type_, coords)
    coords = vector3(coords.x, coords.y, coords.z-(size.z/2))
    bob = true 
    color = vector3(0,255,0)
    if IsControlJustReleased(0,  178) then -- add config keymapping (for now default is e)
        --DeleteEnt(entity, type_)
        TriggerServerEvent('DeleteEntity:server', entity)
    end
    
    return coords, size, color, bob
end


local function SelectTool(value)
    toggle = value
    while toggle do

        local hit,  coords,  entity = RayCastGamePlayCamera(15)
        if hit > 0 then
            local coord, scale, color, bob = info(entity)
            coords = coord or coords
            scale = scale or vector3(0.3,0.3,0.3)
            color = color or vector3(0,0,255) 
            DrawMarker(1, coords, vector3(0.0,0.0,0.0), vector3(0.0,0.0,0.0), scale, color, 255, bob, false, 2, false, nil, nil, false)
        else
            Wait(500)
        end
        Wait(0)
    end
end

RegisterNUICallback('DeleteEntity:client', function(data, cb)
    data = tonumber(data)
    
    TriggerServerEvent('DeleteEntity:server', data)
    if DoesEntityExist(data) then   
        cb(true)
    else 
        cb(false)
    end
end)

RegisterNetEvent('toggleSelectTool:client')
AddEventHandler('toggleSelectTool:client', function()
    SelectTool(not toggle)
end)

RegisterCommand('select_tool', function()
    SelectTool(not toggle)
end, true)

RegisterKeyMapping('select_tool', 'toggle select tool', 'keyboard', 'SLASH')
