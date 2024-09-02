--!strict
--!native
--!optimize 2

local Manifest = {}
Manifest.prototype = {}
Manifest.prototype.__index = Manifest.prototype

export type ManifestBase = { [string]: string }

export type ManifestProperties = {
	_base: ManifestBase,
}

export type Manifest = typeof(setmetatable({} :: ManifestProperties, (nil :: any) :: typeof(Manifest.prototype)))

local exports = {}

function exports.isManifest(value: unknown): boolean
	return type(value) == "table" and getmetatable(value :: any) == Manifest.prototype
end

function exports.createManifest()
	return function(base: ManifestBase): Manifest
		local self = setmetatable({
			_base = base,
		}, Manifest.prototype)

		return self
	end
end

return exports
