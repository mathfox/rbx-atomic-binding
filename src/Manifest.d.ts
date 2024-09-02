import type { DEFAULT_DEPTH, Paths } from "./Shared";

export type ManifestBase = Record<string, string>;

export type Manifest<
	TRoot extends Instance = Instance,
	TDepth extends number = DEFAULT_DEPTH,
	TBase extends ManifestBase = ManifestBase,
> = {
	/**
	 * @deprecated
	 */
	readonly __nominal: unique symbol;

	_base: TBase;
	__root: TRoot;
	__depth: TDepth;
};

export function createManifest<
	const TRoot extends Instance,
	const TDepth extends number = DEFAULT_DEPTH,
>(): <const TBase extends Record<string, Paths<TRoot, TDepth>>>(
	base: TBase,
) => Manifest<TRoot, TDepth, TBase>;

export function isManifest(value: unknown): value is Manifest;
