--!strict
--!native
--!optimize 2

export type AtomicBindingConfiguration = {
	profileDebugging: boolean,
}

local exports = {
	_currentConfiguration = {
		profileDebugging = false,
	} :: AtomicBindingConfiguration,
}

function exports.getGlobalConfiguration()
	return table.clone(exports._currentConfiguration)
end

function exports.setGlobalConfiguration(newConfiguration: AtomicBindingConfiguration)
	exports._currentConfiguration = table.clone(newConfiguration)
end

return exports
