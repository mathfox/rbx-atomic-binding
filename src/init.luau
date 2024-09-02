--!strict
--!native
--!optimize 2

local AtomicBindingConfiguration = require(script.AtomicBindingConfiguration)
local AtomicBinding = require(script.AtomicBinding)
local Manifest = require(script.Manifest)

export type AtomicBinding = AtomicBinding.AtomicBinding
export type AtomicBindingConfiguration = AtomicBindingConfiguration.AtomicBindingConfiguration

local exports = {
	AtomicBinding = AtomicBinding,
	createAtomicBinding = AtomicBinding.createAtomicBinding,
	isAtomicBinding = AtomicBinding.isAtomicBinding,

	AtomicBindingConfiguration = AtomicBindingConfiguration,

	getGlobalConfiguration = AtomicBindingConfiguration.getGlobalConfiguration,
	setGlobalConfiguration = AtomicBindingConfiguration.setGlobalConfiguration,

	createManifest = Manifest.createManifest,
	isManifest = Manifest.isManifest,
}

function exports.getInstanceFromPath(root: Instance, path: string): Instance | nil
	local instance: Instance | nil = root

	for _, node in string.split(path, "/") do
		instance = (instance :: Instance):FindFirstChild(node)

		if instance == nil then
			return nil
		end
	end

	return instance
end

function exports.waitForInstanceFromPath(root: Instance, path: string): Instance
	local instance: Instance = root

	for _, node in string.split(path, "/") do
		instance = instance:WaitForChild(node)
	end

	return instance
end

table.freeze(exports)

return exports
