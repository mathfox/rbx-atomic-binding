export declare type AtomicBindingConfiguration = {
    /**
     * @default false
     */
	profileDebugging: boolean;
};

/**
 * Returns a copied version of the configuration.
 */
export declare function getGlobalConfiguration(): AtomicBindingConfiguration;

/**
 * Provided `newConfiguration` is cloned to avoid further mutations.
 */
export declare function setGlobalConfiguration(newConfiguration: AtomicBindingConfiguration): void;
