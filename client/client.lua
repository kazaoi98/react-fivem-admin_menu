local function SetDisplay(value)
  display = value
  SetNuiFocus(value, value)
  SendNUIMessage({
      type = "ui",
      status = value
  })
end

local function SetMinimalise(value)
  minimise = value
  SetNuiFocus(value, value)
  SendNUIMessage({
    type = "minimise",
    status = value
})
end
local isMounted = false
RegisterCommand('admin', function(source)
  if not isMounted then 
   SetDisplay(not display)
   SetMinimalise(not minimise)
   isMounted = true
  else
  SetMinimalise(not minimise)
  end
  print('toggle admin menu')
end, true)

RegisterNUICallback('menu_exit', function(data, cb)
  --SetDisplay(false)
  SetMinimalise(false)
  cb('exiting from admin menu')
end)

RegisterNUICallback('ban_form_data', function(data, cb)
 
  cb('')
end)
----------

CreateThread(function()
  while true do
    Wait(1000)
    if NetworkIsSessionStarted() then
      TriggerServerEvent('rfam:playerJoined')
      --TriggerClientEvent('playerLoaded', )
      --return
    end
  end 
end)

RegisterNUICallback('playerList', function(data, cb)
  TriggerServerEvent('rfam:playerList')
  cb({
    name = "",
    id = 0,
    steam = "",
    fivem = "",
    discord = "",
    note = ""
  })
end)

RegisterNetEvent('rfam:playerList', function(sentData)
  SendReactMessage('playerList', sentData)
end)

RegisterNUICallback('TeleportToTarget', function(data, cb)
  TriggerServerEvent('TeleportToTarget:server', data)
  cb('')
end)


RegisterNUICallback('TeleportToCoords', function(data, cb)
  TriggerServerEvent('TeleportToCoords:server', data)
  cb('')
end)

RegisterNUICallback('TeleportToMarker', function(data, cb)
  TriggerServerEvent('TeleportToMarker:server')
  cb('')
end)
-----------

RegisterNUICallback('toggleSelectTool', function(data, cb)
  print('triggered select tool')
  TriggerServerEvent('toggleSelectTool:server')
  cb('')
end)

RegisterNUICallback('spawn_vehicle', function(data, cb)
  TriggerServerEvent('spawnVehicle:server', data)
  cb('')
end)

RegisterNUICallback('get_into_vehicle', function(data, cb)
  TriggerServerEvent('get_into_vehicle:server')
  cb('')
end)


RegisterNUICallback('fetch_ui_input', function(data, cb)
  TriggerServerEvent('Trigger-option', data)
  cb('')
end)