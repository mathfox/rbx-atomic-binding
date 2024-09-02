/**
 * Prettifies a type for better readability.
 *
 * Hint: This type has no effect and is only used so that TypeScript displays
 * the final type in the preview instead of the utility types used.
 */
export type Prettify<TObject> = { [TKey in keyof TObject]: TObject[TKey] } & {};

export type EmptyObject = Record<string, never>;

/**
 * Checks whether provided type has children.
 */
export type HasChildren<TValue> = ExtractChildren<TValue> extends EmptyObject
	? true
	: false;

/**
 * Omits all of the keys that do not represent the child Instance.
 */
export type ExtractChildren<TRoot> = {
	[Key in keyof TRoot as Key extends string
		? TRoot[Key] extends Instance
			? // Weird trick to exclude `never` type
				[TRoot[Key]] extends [never]
				? never
				: Key
			: never
		: never]: TRoot[Key];
};

/**
 * Should be used alongside {@link InferDescendant} type to get the type of nested Instance.
 */
export type ExtractDescendants<TRoot> = {
	[Key in keyof TRoot as Key extends string
		? TRoot[Key] extends Instance
			? // Weird trick to exclude `never` type
				[TRoot[Key]] extends [never]
				? never
				: Key
			: never
		: never]: ExtractDescendants<TRoot[Key]>;
};

export type InferDescendant<T> = T extends ExtractDescendants<infer A>
	? A
	: never;
