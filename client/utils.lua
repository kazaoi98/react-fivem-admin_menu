--- A simple wrapper around SendNUIMessage that you can use to
--- dispatch actions to the React frame.
---
---@param action string The action you wish to target
---@param data any The data you wish to send along with this action
function SendReactMessage(action, data)
  SendNUIMessage({
    action = action,
    data = data
  })
end

local currentResourceName = GetCurrentResourceName()

local debugIsEnabled = GetConvarInt(('%s-debugMode'):format(currentResourceName), 0) == 1

--- A simple debug print function that is dependent on a convar
--- will output a nice prettfied message if debugMode is on
function debugPrint(...)
  if not debugIsEnabled then return end
  local args <const> = { ... }

  local appendStr = ''
  for _, v in ipairs(args) do
    appendStr = appendStr .. ' ' .. tostring(v)
  end
  local msgTemplate = '^3[%s]^0%s'
  local finalMsg = msgTemplate:format(currentResourceName, appendStr)
  print(finalMsg)
end


--

function drawInfo(x,y,w,h,scale, message, r,g,b,a)
  SetTextProportional(0)
  SetTextScale(scale, scale)
  SetTextFont(0)
  SetTextColour(r,g,b,a)
  SetTextDropShadow(1, 255, 0, 0,255)
  SetTextEdge(1, 0, 0, 0, 255)
  SetTextDropShadow()
  SetTextEntry("STRING")
  SetTextOutline()
  AddTextComponentString(message)
  DrawText(x - w/2, y - h/2)
end

function Draw3DTxt(x,y,z,scale,text, font, r,g,b,a)
  local retval, x, y = GetScreenCoordFromWorldCoord(x,y,z)

  if retval ~= false then
    local width = (string.len(text) * 0.0024)
    SetTextEntry("STRING")
    SetTextProportional(1)
    SetTextFont(font)
    SetTextColour(255, 255, 255, 255)
    SetTextScale(scale, scale)
    SetTextJustification(0)
    AddTextComponentString(text)

    DrawText(x,y)
    DrawRect(x,y+0.04,width, 0.1, 30, 20, 30, 140)
  end
end

function RotationToDirection(rotation)
  local adjustedRotation =
  {
      x = (math.pi / 180) * rotation.x,
      y = (math.pi / 180) * rotation.y,
      z = (math.pi / 180) * rotation.z
  }
  local direction =
  {
      x = -math.sin(adjustedRotation.z) * math.abs(math.cos(adjustedRotation.x)),
      y = math.cos(adjustedRotation.z) * math.abs(math.cos(adjustedRotation.x)),
      z = math.sin(adjustedRotation.x)
  }
  return direction
end

function RayCastGamePlayCamera(distance) 
  local cameraRotation = GetGameplayCamRot()
  local cameraCoord = GetGameplayCamCoord()
  local direction = RotationToDirection(cameraRotation)
  local destination =
  {
      x = cameraCoord.x + direction.x * distance,
      y = cameraCoord.y + direction.y * distance,
      z = cameraCoord.z + direction.z * distance
  }
  local a, b, c, d, e = GetShapeTestResult(StartShapeTestRay(cameraCoord.x, cameraCoord.y, cameraCoord.z, destination.x, destination.y, destination.z, -1, PlayerPedId(), 0))
  return b, c, e
end
--

function GetPlayers()
  local players = {}

  for i = 0, 255 do
      if NetworkIsPlayerActive(i) then
          players[#players+1]= i
      end
  end

  return players
end

function DoesPlayerExist(pid)
  local pid = GetPlayerFromServerId(tonumber(pid))
  if pid ~= -1 then return true, pid end
  return false
end

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

local function getRelativePosition(a, b)
  if not a or not b then return end
  return b - a 
end

local function getRelativeVelocity(ent_a, ent_b)
  if not ent_a or not ent_b then return end
  local a = GetEntityVelocity(ent_a)
   b = GetEntityVelocity(ent_b)

  return b - a
end



local function AimAhead()
  local pid = GetPlayerFromServerId(x)
  local ped = GetPlayerPed(pid)
  local a_coords = GetEntityCoords(ped)
   b_coords = GetEntityCoords(915970)
  
  local delta = getRelativePosition(a_coords,b_coords)
  local vr = getRelativeVelocity(ped, 915970)
  local muzzleV = 100.0

  local function dot(a, b)
    local ret = 0

    ret = ret + a * b
    ret =  ret.x+ret.y+ret.z
    return ret
  end

  local a = dot(vr, vr)  - (muzzleV * muzzleV)  
  local b = 2.0 * dot(vr, delta)
  local c = dot(delta, delta)

  local desc = b*b - 4.0*a*c
  return 2.0*c/(math.sqrt(desc) - b);

end

--local function InitAim()
--  CreateThread(function() 
--    while true do 
--      Wait(0)
--      local deltaTime = AimAhead()
--      if deltaTime > 0.0 then 
--        local aimPoint = b_coords + b * deltaTime
--        DrawMarker(28, aimPoint, vector3(0,0,0), vector3(0,0,0), vector3(0.2,0.2,0.2), vector3(255,0,0), 255, false, false, 2, false, nil, nil, false)
--      end
--    end  
--  end)
--end
--InitAim()



