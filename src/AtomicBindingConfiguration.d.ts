export type AtomicBindingConfiguration = {
	/**
	 * @default false
	 */
	profileDebugging: boolean;
};

/**
 * Returns a copied version of the configuration.
 */
export function getGlobalConfiguration(): AtomicBindingConfiguration;

/**
 * Provided `newConfiguration` is cloned to avoid further mutations.
 */
export function setGlobalConfiguration(
	newConfiguration: AtomicBindingConfiguration,
): void;
