type Path<T> = (T extends object ? Nested<T> : "") extends infer D ? Extract<D, string> : never;

type Nested<T extends object, P extends Key<T> = Key<T>> = {
	[K in P]: T[K] extends Instance ? `${K}${Slashed<Path<T[K]>>}` | "" : "";
}[P];

type Slashed<T extends string> = T extends "" ? "" : `/${T}`;

type Key<T> = Exclude<keyof T, symbol>;

type DeepIndex<T, K extends string> = T extends object
	? string extends K
		? never
		: K extends keyof T
			? T[K]
			: K extends `${infer F}/${infer R}`
				? F extends keyof T
					? DeepIndex<T[F], R>
					: never
				: never
	: never;

export type AnyManifestRoot = Instance;

export type ManifestAliases<Root extends AnyManifestRoot> = {
	[alias: string]: Nested<Root>;
};

export type Manifest<Root extends AnyManifestRoot> = ManifestAliases<Root>;

export type ManifestInstances<Root extends AnyManifestRoot, P extends Manifest<Root>> = {
	[K in keyof P]: DeepIndex<Root, P[K]>;
} & {
	root: Root;
};

interface AtomicBinding<Root extends AnyManifestRoot> {
	bindRoot(root: Root): void;

	unbindRoot(root: Root): void;

	destroy(): void;
}

declare const AtomicBinding: new <
	Root extends AnyManifestRoot,
	M extends Manifest<Root> = Manifest<Root>,
	BoundFn extends (instances: ManifestInstances<Root, M>) => Callback = (
		instances: ManifestInstances<Root, M>,
	) => Callback,
>(
	manifest: M,
	boundFn: BoundFn,
) => AtomicBinding<Root>;
