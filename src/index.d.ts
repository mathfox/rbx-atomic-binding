import type { Index, Paths, TryIndex } from "./Shared";

export * from "./Manifest";
export * from "./Shared";
export * from "./Util";
export * from "./AtomicBinding";
export * from "./AtomicBindingConfiguration";

/**
 * This function statically indexes the Instance for the provided `Path`.
 */
export function getInstanceFromPath<
	const Root extends Instance = Instance,
	const Path extends Paths<Root> = Paths<Root>,
>(root: Root, path: Path): Index<Root, Path> | undefined;

/**
 * This function accepts arbitrary `Path` string.
 * The type of the instance that `Path` is referring to will be attempted to indexed statically.
 * Otherwise `undefined` type will be returned.
 */
export function getInstanceFromPath<
	const Root extends Instance = Instance,
	const TryPath extends string = string,
>(root: Root, tryPath: TryPath): TryIndex<Root, TryPath> | undefined;

/**
 * This function utilizes `WaitForChild` method of the instance to recursively await the requested instance.
 */
export function waitForInstanceFromPath<
	const Root extends Instance = Instance,
	const Path extends Paths<Root> = Paths<Root>,
>(root: Root, path: Path): Index<Root, Path>;
