import type { Index, Paths } from "./Shared";

export * from "./Manifest";
export * from "./Shared";
export * from "./Util";
export * from "./AtomicBinding";
export * from "./AtomicBindingConfiguration";

export function getInstanceFromPath<
	const Root extends Instance = Instance,
	const Path extends Paths<Root> = Paths<Root>,
>(root: Root, path: Path): Index<Root, Path> | undefined;

export function waitForInstanceFromPath<
	const Root extends Instance = Instance,
	const Path extends Paths<Root> = Paths<Root>,
>(root: Root, path: Path): Index<Root, Path>;
