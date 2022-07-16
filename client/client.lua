local TEMPLATE = {
  
  isOpen = false,
  
  ToggleNui = function(self, open)
    self.isOpen = open
    SetNuiFocus(open, open)
    SendReactMessage('setVisible', open)
  end,
  
}

--[[exports("exampleExport", function(...)
  return TEMPLATE:ToggleNui(...)
end)]]
