import type { Manifest, ManifestBase } from "./Manifest";
import type { DEFAULT_DEPTH, Index, Paths, TryIndex } from "./Shared";

export type BoundFunction<
	TRoot extends Instance = Instance,
	TBase extends ManifestBase = ManifestBase,
> = (
	instances: ManifestInstances<TRoot, TBase>,
	// biome-ignore lint/suspicious/noConfusingVoidType: Allow implicit `nil` return.
) => Callback | void;

export type ManifestInstances<
	TRoot extends Instance = Instance,
	TBase extends Record<string, string> = Record<string, string>,
> = {
	[TAlias in keyof TBase]: Index<TRoot, TBase[TAlias]>;
} & { root: TRoot };

export interface AtomicBinding<
	TRoot extends Instance = Instance,
	TBase extends ManifestBase = ManifestBase,
> {
	bindRoot(root: TRoot): void;

	unbindRoot(root: TRoot): void;

	destroy(): void;

	getInstanceFromAlias<const TAlias extends keyof TBase>(
		root: TRoot,
		alias: TAlias,
	): TryIndex<TRoot, TBase[TAlias]> | undefined;

	waitForInstanceFromAlias<const TAlias extends keyof TBase>(
		root: TRoot,
		alias: TAlias,
	): Index<TRoot, TBase[TAlias]>;
}

export function createAtomicBinding<
	const TRoot extends Instance = Instance,
	const TDepth extends number = DEFAULT_DEPTH,
>(): <
	const TBase extends Record<string, Paths<TRoot, TDepth>> = Record<
		string,
		Paths<TRoot, TDepth>
	>,
>(
	base: TBase,
	boundFn: BoundFunction<TRoot, TBase>,
) => AtomicBinding<TRoot, TBase>;

export function createAtomicBinding<
	const TRoot extends Instance,
	const TDepth extends number,
	const Base extends Record<string, Paths<TRoot, TDepth>>,
>(
	manifest: Manifest<TRoot, TDepth, Base>,
	boundFn: BoundFunction<TRoot, Base>,
): AtomicBinding<TRoot, Base>;

export function isAtomicBinding(value: unknown): value is AtomicBinding;
