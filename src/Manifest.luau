--!strict
--!native
--!optimize 2

local Manifest = {}
Manifest.prototype = {}
Manifest.prototype.__index = Manifest.prototype

export type Manifest = typeof(setmetatable(
	{} :: {
		_manifest: {
			[string]: string,
		},
	},
	typeof(Manifest.prototype)
))

local exports = {}

function exports.isManifest(value: unknown): boolean
	return type(value) == "table" and getmetatable(value :: any) == Manifest.prototype
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
