local AtomicBinding = require(script.AtomicBinding)
local AtomicBindingConfiguration = require(script.AtomicBindingConfiguration)

export type AtomicBinding = AtomicBinding.AtomicBinding
export type AtomicBindingConfiguration = AtomicBindingConfiguration.AtomicBindingConfiguration

local exports = {
	AtomicBinding = AtomicBinding,
	AtomicBindingConfiguration = AtomicBindingConfiguration,

    getGlobalConfiguration = AtomicBindingConfiguration.getGlobalConfiguration,
    setGlobalConfiguration = AtomicBindingConfiguration.setGlobalConfiguration,
}

table.freeze(exports)

return exports
