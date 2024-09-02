import type { Index, TryIndex } from "./Shared";

export * from "./Manifest";
export * from "./Shared";
export * from "./Util";
export * from "./AtomicBinding";
export * from "./AtomicBindingConfiguration";

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
 * This function normalized the provided path using {@link parsePath} function.
 */
export function getInstanceFromPath<
	const Root extends Instance = Instance,
	const TryPath extends string = string,
>(root: Root, tryPath: TryPath): TryIndex<Root, TryPath> | undefined;

/**
 * This function utilizes `WaitForChild` method of the instance to recursively await the requested instance.
 *
 * This function normalized the provided path using {@link parsePath} function.
 */
export function waitForInstanceFromPath<
	const Root extends Instance = Instance,
	const Path extends string = string,
>(root: Root, path: Path): Index<Root, Path>;
