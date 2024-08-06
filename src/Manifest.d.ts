import type { DEFAULT_DEPTH, Paths } from "./Shared";

export type Manifest<
	Root extends Instance = Instance,
	Depth extends number = DEFAULT_DEPTH,
	Base extends Record<string, Paths<Root, Depth>> = Record<
		string,
		Paths<Root, Depth>
	>,
> = {
	/**
	 * @deprecated
	 */
	readonly __nominal: unique symbol;

	_manifest: Base;
	__root: Root;
	__depth: Depth;
};

export declare function createManifest<
	const Root extends Instance,
	const Depth extends number = DEFAULT_DEPTH,
>(): <const Base extends Record<string, Paths<Root, Depth>>>(
	base: Base,
) => Manifest<Root, Depth, Base>;
