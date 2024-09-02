import type { Index, TryIndex } from "./Shared";

export * from "./AtomicBinding";
export * from "./AtomicBindingConfiguration";
export * from "./Manifest";
export * from "./Shared";
export * from "./Util";

/**
 * Parsed the provided `path` into an array of strings.
 * This function also excludes any empty string entries from the result array.
 * That means that the values `child_1/child_2` and `child_1/child_2/` will have exactly the same output.
 */
export function parsePath(path: string): string;

/**
 * This function accepts arbitrary `Path` string.
 *
 * The type of the instance that `Path` is referring to will be attempted to indexed statically.
 * Otherwise `undefined` type will be returned.
 *
 * This function normalizes the provided path using {@link parsePath} function.
 */
export function getInstanceFromPath<
	const TRoot extends Instance = Instance,
	const TPath extends string = string,
>(root: TRoot, path: TPath): TryIndex<TRoot, TPath> | undefined;

/**
 * This function utilizes `WaitForChild` method of the instance to recursively await the requested instance.
 *
 * This function normalizes the provided path using {@link parsePath} function.
 */
export function waitForInstanceFromPath<
	const TRoot extends Instance = Instance,
	const TPath extends string = string,
>(root: TRoot, path: TPath): Index<TRoot, TPath>;
