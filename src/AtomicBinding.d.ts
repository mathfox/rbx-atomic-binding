import type { Manifest } from "./Manifest";
import type { DEFAULT_DEPTH, Index, Paths } from "./Shared";

export type BoundFunction<
	Root extends Instance,
	Depth extends number = DEFAULT_DEPTH,
	Base extends Record<string, Paths<Root, Depth>> = Record<
		string,
		Paths<RootImportData, Depth>
	>,
> = (
	instances: ManifestInstances<Root, Depth, Base>,
	// biome-ignore lint/suspicious/noConfusingVoidType: Allow implicit `nil` return.
) => Callback | undefined | void;

export type ManifestInstances<
	Root extends Instance,
	Depth extends number = DEFAULT_DEPTH,
	Base extends {
		[Alias in string]: Paths<Root, Depth>;
	} = {
		[Alias in string]: Paths<Root, Depth>;
	},
> = {
	[Alias in keyof Base]: Index<Root, Base[Alias], Depth>;
} & { root: Root };

/**
 * Infers the {@link ManifestInstances} type either from {@link AtomicBinding} or {@link Manifest}.
 */
export type InferManifestInstances<T> = T extends AtomicBinding<
	infer Root,
	infer Depth,
	infer Base
>
	? ManifestInstances<Root, Depth, Base>
	: T extends Manifest<infer Root, infer Depth, infer Base>
		? ManifestInstances<Root, Depth, Base>
		: never;

export interface AtomicBinding<
	Root extends Instance = Instance,
	Depth extends number = DEFAULT_DEPTH,
	Base extends {
		[Alias in string]: Paths<Root, Depth>;
	} = {
		[Alias in string]: Paths<Root, Depth>;
	},
> {
	bindRoot(root: Root): void;

	unbindRoot(root: Root): void;

	destroy(): void;

	waitForAlias<const K extends keyof Base>(
		root: Root,
		alias: K,
	): Index<Root, Base[K], Depth>;
}

export function createAtomicBinding<
	const Root extends Instance,
	const Depth extends number = DEFAULT_DEPTH,
>(): <
	const Base extends {
		[Alias in string]: Paths<Root, Depth>;
	} = {
		[Alias in string]: Paths<Root, Depth>;
	},
>(
	base: Base,
	boundFn: BoundFunction<Root, Depth, Base>,
) => AtomicBinding<Root, Depth, Base>;

export function createAtomicBinding<
	const Root extends Instance,
	const Depth extends number,
	const Base extends {
		[Alias in string]: Paths<Root, Depth>;
	},
>(
	manifest: Manifest<Root, Depth, Base>,
	boundFn: BoundFunction<Root, Depth, Base>,
): AtomicBinding<Root, Depth, Base>;

export function isAtomicBinding(value: unknown): value is AtomicBinding;
