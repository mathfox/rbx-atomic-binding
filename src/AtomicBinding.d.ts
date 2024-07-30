type Path<T> = (T extends object ? Nested<T> : "") extends infer D
	? Extract<D, string>
	: never;

type Slashed<T extends string> = T extends "" ? "" : `/${T}`;

type Key<T> = Exclude<keyof T, symbol>;

export type Nested<T extends object, P extends Key<T> = Key<T>> = {
	[K in P]: T[K] extends Instance ? `${K}${Slashed<Path<T[K]>>}` | "" : "";
}[P];

export type DeepIndex<T, K extends string> = T extends object
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

export type Manifest<R extends Instance> = {
	[alias in string]: Nested<R>;
};

export type ManifestInstances<R extends Instance, M extends Manifest<R>> = {
	[K in keyof M]: DeepIndex<R, M[K]>;
} & {
	root: R;
};

export interface AtomicBinding<
	R extends Instance = Instance,
	M extends Manifest<R> = Manifest<R>,
> {
	bindRoot(root: R): void;

	unbindRoot(root: R): void;

	waitForAlias<const K extends keyof M>(root: R, alias: K): DeepIndex<R, M[K]>;

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

export function getInstanceFromPath<
	const Root extends Instance = Instance,
	const Path extends Nested<Root> = Nested<Root>,
>(root: Root, path: Path): DeepIndex<Root, Path> | undefined;
