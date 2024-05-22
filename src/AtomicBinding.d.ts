type Path<T> = (T extends object ? Nested<T> : "") extends infer D ? Extract<D, string> : never;

type Nested<T extends object, P extends Key<T> = Key<T>> = {
	[K in P]: T[K] extends Instance ? `${K}${Slashed<Path<T[K]>>}` | "" : "";
}[P];

type Slashed<T extends string> = T extends "" ? "" : `/${T}`;

type Key<T> = Exclude<keyof T, symbol>;

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

export type AnyManifestRoot = Instance;

export type Manifest<Root extends AnyManifestRoot> = {
	[alias: string]: Nested<Root>;
};

export type ManifestInstances<Root extends AnyManifestRoot, P extends Manifest<Root>> = {
	[K in keyof P]: DeepIndex<Root, P[K]>;
} & {
	root: Root;
};

export interface AtomicBinding<R extends AnyManifestRoot = AnyManifestRoot, M extends Manifest<R> = Manifest<R>> {
	_parsedManifest: {
		[K in keyof M]: Array<string>;
	};

	bindRoot(root: R): void;

	unbindRoot(root: R): void;

	waitForAlias<K extends keyof M>(root: R, alias: K): DeepIndex<R, M[K]>;

	destroy(): void;
}

declare const AtomicBinding: new <Root extends AnyManifestRoot, M extends Manifest<Root> = Manifest<Root>>(
	manifest: M,
	boundFn: (instances: ManifestInstances<Root, M>) => Callback,
) => AtomicBinding<Root, M>;

export type InferManifestRoot<B extends object> = B extends AtomicBinding<infer R> ? R : never;

export type InferManifest<B extends object> =
	B extends AtomicBinding<infer R, infer M> ? (M extends Manifest<R> ? M : never) : never;

export type InferAliasInstance<B extends AtomicBinding, A extends keyof InferManifest<B>> = A extends string
	? DeepIndex<InferManifestRoot<B>, InferManifest<B>[A]>
	: never;
