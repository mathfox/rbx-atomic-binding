import type { PossiblePaths, DeepIndex } from "./AtomicBinding";

export * from "./AtomicBinding";
export * from "./AtomicBindingConfiguration";

export function getInstanceFromPath<
	const Root extends Instance = Instance,
	const Path extends PossiblePaths<Root> = PossiblePaths<Root>,
>(root: Root, path: Path): DeepIndex<Root, Path> | undefined;

export function waitForInstanceFromPath<
	const Root extends Instance = Instance,
	const Path extends PossiblePaths<Root> = PossiblePaths<Root>,
>(root: Root, path: Path): DeepIndex<Root, Path>;
