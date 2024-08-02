--!strict
--!native

local Manifest = {}
Manifest.prototype = {}
Manifest.prototype.__index = Manifest.prototype

local exports = {}

function exports.is(value)
	return type(value) == "table" and getmetatable(value) == Manifest.prototype
end

function exports.createManifest()
	return function(manifest)
		local self = setmetatable({
			_manifest = manifest,
		}, Manifest.prototype)

		return self
	end
end

table.freeze(exports)

return exports
