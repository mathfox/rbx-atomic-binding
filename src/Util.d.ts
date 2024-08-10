export type EmptyObject = Record<string, never>;

/**
 * Checks whether provided type has children.
 */
export type HasChildren<T> = ExtractChildren<T> extends EmptyObject ? true : false;

/**
 * Omits all of the keys that do not represent the child Instance.
 */
export type ExtractChildren<Root> = {
	[Key in keyof Root as Key extends string
		? Root[Key] extends Instance
			? // Weird trick to exclude `never` type
				[Root[Key]] extends [never]
				? never
				: Key
			: never
		: never]: Root[Key];
};

/**
 * Should be used alongside {@link InferDescendant} type to get the type of nested Instance.
 */
export type ExtractDescendants<Root> = {
	[Key in keyof Root as Key extends string
		? Root[Key] extends Instance
			? // Weird trick to exclude `never` type
				[Root[Key]] extends [never]
				? never
				: Key
			: never
		: never]: ExtractDescendants<Root[Key]>;
};

export type InferDescendant<T> = T extends ExtractDescendants<infer A> ? A : never;
