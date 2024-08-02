export type EmptyObject = Record<string, never>;

export type HasChildren<T extends Instance> =
	ExtractChildren<T> extends EmptyObject ? true : false;

/**
 * Omits all of the keys that do not represent the child Instance.
 */
export type ExtractChildren<Root extends Instance> = {
	[Key in keyof Root as Key extends string
		? Root[Key] extends Instance
			? // Weird trick to exclude `never` type
				[Root[Key]] extends [never]
				? never
				: Key
			: never
		: never]: Root[Key];
};
