import type { Manifest } from "./Manifest";
import type { DEFAULT_DEPTH, Index, Paths } from "./Shared";

export type BoundFunction<
	TRoot extends Instance = Instance,
	Base extends Record<string, string> = Record<string, string>,
> = (
	instances: ManifestInstances<TRoot, Base>,
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
	TBase extends Record<string, string> = Record<string, string>,
> {
	bindRoot(root: TRoot): void;

	unbindRoot(root: TRoot): void;

	destroy(): void;

	waitForAlias<const TAlias extends keyof TBase>(
		root: TRoot,
		alias: TAlias,
	): Index<TRoot, TBase[TAlias]>;
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
	boundFn: BoundFunction<Root, Base>,
) => AtomicBinding<Root, Base>;

export function createAtomicBinding<
	const Root extends Instance,
	const Depth extends number,
	const Base extends {
		[Alias in string]: Paths<Root, Depth>;
	},
>(
	manifest: Manifest<Root, Depth, Base>,
	boundFn: BoundFunction<Root, Base>,
): AtomicBinding<Root, Base>;

export function isAtomicBinding(value: unknown): value is AtomicBinding;
