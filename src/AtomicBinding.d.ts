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
		: never]: Root[Key] extends infer Child extends Instance ? Child : never;
};

export type InferDescendantsTree<Root extends Instance> = {
	[Key in keyof Root as Key extends string
		? Root[Key] extends Instance
			? // Weird trick to exclude `never` type
				[Root[Key]] extends [never]
				? never
				: Key
			: never
		: never]: Root[Key] extends infer Child extends Instance
		? InferDescendantsTree<Child>
		: never;
};

export type PossiblePaths<
	Root extends Instance,
	ChildName extends keyof ExtractChildren<Root> = keyof ExtractChildren<Root>,
> = ChildName extends string
	? ExtractChildren<Root>[ChildName] extends Record<string, never>
		? ChildName
		: ChildName extends keyof Root
			? Root[ChildName] extends Instance
				? ChildName | `${ChildName}/${PossiblePaths<Root[ChildName]>}`
				: never
			: never
	: never;

export type DeepIndex<
	Root extends Instance,
	Path extends PossiblePaths<Root>,
> = Path extends keyof Root
	? Root[Path]
	: Path extends `${infer ChildName}/${infer RestPath}`
		? ChildName extends keyof Root
			? Root[ChildName] extends Instance
				? RestPath extends PossiblePaths<Root[ChildName]>
					? DeepIndex<Root[ChildName], RestPath>
					: never
				: never
			: never
		: never;

export type Manifest<Root extends Instance> = {
	[Alias in string]: PossiblePaths<Root>;
};

export type ManifestInstances<
	Root extends Instance,
	M extends Manifest<Root>,
> = {
	[K in keyof M]: DeepIndex<Root, M[K]>;
} & {
	root: Root;
};

export interface AtomicBinding<
	Root extends Instance = Instance,
	M extends Manifest<Root> = Manifest<Root>,
> {
	bindRoot(root: Root): void;

	unbindRoot(root: Root): void;

	waitForAlias<const K extends keyof M>(
		root: Root,
		alias: K,
	): DeepIndex<Root, M[K]>;

	destroy(): void;
}

declare const AtomicBinding: new <
	R extends Instance = Instance,
	M extends Manifest<R> = Manifest<R>,
>(
	manifest: M,
	boundFn: (instances: ManifestInstances<R, M>) => Callback | undefined,
) => AtomicBinding<R, M>;

export type InferManifestRoot<B extends object> = B extends AtomicBinding<
	infer R
>
	? R
	: never;

export type InferManifest<B extends object> = B extends AtomicBinding<
	infer R,
	infer M
>
	? M extends Manifest<R>
		? M
		: never
	: never;

export type InferAliasInstance<
	B extends AtomicBinding,
	A extends keyof InferManifest<B>,
> = A extends string
	? DeepIndex<InferManifestRoot<B>, InferManifest<B>[A]>
	: never;
