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
	[TKey in keyof TRoot as TKey extends string
		? TRoot[TKey] extends Instance
			? // Weird trick to exclude `never` type
				[TRoot[TKey]] extends [never]
				? never
				: TKey
			: never
		: never]: TRoot[TKey];
};

/**
 * Should be used alongside {@link InferDescendant} type to get the type of nested Instance.
 */
export type ExtractDescendants<TRoot> = {
	[TKey in keyof TRoot as TKey extends string
		? TRoot[TKey] extends Instance
			? // Weird trick to exclude `never` type
				[TRoot[TKey]] extends [never]
				? never
				: TKey
			: never
		: never]: ExtractDescendants<TRoot[TKey]>;
} & {};

export type InferDescendant<TValue> = TValue extends ExtractDescendants<
	infer TDescendant
>
	? TDescendant
	: never;
