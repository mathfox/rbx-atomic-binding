--!strict
--!native
--!optimize 2

export type AtomicBindingConfiguration = {
	profileDebugging: boolean,
}

local exports = {
	--- Represents the active configuration.
	_currentConfiguration = {
		profileDebugging = false,
	} :: AtomicBindingConfiguration,
}

--- Returns a copy of the active `AtomicBindingConfiguration`.
function exports.getGlobalConfiguration(): AtomicBindingConfiguration
	return table.clone(exports._currentConfiguration)
end

--- Sets the active `AtomicBindingConfiguration`.
--- Provided value is getting cloned before assigning,
--- so further changes to the passed one won't affect the behavior.
function exports.setGlobalConfiguration(newConfiguration: AtomicBindingConfiguration)
	exports._currentConfiguration = table.clone(newConfiguration)
end

return exports
