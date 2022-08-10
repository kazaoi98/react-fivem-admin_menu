fx_version "cerulean"
lua54 'yes'

games { "gta5", "rdr3" }

ui_page 'web/build/index.html'

server_script "server/**/*"
client_scripts {
  "client/**/*",
  "cl_events.lua",
  "cl_selecttool.lua"
}

files {
  'web/build/index.html',
  'web/build/**/*'
}
