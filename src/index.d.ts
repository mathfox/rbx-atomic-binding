import type { DeepIndex, Paths } from "./AtomicBinding";

export * from "./AtomicBinding";
export * from "./AtomicBindingConfiguration";

export function getInstanceFromPath<
	const Root extends Instance = Instance,
	const Path extends Paths<Root> = Paths<Root>,
>(root: Root, path: Path): DeepIndex<Root, Path> | undefined;

export function waitForInstanceFromPath<
	const Root extends Instance = Instance,
	const Path extends Paths<Root> = Paths<Root>,
>(root: Root, path: Path): DeepIndex<Root, Path>;
