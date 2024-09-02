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
